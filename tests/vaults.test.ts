import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";
import vaultsIdl from "../target/idl/pulsaris_category_vaults.json";

describe("pulsaris_category_vaults", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const programId = new PublicKey(process.env.PULSARIS_CATEGORY_VAULTS!);
  const program = new Program(vaultsIdl as anchor.Idl, programId, provider);

  it("calls initialize", async () => {
    const tx = await program.methods
      .initialize()
      .rpc();

    console.log("Initialize transaction signature:", tx);
  });
});

