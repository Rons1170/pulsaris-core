import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { mplTokenMetadata, updateAuthorityV1 } from "@metaplex-foundation/mpl-token-metadata";
import { publicKey, createSignerFromKeypair, keypairIdentity } from "@metaplex-foundation/umi";
import { readFileSync } from "fs";
import { Keypair } from "@solana/web3.js";

// RPC + plugin
const umi = createUmi("https://api.devnet.solana.com").use(mplTokenMetadata());

// Load the CURRENT authority keypair (the one that matches 1119HU2…)
const secret = JSON.parse(readFileSync(process.env.HOME + "/.config/solana/old.json", "utf8"));
const kp = Keypair.fromSecretKey(Uint8Array.from(secret));
const signer = createSignerFromKeypair(umi, kp);
umi.use(keypairIdentity(signer));

// Mint address
const mint = publicKey("Dp1FEEd43TH6DxKXmVGBNn9wkh9Mmj3kZKgZZZ4MbuZM");

// New authority (your id.json wallet public key)
const newAuthority = publicKey("<PASTE-YOUR-id.json-PUBLIC-KEY-HERE>");

(async () => {
  const tx = await updateAuthorityV1(umi, {
    mint,
    authority: signer,
    newAuthority,
  }).sendAndConfirm(umi);

  console.log("✅ Update authority transferred. Sig:", tx.signature);
})();
