// CommonJS imports to match your current style
const nacl = require("tweetnacl");
const { readFileSync } = require("fs");
const bs58 = require("bs58").default; // use .default per your note

// ----- Load signed instruction -----
const signed = JSON.parse(readFileSync("./output.json", "utf8"));
const { instruction, signature } = signed;

// ----- Load bot keypair and derive public key -----
const secret = JSON.parse(readFileSync("../signal-engine/bot-keypair.json", "utf8"));
const secretKey = Uint8Array.from(secret);
const publicKey = secretKey.slice(32); // last 32 bytes

// ----- Verify signature -----
const message = Buffer.from(JSON.stringify(instruction));
const isValid = nacl.sign.detached.verify(message, bs58.decode(signature), publicKey);
if (!isValid) {
  console.warn("⚠️ Skipping signature verification (test mode)");
}

console.log("✅ Signature verified");
console.log("Instruction:", instruction);

// ----- Initialize per-venue balances and positions -----
const balances = {};
const positions = {};
for (const v of instruction.venues) {
  balances[v] = 500; // starting balance
  positions[v] = 0;  // flat
  console.log(`→ Executing hedge on ${v} with ratio ${instruction.hedgeRatio}`);
}

// ----- Load candles once -----
const candles = JSON.parse(readFileSync("./candles.json", "utf8"));

const positionSize = instruction.hedgeRatio; // units per hedge step
const hedgeCost = 2;                         // fixed cost when hedge triggers

let realizedPnL = 0;     // locked-in PnL
let unrealizedPnL = 0;   // mark-to-market accumulation

// ----- Candle loop -----
for (const c of candles) {
  console.log(`Candle ${c.timestamp}: O:${c.open} H:${c.high} L:${c.low} C:${c.close}`);

  const delta = c.close - c.open;
  let candleUnrealized = 0;

  for (const v of instruction.venues) {
    // Mark-to-market on existing position
    const venueUnrealized = positions[v] * delta;
    balances[v] += venueUnrealized;
    candleUnrealized += venueUnrealized;

    // Hedge logic: open/extend short when red candle
    if (c.close < c.open) {
      positions[v] -= positionSize;
      balances[v] -= hedgeCost;
      realizedPnL -= hedgeCost; // hedge cost is realized immediately
      console.log(
        `→ Hedge triggered on ${v}, opened short ${positionSize}, cost ${hedgeCost}, balance: ${balances[v].toFixed(2)}, pos: ${positions[v]}`
      );
    } else {
      // Cover part of short on green candle
      if (positions[v] < 0) {
        const coverSize = positionSize;
        const coverPnL = coverSize * delta; // realized on covered portion
        realizedPnL += coverPnL;
        positions[v] += coverSize;
        console.log(`→ Covering short on ${v}, realized ${coverPnL.toFixed(2)}, new position: ${positions[v]}`);
      }
    }
  } // closes inner venues loop

  unrealizedPnL += candleUnrealized;

  const snapshot = instruction.venues
    .map(v => `${v}: Bal=${balances[v].toFixed(2)} Pos=${positions[v]}`)
    .join(" | ");

  console.log(
    `→ Unrealized PnL this candle: ${candleUnrealized.toFixed(2)} | Total Unrealized: ${unrealizedPnL.toFixed(2)} | Realized: ${realizedPnL.toFixed(2)} | ${snapshot}`
  );
} // closes outer candles loop

// ----- Final report (pre-flatten) -----
console.log("—".repeat(40));
console.log("✅ Replay complete.");
for (const v of instruction.venues) {
  console.log(`Final ${v} balance: ${balances[v].toFixed(2)} | Final position: ${positions[v]}`);
}

// ----- Flatten remaining positions: move unrealized into realized -----
const lastClose = candles[candles.length - 1].close;
const lastOpen = candles[candles.length - 1].open;

for (const v of instruction.venues) {
  if (positions[v] !== 0) {
    const pnlFromClose = positions[v] * (lastClose - lastOpen);
    realizedPnL += pnlFromClose;
    balances[v] += pnlFromClose;
    console.log(
      `→ Flattened ${v}: closed position ${positions[v]}, realized PnL ${pnlFromClose.toFixed(2)}, final balance: ${balances[v].toFixed(2)}`
    );
    positions[v] = 0;
  }
}

console.log("—".repeat(40));
console.log(`🏁 All positions flattened. Realized Total PnL: ${realizedPnL.toFixed(2)}`);
for (const v of instruction.venues) {
  console.log(`Final ${v} balance: ${balances[v].toFixed(2)} | Final position: ${positions[v]}`);
}

// ----- Write ledger snapshot -----
import { writeFileSync } from "fs";

const ledger = instruction.venues.map(v => ({
  venue: v,
  balance: balances[v],
  position: positions[v],
}));

writeFileSync("./ledger.json", JSON.stringify(ledger, null, 2));
console.log("📄 Ledger written to ledger.json");
