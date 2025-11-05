import * as anchor from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";
import { getAccount, getAssociatedTokenAddress } from "@solana/spl-token";

const MASTER_TOKEN_MINT = new PublicKey("UJ8Kse2mUKZstMKY2LYAp76QWxn4rcYFYRzGmeqR2HK");

// Replace with your vault PDA(s) if you want to track them
const VAULTS = [
  new PublicKey("Dp1FEEd43TH6DxKXmVGBNn9wkh9Mmj3kZKgZZZ4MbuZM"), // example vault
  new PublicKey("F7FKXVxGCLdQCHkrXai2vbASUePwPycwUDh2yyd1S5Y1"), // example vault
];

(async () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const wallet = provider.wallet as anchor.Wallet;

  // Wallet ATA
  const walletAta = await getAssociatedTokenAddress(MASTER_TOKEN_MINT, wallet.publicKey);
  const walletAccount = await getAccount(provider.connection, walletAta);
  console.log("Wallet balance:", Number(walletAccount.amount) / 1e9);

  // Vault balances
  for (const vault of VAULTS) {
    try {
      const vaultAccount = await getAccount(provider.connection, vault);
      console.log(`Vault ${vault.toBase58()} balance:`, Number(vaultAccount.amount) / 1e9);
    } catch (e) {
      console.log(`Vault ${vault.toBase58()} not initialized yet`);
    }
  }
})();
