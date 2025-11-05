const fs = require('fs');
const Bundlr = require('@bundlr-network/client');

(async () => {
  try {
    const key = JSON.parse(fs.readFileSync('../arweave-keyfile.json','utf8'));
    const bundlr = new Bundlr('https://node1.bundlr.network','arweave',key);
    const stream = fs.createReadStream('logo.png');
    const res = await bundlr.upload(stream, { tags: [{ name: "Content-Type", value: "image/png" }] });
    console.log(res?.data?.id || res.id || '');
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
