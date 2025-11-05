const { PublicKey } = require("@solana/web3.js");

(async () => {
  const programId = new PublicKey("3cw61PPGXwHgfdtFdnvN1sFV761qsgyyNCeWLQ73GHYm"); // your program ID
  const [rewardPda, bump] = await PublicKey.findProgramAddress(
    [Buffer.from("reward")],
    programId
  );
  console.log("Reward Pool PDA:", rewardPda.toBase58());
})();
