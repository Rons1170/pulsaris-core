import { Connection, PublicKey } from "@solana/web3.js";
import { getAssociatedTokenAddress, getAccount } from "@solana/spl-token";

const connection = new Connection("https://api.devnet.solana.com", "confirmed");
const MINT = new PublicKey("Dp1FEEd43TH6DxKXmVGBNn9wkh9Mmj3kZKgZZZ4MbuZM");
const OWNER = new PublicKey("FsZWcdhUmLfg63ZyL6HBmakLd8smvvBS7AV2EudKfwWm");

(async () => {
  const ata = await getAssociatedTokenAddress(MINT, OWNER);
  const info = await getAccount(connection, ata);
  console.log("ATA:", ata.toBase58());
  console.log("Balance (raw):", info.amount.toString());
})();
