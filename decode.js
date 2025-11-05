const { Connection, PublicKey } = require('@solana/web3.js');

(async () => {
  const conn = new Connection('https://api.devnet.solana.com');
  const pda = new PublicKey('DPKTrAzGngpwAEud8WHnPT1zceTynqn7Koocvo5ygCTK');

  const acc = await conn.getAccountInfo(pda);
  if (!acc) {
    console.error("No account found at PDA");
    return;
  }

  // Decode the raw buffer into UTF-8 strings where possible
  const data = acc.data;
  const text = data.toString('utf8');

  console.log("Raw length:", data.length);
  console.log("Raw (base64):", data.toString('base64'));
  console.log("As UTF-8:", text);
})();
