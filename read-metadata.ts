import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { mplTokenMetadata, fetchMetadata } from "@metaplex-foundation/mpl-token-metadata";
import { publicKey } from "@metaplex-foundation/umi";

// Connect to Devnet
const umi = createUmi("https://api.devnet.solana.com").use(mplTokenMetadata());

// Your mint
const mint = publicKey("Dp1FEEd43TH6DxKXmVGBNn9wkh9Mmj3kZKgZZZ4MbuZM");

(async () => {
  const metadata = await fetchMetadata(umi, mint);

  console.log("✅ Current metadata:");
  console.log("Name:", metadata.name);
  console.log("Symbol:", metadata.symbol);
  console.log("URI:", metadata.uri);
  console.log("Update Authority:", metadata.updateAuthority.toString());
})();
