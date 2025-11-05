import fs from "fs";
import {
  Connection,
  clusterApiUrl,
  Keypair,
  PublicKey,
} from "@solana/web3.js";
import {
  createUpdateMetadataAccountV2Instruction,
  DataV2,
} from "@metaplex-foundation/mpl-token-metadata";
import { Transaction, sendAndConfirmTransaction } from "@solana/web3.js";

// === CONFIG ===
const MINT_ADDRESS = new PublicKey("FW1RvMemmp9diudC3VKwAR2p7kTXX6dediDjiSf72bJF"); // Pulsaris mint
const METADATA_PROGRAM_ID = new PublicKey(
  "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
);
const NEW_URI =
  "https://arweave.net/P-amXH8gs5Bf9nMNbeekd__2518ZgE8NvF7aKF2Ux5o"; // uploaded pulsaris.json

async function main() {
  // Connect to testnet
  const connection = new Connection(clusterApiUrl("testnet"), "confirmed");

  // Load update authority keypair (3aE5wB…)
  const secret = JSON.parse(
    fs.readFileSync(
      "/home/pulse-aris/.config/solana/pulsaris-testnet/id.json",
      "utf-8"
    )
  );
  const signer = Keypair.fromSecretKey(new Uint8Array(secret));
  console.log("Signer (wallet):", signer.publicKey.toString());

  // Derive metadata PDA
  const [metadataPDA] = PublicKey.findProgramAddressSync(
    [
      Buffer.from("metadata"),
      METADATA_PROGRAM_ID.toBuffer(),
      MINT_ADDRESS.toBuffer(),
    ],
    METADATA_PROGRAM_ID
  );
  console.log("Metadata PDA:", metadataPDA.toBase58());

  // Minimal DataV2 object (only updating URI)
  const data: DataV2 = {
    name: "", // leave unchanged
    symbol: "", // leave unchanged
    uri: NEW_URI,
    sellerFeeBasisPoints: 0, // unchanged
    creators: null, // unchanged
    collection: null,
    uses: null,
  };

  const ix = createUpdateMetadataAccountV2Instruction(
    {
      metadata: metadataPDA,
      updateAuthority: signer.publicKey,
    },
    {
      updateMetadataAccountArgsV2: {
        data,
        updateAuthority: signer.publicKey,
        primarySaleHappened: null,
        isMutable: true,
      },
    }
  );

  const tx = new Transaction().add(ix);
  const sig = await sendAndConfirmTransaction(connection, tx, [signer]);
  console.log("✅ Metadata updated. Tx signature:", sig);
}

main().catch((err) => {
  console.error("❌ Update failed:", err);
});
