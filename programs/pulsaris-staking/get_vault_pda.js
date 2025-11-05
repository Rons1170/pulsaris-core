const { PublicKey } = require("@solana/web3.js");

(async () => {
  const programId = new PublicKey("3cw61PPGXwHgfdtFdnvN1sFV761qsgyyNCeWLQ73GHYm"); // your program ID
  const [vaultPda, bump] = await PublicKey.findProgramAddress(
    [Buffer.from("authority")],
    programId
  );
  console.log("Vault PDA:", vaultPda.toBase58());
})();
