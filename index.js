import fs from "node:fs";
import path from "node:path";
import axios from "axios";
import ndjson from "ndjson";
import PQueue from "p-queue";

// Check if the user provided a file path argument
if (process.argv.length !== 3) {
  console.log("Usage: node script.mjs <file_path>");
  process.exit(1);
}

const filePath = process.argv[2];
const queue = new PQueue({ concurrency: 4 });

// Create a read stream for the ndjson file
let downloadPromises = [];
fs.createReadStream(filePath)
  .pipe(ndjson.parse())
  .on("data", async (obj) => {
    const task = (async () => {
      await queue.add(async () => {
        const { path: filePath, url } = obj;
        console.log(`Path: ${filePath}`);
        console.log(`URL: ${url}`);
        console.log("-----");

        // Create the directory (or directories) if they do not exist
        fs.mkdirSync(path.dirname(filePath), { recursive: true });

        // Download the data to the requested path
        try {
          const response = await axios({ url, responseType: "stream" });
          response.data.pipe(fs.createWriteStream(filePath));
        } catch (error) {
          console.error(`Error downloading ${url}:`, error);
        }
      });
    })();
    downloadPromises.push(task);
  });

await Promise.all(downloadPromises);
