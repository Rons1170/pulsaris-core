import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { PublicKey, Keypair, SystemProgram } from "@solana/web3.js";
import vaultsIdl from "../target/idl/pulsaris_category_vaults.json";

describe("pulsaris_category_vaults instructions", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const programId = new PublicKey(process.env.PULSARIS_CATEGORY_VAULTS!);
  const program = new Program(vaultsIdl as anchor.Idl, programId, provider);

  it("initializes a vault", async () => {
    const vaultAccount = Keypair.generate();

    const tx = await program.methods
      .initialize() // adjust if IDL uses a different name
      .accounts({
        vaultAccount: vaultAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .signers([vaultAccount])
      .rpc();

    console.log("Vault initialize tx:", tx);
    console.log("Vault account pubkey:", vaultAccount.publicKey.toBase58());
  });
});

  it("deposits tokens into the vault", async () => {
    const userTokenAccount = new PublicKey("HR5HBcHrAge7J38vQzLQF8pkKVpSFrf34KoBbEEFftwh"); // your ATA
    const vaultAccount = new PublicKey("REPLACE_WITH_VAULT_ACCOUNT_PUBKEY"); // from initialize step

    const tx = await program.methods
      .deposit(new anchor.BN(1000)) // deposit 1000 tokens
      .accounts({
        vaultAccount,
        user: provider.wallet.publicKey,
        userTokenAccount,
        tokenProgram: anchor.utils.token.TOKEN_PROGRAM_ID,
      })
      .rpc();

    console.log("Vault deposit tx:", tx);
  });

  it("withdraws tokens from the vault", async () => {
    const userTokenAccount = new PublicKey("HR5HBcHrAge7J38vQzLQF8pkKVpSFrf34KoBbEEFftwh"); // your ATA
    const vaultAccount = new PublicKey("REPLACE_WITH_VAULT_ACCOUNT_PUBKEY"); // from initialize step

    const tx = await program.methods
      .withdraw(new anchor.BN(500)) // withdraw 500 tokens
      .accounts({
        vaultAccount,
        user: provider.wallet.publicKey,
        userTokenAccount,
        tokenProgram: anchor.utils.token.TOKEN_PROGRAM_ID,
      })
      .rpc();

    console.log("Vault withdraw tx:", tx);
  });
