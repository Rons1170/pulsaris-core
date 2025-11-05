import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { PublicKey, Keypair, SystemProgram } from "@solana/web3.js";
import stakingIdl from "../target/idl/pulsaris_staking.json";

describe("pulsaris_staking instructions", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const programId = new PublicKey(process.env.PULSARIS_STAKING!);
  const program = new Program(stakingIdl as anchor.Idl, programId, provider);

  it("initializes a stake account", async () => {
    // Generate a new stake account keypair
    const stakeAccount = Keypair.generate();

    const tx = await program.methods
      .initializeStake() // adjust if your IDL uses a different name
      .accounts({
        stakeAccount: stakeAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .signers([stakeAccount])
      .rpc();

    console.log("Initialize stake tx:", tx);
    console.log("Stake account pubkey:", stakeAccount.publicKey.toBase58());
  });
});

  it("unstakes tokens", async () => {
    const userTokenAccount = new PublicKey("HR5HBcHrAge7J38vQzLQF8pkKVpSFrf34KoBbEEFftwh");

    const tx = await program.methods
      .unstake(new anchor.BN(500)) // withdraw 500 tokens
      .accounts({
        stakeAccount: /* same stake account pubkey */,
        user: provider.wallet.publicKey,
        userTokenAccount,
        tokenProgram: anchor.utils.token.TOKEN_PROGRAM_ID,
      })
      .rpc();

    console.log("Unstake tx:", tx);
  });

  it("claims staking rewards", async () => {
    const userTokenAccount = new PublicKey("YOUR_USER_TOKEN_ACCOUNT_HERE");

    const tx = await program.methods
      .claimRewards()
      .accounts({
        stakeAccount: /* same stake account pubkey */,
        user: provider.wallet.publicKey,
        userTokenAccount,
        tokenProgram: anchor.utils.token.TOKEN_PROGRAM_ID,
      })
      .rpc();

    console.log("Claim rewards tx:", tx);
  });
