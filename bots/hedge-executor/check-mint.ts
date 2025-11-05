import { Connection, PublicKey } from "@solana/web3.js";
import { getMint, getAssociatedTokenAddress } from "@solana/spl-token";

const connection = new Connection("https://api.devnet.solana.com", "confirmed");
const MINT = new PublicKey("Dp1FEEd43TH6DxKXmVGBNn9wkh9Mmj3kZKgZZZ4MbuZM");

// Replace with the wallet you intend to use (test both if needed)
const OWNER = new PublicKey("FsZWcdhUmLfg63ZyL6HBmakLd8smvvBS7AV2EudKfwWm");

(async () => {
  const mintInfo = await getMint(connection, MINT);
  console.log("Mint authority:", mintInfo.mintAuthority?.toBase58() || "none");
  console.log("Decimals:", mintInfo.decimals);
  console.log("Supply:", mintInfo.supply.toString());

  const ata = await getAssociatedTokenAddress(MINT, OWNER);
  console.log("Derived ATA for owner:", ata.toBase58());

  const ataInfo = await connection.getAccountInfo(ata);
  console.log("ATA exists:", ataInfo !== null);
})();
