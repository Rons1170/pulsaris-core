import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { createMetadataAccountV3 } from '@metaplex-foundation/mpl-token-metadata';
import {
  createSignerFromKeypair,
  publicKey,
  signerIdentity,
} from '@metaplex-foundation/umi';
import { clusterApiUrl, Keypair } from '@solana/web3.js';
import fs from 'fs';
import bs58 from 'bs58';

(async () => {
  const umi = createUmi(clusterApiUrl("testnet"));

  // Load keypair from file and convert to Umi signer
  const secret = JSON.parse(
    fs.readFileSync("/home/pulse-aris/.config/solana/pulsaris-testnet/id.json", "utf8")
  );
  const web3Keypair = Keypair.fromSecretKey(Uint8Array.from(secret));
  const umiKeypair = umi.eddsa.createKeypairFromSecretKey(web3Keypair.secretKey);
  const signer = createSignerFromKeypair(umi, umiKeypair);

  umi.use(signerIdentity(signer));

  const mint = publicKey("FW1RvMemmp9diudC3VKwAR2p7kTXX6dediDjiSf72bJF");

  const tx = await createMetadataAccountV3(umi, {
    mint,
    mintAuthority: signer,
    updateAuthority: signer.publicKey,
    data: {
      name: "Pulsaris",
      symbol: "PULSE",
      uri: "https://arweave.net/5Sb50CGZquEgcYkmWVkcshjwBx7j6LdTGWZs9ZK_QX8",
      sellerFeeBasisPoints: 0,
      creators: null,
      collection: null,
      uses: null,
    },
    collectionDetails: null,
    isMutable: true,
  }).sendAndConfirm(umi);

  console.log("✅ Metadata attached (base58):", bs58.encode(tx.signature));
  console.log("✅ Metadata attached (raw):", tx.signature);
})();
