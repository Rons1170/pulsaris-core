import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import { Program, AnchorProvider, Wallet } from "@coral-xyz/anchor";

const connection = new Connection("https://api.devnet.solana.com");
const wallet = new Wallet(Keypair.generate());
const provider = new AnchorProvider(connection, wallet, {});
const program = new Program(idl, programID, provider);
ts
import * as anchor from "@coral-xyz/anchor";
import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import idl from "../target/idl/pulsaris_core.json";

const programID = new PublicKey("YOUR_PROGRAM_ID_HERE");
const connection = new Connection("https://api.devnet.solana.com");
const wallet = anchor.Wallet.local();
const provider = new anchor.AnchorProvider(connection, wallet, {});
anchor.setProvider(provider);

const program = new anchor.Program(idl, programID, provider);

async function deploy() {
const mintKeypair = Keypair.generate();

await program.methods
.initializeMint()
.accounts({
mint: mintKeypair.publicKey,
user: provider.wallet.publicKey,
rent: anchor.web3.SYSVAR_RENT_PUBKEY,
systemProgram: anchor.web3.SystemProgram.programId,
})
.signers([mintKeypair])
.rpc();

console.log("Mint deployed:", mintKeypair.publicKey.toBase58());
}

deploy();

ts
import idl from "../target/idl/pulsaris_core.json";
const programID = new PublicKey("YOUR_PROGRAM_ID_HERE");

// TODO: Add mint deployment logic here
console.log("Deploying PULSARIS mint contract to devnet...");


const mintKeypair = Keypair.generate();

await program.methods
.initializeMint()
.accounts({
mint: mintKeypair.publicKey,
user: provider.wallet.publicKey,
rent: anchor.web3.SYSVAR_RENT_PUBKEY,
systemProgram: anchor.web3.SystemProgram.programId,
})
.signers([mintKeypair])
.rpc();

console.log("Mint deployed:", mintKeypair.publicKey.toBase58());
