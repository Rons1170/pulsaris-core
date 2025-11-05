import * as anchor from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";
import { getAssociatedTokenAddress, createTransferInstruction, TOKEN_PROGRAM_ID } from "@solana/spl-token";

const MASTER_TOKEN_MINT = new PublicKey("UJ8Kse2mUKZstMKY2LYAp76QWxn4rcYFYRzGmeqR2HK");
const VAULT_PDA = new PublicKey("Dp1FEEd43TH6DxKXmVGBNn9wkh9Mmj3kZKgZZZ4MbuZM"); // same vault you deposited into

(async () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const wallet = provider.wallet as anchor.Wallet;

  // Wallet ATA
  const walletAta = await getAssociatedTokenAddress(MASTER_TOKEN_MINT, wallet.publicKey);

  // Vault ATA (allowOwnerOffCurve = true since PDA)
  const vaultAta = await getAssociatedTokenAddress(MASTER_TOKEN_MINT, VAULT_PDA, true);

  // Build transfer instruction (vault → wallet)
  const ix = createTransferInstruction(
    vaultAta,
    walletAta,
    VAULT_PDA, // vault PDA is the "owner"
    5 * 1e9,   // withdraw 5 tokens (assuming 9 decimals)
    [],
    TOKEN_PROGRAM_ID
  );

  const tx = new anchor.web3.Transaction().add(ix);
  const sig = await provider.sendAndConfirm(tx, []);
  console.log("Withdraw tx:", sig);
})();
