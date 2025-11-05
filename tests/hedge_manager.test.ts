import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";
import hedgeIdl from "../target/idl/pulsaris_hedge_manager.json";

describe("pulsaris_hedge_manager", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const programId = new PublicKey(process.env.PULSARIS_HEDGE_MANAGER!);
  const program = new Program(hedgeIdl as anchor.Idl, programId, provider);

  it("loads the program", async () => {
    // For now, just confirm we can fetch program ID
    console.log("Program ID:", program.programId.toBase58());
  });
});
