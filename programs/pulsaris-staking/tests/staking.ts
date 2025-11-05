import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { PulsarisStaking } from "../target/types/pulsaris_staking";

describe("pulsaris_staking", () => {
  // Configure the client
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.PulsarisStaking as Program<PulsarisStaking>;

  it("Initialize staking state", async () => {
    await program.methods
      .initialize()
      .accounts({
        signer: provider.wallet.publicKey,
        pulseMint: new anchor.web3.PublicKey("BfWzdsE7osbBAFFSvNJgzxEefiyEeSAKMYQMoQDAeRYC"),
        programSigner: anchor.web3.PublicKey.findProgramAddressSync(
          [Buffer.from("authority")],
          program.programId
        )[0],
        vault: anchor.web3.PublicKey.findProgramAddressSync(
          [Buffer.from("vault")],
          program.programId
        )[0],
        rewardPool: anchor.web3.PublicKey.findProgramAddressSync(
          [Buffer.from("reward")],
          program.programId
        )[0],
        tokenProgram: anchor.utils.token.TOKEN_PROGRAM_ID,
        systemProgram: anchor.web3.SystemProgram.programId,
        rent: anchor.web3.SYSVAR_RENT_PUBKEY,
      })
      .rpc();
    console.log("✅ initialize ran successfully");
  });

  it("Claims rewards", async () => {
    await program.methods
      .claimRewards(new anchor.BN(10))
      .accounts({
        user: provider.wallet.publicKey,
        rewardPool: anchor.web3.PublicKey.findProgramAddressSync(
          [Buffer.from("reward")],
          program.programId
        )[0],
        userRewardAccount: new anchor.web3.PublicKey("3G5nz54fBS1DNH76iM1qVGThbaphMHAgVZMtV7U6JC2t"),
        pulseMint: new anchor.web3.PublicKey("BfWzdsE7osbBAFFSvNJgzxEefiyEeSAKMYQMoQDAeRYC"),
        programSigner: anchor.web3.PublicKey.findProgramAddressSync(
          [Buffer.from("authority")],
          program.programId
        )[0],
        tokenProgram: anchor.utils.token.TOKEN_PROGRAM_ID,
      })
      .rpc();
    console.log("✅ claim_rewards ran successfully");
  });
});
