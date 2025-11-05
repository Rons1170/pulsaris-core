import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { PublicKey, Keypair, SystemProgram } from "@solana/web3.js";
import hedgeIdl from "../target/idl/pulsaris_hedge_manager.json";

describe("pulsaris_hedge_manager instructions", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const programId = new PublicKey(process.env.PULSARIS_HEDGE_MANAGER!);
  const program = new Program(hedgeIdl as anchor.Idl, programId, provider);

  it("initializes hedge manager state", async () => {
    const hedgeAccount = Keypair.generate();

    const tx = await program.methods
      .initialize() // adjust if IDL uses a different name
      .accounts({
        hedgeAccount: hedgeAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .signers([hedgeAccount])
      .rpc();

    console.log("Hedge manager initialize tx:", tx);
    console.log("Hedge account pubkey:", hedgeAccount.publicKey.toBase58());
  });
});

  it("updates hedge manager parameters", async () => {
    const hedgeAccount = new PublicKey("REPLACE_WITH_HEDGE_ACCOUNT_PUBKEY"); // from initialize step

    const tx = await program.methods
      .updateParams(
        new anchor.BN(500),   // example param: threshold
        new anchor.BN(200)    // example param: fee basis points
      )
      .accounts({
        hedgeAccount,
        user: provider.wallet.publicKey,
      })
      .rpc();

    console.log("Hedge manager update params tx:", tx);
  });
