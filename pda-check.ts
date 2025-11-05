import { PublicKey } from "@solana/web3.js";

const TOKEN_METADATA_PROGRAM_ID = new PublicKey(
  "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
);

const mint = new PublicKey("Dp1FEEd43TH6DxKXmVGBNn9wkh9Mmj3kZKgZZZ4MbuZM");

const [metadataPDA] = PublicKey.findProgramAddressSync(
  [
    Buffer.from("metadata"),
    TOKEN_METADATA_PROGRAM_ID.toBuffer(),
    mint.toBuffer(),
  ],
  TOKEN_METADATA_PROGRAM_ID
);

console.log("Metadata PDA:", metadataPDA.toBase58());
