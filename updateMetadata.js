const { Connection, Keypair, PublicKey, Transaction } = require("@solana/web3.js");
const { createUpdateMetadataAccountV2Instruction } = require("@metaplex-foundation/mpl-token-metadata");
const fs = require("fs");
const path = require("path");

async function main() {
  const connection = new Connection("https://api.testnet.solana.com", "confirmed");

  // Load your CLI dev wallet (DHK8F…)
  const keypath = path.join(process.env.HOME, ".config", "solana", "id.json");
  const secret = Uint8Array.from(JSON.parse(fs.readFileSync(keypath, "utf8")));
  const wallet = Keypair.fromSecretKey(secret);
  console.log("Signer:", wallet.publicKey.toBase58());

  // Mint address
  const mint = new PublicKey("6yYEBYm5in3MV1aZf8j2q6TjQbKPLTi8Q81kSyyMFzjU");

  // Derive metadata PDA
  const PROGRAM_ID = new PublicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s");
  const [metadataPDA] = PublicKey.findProgramAddressSync(
    [Buffer.from("metadata"), PROGRAM_ID.toBuffer(), mint.toBuffer()],
    PROGRAM_ID
  );

  // Build update instruction with full data object
  const ix = createUpdateMetadataAccountV2Instruction(
    {
      metadata: metadataPDA,
      updateAuthority: wallet.publicKey,
    },
    {
      updateMetadataAccountArgsV2: {
        data: {
          name: "Pulsaris Token",
          symbol: "PULSAR",
          uri: "https://arweave.net/nvI_kA3wGad6JXQkak1RuYeqY50pOrdG9yp4GDeQyn4", // ✅ full canonical URI
          sellerFeeBasisPoints: 0,
          creators: null,
          collection: null,
          uses: null,
        },
        updateAuthority: wallet.publicKey,
        primarySaleHappened: false,
        isMutable: true,
      },
    }
  );

  const tx = new Transaction().add(ix);
  const sig = await connection.sendTransaction(tx, [wallet]);
  console.log("✅ Metadata updated, signature:", sig);
}

main().catch(console.error);
