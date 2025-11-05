import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { keypairIdentity, publicKey, generateSigner } from "@metaplex-foundation/umi";
import { mplTokenMetadata, findMetadataPda, updateMetadataAccountV2 } from "@metaplex-foundation/mpl-token-metadata";
import { readFileSync } from "fs";

(async () => {
  const umi = createUmi("https://api.devnet.solana.com").use(mplTokenMetadata());

  // ✅ Properly load secret key as a Umi Keypair
  const secret = JSON.parse(readFileSync("/home/pulse-aris/.config/solana/id.json", "utf8"));
  const secretKey = new Uint8Array(secret);
  const kp = umi.eddsa.createKeypairFromSecretKey(secretKey);
  umi.use(keypairIdentity(kp));

  const mint = publicKey("Dp1FEEd43TH6DxKXmVGBNn9wkh9Mmj3kZKgZZZ4MbuZM");
  const metadata = findMetadataPda(umi, { mint });

  await updateMetadataAccountV2(umi, {
    metadata,
    updateAuthority: umi.identity,
    data: {
      name: "PULSARIS",
      symbol: "PULSE",  // ✅ updated symbol
      uri: "https://raw.githubusercontent.com/Rons1170/pulsaris-core/main/metadata.json",
      sellerFeeBasisPoints: 0,
      creators: null,
      collection: null,
      uses: null,
    },
    isMutable: true,
  }).sendAndConfirm(umi);

  console.log("✅ Metadata updated");
})();
