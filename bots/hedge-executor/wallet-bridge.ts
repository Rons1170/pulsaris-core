import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import {
  getOrCreateAssociatedTokenAccount,
  mintTo
} from "@solana/spl-token";
import { readFileSync } from "fs";

// Load ledger
const ledger = JSON.parse(readFileSync("./ledger.json", "utf8"));

// Connect to Devnet
const connection = new Connection("https://api.devnet.solana.com", "confirmed");

// Payer must be the MINT AUTHORITY (DHK8F…)
const cliSecret = JSON.parse(readFileSync(process.env.HOME + "/.config/solana/id.json", "utf8"));
const payer = Keypair.fromSecretKey(Uint8Array.from(cliSecret));

// Receiver (owner) is the BOT WALLET (FsZWc…)
const OWNER_PUBLIC_KEY = new PublicKey("FsZWcdhUmLfg63ZyL6HBmakLd8smvvBS7AV2EudKfwWm");

// Your real mint
const MINT_ADDRESS = new PublicKey("Dp1FEEd43TH6DxKXmVGBNn9wkh9Mmj3kZKgZZZ4MbuZM");

(async () => {
  console.log("Using payer (mint authority):", payer.publicKey.toBase58());
  console.log("Minting to owner:", OWNER_PUBLIC_KEY.toBase58());

  for (const entry of ledger) {
    // Create/resolve ATA for the OWNER (bot wallet), paying fees from the mint authority
    const ata = await getOrCreateAssociatedTokenAccount(
      connection,
      payer,            // fee payer
      MINT_ADDRESS,     // mint
      OWNER_PUBLIC_KEY  // owner (receiver)
    );

    // Mint tokens into OWNER's ATA
    await mintTo(
      connection,
      payer,            // mint authority + fee payer
      MINT_ADDRESS,
      ata.address,
      payer,            // authority
      entry.balance
    );

    console.log(`✅ Minted ${entry.balance} PULSARIS tokens for ${entry.venue} -> ${ata.address.toBase58()}`);
  }

  console.log("Done. Check Phantom/Solflare for OWNER wallet balances.");
})();
