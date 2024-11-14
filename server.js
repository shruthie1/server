const fetch = require("node-fetch");
const { Headers } = require("node-fetch");
globalThis.fetch = fetch;
globalThis.Headers = Headers;
const fs = require("fs");
const path = require("path");
const { performance } = require("perf_hooks");

const FETCH_TIMEOUT = 10000; // 10 seconds timeout for each fetch
const MAX_RETRIES = 3; // Number of retries for network failures
const RETRY_DELAY = 2000; // Delay between retries (ms)
const buildUrls = [
  "https://uptimechecker2.glitch.me/builds",
  "https://cms-nst.glitch.me/builds",
  "https://mychatgpt-xk3y.onrender.com/forward/builds"
];
const service = "promotion-clients";
const fileSavePath = "./src/tg.js";

// Helper function: Delay for retries
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Fetch data with retries
async function fetchWithRetries(url, timeout, retries = MAX_RETRIES) {
  let attempt = 0;
  while (attempt <= retries) {
    try {
      return await fetchWithTimeout(url, timeout);
    } catch (error) {
      attempt++;
      if (attempt > retries) {
        throw new Error(`Failed to fetch ${url} after ${retries} attempts. Error: ${error.message}`);
      }
      console.warn(`Retrying fetch ${url}. Attempt: ${attempt}. Waiting for ${RETRY_DELAY}ms...`);
      await delay(RETRY_DELAY);
    }
  }
}

// Ensure directory exists before saving file
async function ensureDirectoryExistence(filePath) {
  const dirname = path.dirname(filePath);
  if (!fs.existsSync(dirname)) {
    await fs.promises.mkdir(dirname, { recursive: true });
  }
}

// Validate if response is a valid JSON
async function validateAndParseJson(response) {
  try {
    return await response.json();
  } catch (error) {
    throw new Error("Invalid JSON response");
  }
}

// Fetch and save files with enhanced error handling
async function fetchAndSave(url, filename) {
  try {
    console.log("Service Url: ", url);
    const response = await fetchWithRetries(url, FETCH_TIMEOUT);

    if (!response.ok) {
      throw new Error(`Failed to fetch URL. Status Code: ${response.status}`);
    }

    const filepath = path.resolve(filename);
    await ensureDirectoryExistence(filepath);

    const buffer = await response.buffer();
    await fs.promises.writeFile(filepath, buffer);

    return filepath;
  } catch (error) {
    throw new Error(`Error fetching and saving file: ${error.message}`);
  }
}

// Fetch with timeout function
async function fetchWithTimeout(url, timeout) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId); // Clear timeout on success
    return response;
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error(`Fetch request to ${url} timed out after ${timeout / 1000} seconds`);
    }
    throw error;
  }
}

// Start loading service with enhancements
async function loadAndStartService() {
  let data;
  let fastestService = null;
  let fastestTime = Infinity;

  // Try to fetch from each build URL
  for (const buildUrl of buildUrls) {
    try {
      console.log(`Loading builds from: ${buildUrl}`);

      const startTime = performance.now(); // Track fetch time

      const result = await fetchWithRetries(buildUrl, FETCH_TIMEOUT);
      if (!result.ok) {
        throw new Error(`Failed to fetch builds. Status Code: ${result.status}`);
      }

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
      if (buildUrl === buildUrls[buildUrls.length - 1]) {
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
    const filePath = await fetchAndSave(data[service], fileSavePath);
    console.log(`File saved at: ${filePath}`);
  } catch (error) {
    console.error(`Failed to fetch and save file from URL: ${service}. Error: ${error.message}`);
    console.warn("Proceeding with existing service file.");
  }

  // Always start the service, regardless of fetch outcome
  console.log("Starting Service...");
  try {
    require(fileSavePath);
    console.log("Service initiation complete");
  } catch (error) {
    console.error(`Failed to start service: ${error.message}`);
  }
}

// Main entry point with graceful exit
(async () => {
  try {
    console.log("Starting...");
    await loadAndStartService();
    console.log("Service Started");
  } catch (error) {
    console.error(`Service failed to start: ${error.message}`);
    require(fileSavePath);
  }
})();
