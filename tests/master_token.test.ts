import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";
import masterIdl from "../target/idl/pulsaris_master_token.json";

describe("pulsaris_master_token", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const programId = new PublicKey(process.env.PULSARIS_MASTER_TOKEN!);
  const program = new Program(masterIdl as anchor.Idl, programId, provider);

  it("loads the program", async () => {
    console.log("Program ID:", program.programId.toBase58());
  });
});
