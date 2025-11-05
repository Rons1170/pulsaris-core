import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { PublicKey, Keypair, SystemProgram } from "@solana/web3.js";
import masterIdl from "../target/idl/pulsaris_master_token.json";

describe("pulsaris_master_token instructions", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const programId = new PublicKey(process.env.PULSARIS_MASTER_TOKEN!);
  const program = new Program(masterIdl as anchor.Idl, programId, provider);

  it("initializes the master token mint", async () => {
    const mintAccount = Keypair.generate();

    const tx = await program.methods
      .initializeMint() // adjust if IDL uses a different name
      .accounts({
        mint: mintAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .signers([mintAccount])
      .rpc();

    console.log("Master token initialize mint tx:", tx);
    console.log("Mint account pubkey:", mintAccount.publicKey.toBase58());
  });
});

  it("mints tokens to user ATA", async () => {
    const mint = new PublicKey("REPLACE_WITH_MINT_PUBKEY"); // from initialize_mint
    const userTokenAccount = new PublicKey("HR5HBcHrAge7J38vQzLQF8pkKVpSFrf34KoBbEEFftwh"); // your ATA

    const tx = await program.methods
      .mintTo(new anchor.BN(1000)) // mint 1000 tokens
      .accounts({
        mint,
        user: provider.wallet.publicKey,
        userTokenAccount,
        tokenProgram: anchor.utils.token.TOKEN_PROGRAM_ID,
      })
      .rpc();

    console.log("Master token mint_to tx:", tx);
  });
