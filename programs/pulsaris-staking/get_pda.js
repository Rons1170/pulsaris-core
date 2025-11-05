const { PublicKey } = require("@solana/web3.js");

(async () => {
  const programId = new PublicKey("3cw61PPGXwHgfdtFdnvN1sFV761qsgyyNCeWLQ73GHYm");
  const [pda, bump] = await PublicKey.findProgramAddress(
    [Buffer.from("authority")],
    programId
  );
  console.log("Authority PDA:", pda.toBase58());
})();
