const fs = require('fs');
const Bundlr = require('@bundlr-network/client');

(async () => {
  try {
    const keyPath = process.env.KEYFILE || '../arweave-keyfile.json';
    if (!fs.existsSync(keyPath)) throw new Error('arweave keyfile not found: ' + keyPath);

    const key = JSON.parse(fs.readFileSync(keyPath, 'utf8'));
    const bundlr = new Bundlr('https://node1.bundlr.network', 'arweave', key);

    const dataBuf = Buffer.from(fs.readFileSync('provenance.json'));
    const tx = await bundlr.createTransaction(dataBuf);
    await tx.sign();
    const res = await bundlr.upload(tx);

    const id = res?.data?.id || tx.id || '';
    console.log(id);
    process.exit(0);
  } catch (e) {
    console.error('ERROR', e && e.message ? e.message : e);
    if (e && e.stack) console.error(e.stack);
    process.exit(2);
  }
})();
