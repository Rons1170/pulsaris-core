const fs = require('fs');
const Bundlr = require('@bundlr-network/client');

(async () => {
  try {
    const keyPath = process.env.KEYFILE || '../arweave-keyfile.json';
    if (!fs.existsSync(keyPath)) throw new Error('arweave keyfile not found: ' + keyPath);

    const key = JSON.parse(fs.readFileSync(keyPath, 'utf8'));
    const bundlr = new Bundlr('https://node1.bundlr.network', 'arweave', key);

    // use a readable stream instead of Buffer
    const stream = fs.createReadStream('provenance.json');

    const res = await bundlr.upload(stream, {
      tags: [{ name: "Content-Type", value: "application/json" }]
    });

    const id = res?.data?.id || res.id || '';
    console.log(id);
    process.exit(0);
  } catch (e) {
    console.error('ERROR', e && e.message ? e.message : e);
    if (e && e.stack) console.error(e.stack);
    process.exit(2);
  }
})();
