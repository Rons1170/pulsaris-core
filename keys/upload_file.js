// upload_file.js
const fs = require('fs');
const Bundlr = require('@bundlr-network/client');
const { execSync } = require('child_process');

(async () => {
  try {
    // Load your Arweave key
    const key = JSON.parse(fs.readFileSync('../arweave-keyfile.json','utf8'));
    const bundlr = new Bundlr('https://node1.bundlr.network','arweave',key);

    // Require a filename argument
    const filePath = process.argv[2];
    if (!filePath) {
      console.error("Usage: node upload_file.js <filename>");
      process.exit(1);
    }

    // Decide content type based on extension
    let contentType = "application/octet-stream";
    if (filePath.endsWith('.json')) contentType = "application/json";
    if (filePath.endsWith('.png')) contentType = "image/png";

    // Upload the file with explicit tags
    const res = await bundlr.uploader.uploadFile(filePath, {
      tags: [{ name: "Content-Type", value: contentType }]
    });

    const txId = res?.data?.id || res.id;
    console.log("Uploaded TX:", txId);

    // Quick validation: check gateway headers
    const headers = execSync(`curl -sI https://arweave.net/${txId} | grep content-type`).toString();
    console.log("Gateway reports:", headers.trim());
  } catch (e) {
    console.error("Upload failed:", e);
    process.exit(1);
  }
})();
