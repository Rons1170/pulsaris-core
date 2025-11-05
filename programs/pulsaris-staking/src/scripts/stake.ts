import * as anchor from "@coral-xyz/anchor";
import { getAssociatedTokenAddress, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { PublicKey, Keypair } from "@solana/web3.js";
import wallet from "../keystone/pulsaris-wallet.json";
import { PulsarisStaking } from "../target/types/pulsaris_staking";

const provider = anchor.AnchorProvider.env();
anchor.setProvider(provider);

const program = new anchor.Program(
  require("../target/idl/pulsaris_staking.json"),
  new PublicKey("DZ4M9sWFiwLg1dRcYFaYByC2gjMLnjhQSjqFSBeERM5Q"),
  provider
) as anchor.Program<PulsarisStaking>;

(async () => {
  const user = provider.wallet.publicKey;
  const mint = new PublicKey("FW1RvMemmp9diudC3VKwAR2p7kTXX6dediDjiSf72bJF");

  const userTokenAccount = await getAssociatedTokenAddress(mint, user);
  const [stakeState] = PublicKey.findProgramAddressSync(
    [Buffer.from("stake"), user.toBuffer()],
    program.programId
  );

  // TODO: Replace with actual vault ATA and bump logic
  const vaultTokenAccount = new PublicKey("REPLACE_WITH_VAULT_ATA");
  const vaultBump = 255;

  const tx = await program.methods
    .stake(new anchor.BN(1000))
    .accounts({
      user,
      userTokenAccount,
      vaultTokenAccount,
      stakeState,
      tokenProgram: TOKEN_PROGRAM_ID,
      systemProgram: anchor.web3.SystemProgram.programId,
    })
    .rpc();

  console.log("✅ Stake TX:", tx);
})();
