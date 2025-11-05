import * as anchor from "@coral-xyz/anchor";
import { getAssociatedTokenAddress, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { PublicKey } from "@solana/web3.js";
import { PulsarisStaking } from "./target/types/pulsaris_staking";

const provider = anchor.AnchorProvider.env();
anchor.setProvider(provider);

const idl = require("./target/idl/pulsaris_staking.json");
const programId = new PublicKey("DZ4M9sWFiwLg1dRcYFaYByC2gjMLnjhQSjqFSBeERM5Q");
const program = new anchor.Program(
  idl,
  programId,
  provider
) as anchor.Program<PulsarisStaking>;

(async () => {
  const user = provider.wallet.publicKey;
  const mint = new PublicKey("FW1RvMemmp9diudC3VKwAR2p7kTXX6dediDjiSf72bJF");

  const userTokenAccount = await getAssociatedTokenAddress(mint, user);

  const [vaultAuthority, vaultBump] = PublicKey.findProgramAddressSync(
    [Buffer.from("vault")],
    program.programId
  );

  const vaultTokenAccount = await getAssociatedTokenAddress(
    mint,
    vaultAuthority,
    true
  );

  const [stakeState] = PublicKey.findProgramAddressSync(
    [Buffer.from("stake"), user.toBuffer()],
    program.programId
  );

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
