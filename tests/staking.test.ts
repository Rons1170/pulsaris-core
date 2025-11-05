import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";
import stakingIdl from "../target/idl/pulsaris_staking.json";

describe("pulsaris_staking", () => {
  // Set up provider from your environment
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  // Load the program using IDL + Program ID from .env
  const programId = new PublicKey(process.env.PULSARIS_STAKING!);
  const program = new Program(stakingIdl as anchor.Idl, programId, provider);

  it("loads the program and fetches accounts", async () => {
    const allStakeStates = await program.account.stakeState.all();
    console.log("Found stake accounts:", allStakeStates.length);
  });
});
