// ... signature verification above ...

console.log('✅ Signature verified');
console.log('Instruction:', instruction);

// Hedge execution
for (const venue of instruction.venues) {
  console.log(`→ Executing hedge on ${venue} with ratio ${instruction.hedgeRatio}`);
}

// ----- Per-venue balances + PnL tracking -----
const balances: Record<string, number> = {};
for (const v of instruction.venues) balances[v] = 500;

// Load candles
const { readFileSync } = require('fs');
const candles = JSON.parse(readFileSync('./candles.json', 'utf8'));

// PnL model
const positionSize = instruction.hedgeRatio;
const hedgeCost = 2;
let totalPnL = 0;

for (const c of candles) {
  console.log(`Candle ${c.timestamp}: O:${c.open} H:${c.high} L:${c.low} C:${c.close}`);

  const delta = c.close - c.open;
  const candlePnL = delta * positionSize * instruction.venues.length;
  totalPnL += candlePnL;

  for (const v of instruction.venues) {
    const venuePnL = delta * positionSize;
    balances[v] += venuePnL;

    if (c.close < c.open) {
      balances[v] -= hedgeCost;
      console.log(`→ Hedge triggered on ${v}, cost ${hedgeCost}, balance: ${balances[v].toFixed(2)}`);
    }
  }

  const snapshot = instruction.venues.map(v => `${v}:${balances[v].toFixed(2)}`).join(' | ');
  console.log(`→ PnL this candle: ${candlePnL.toFixed(2)} | Total PnL: ${totalPnL.toFixed(2)} | Balances: ${snapshot}`);
}

console.log('—'.repeat(40));
console.log(`✅ Replay complete. Total PnL: ${totalPnL.toFixed(2)}`);
for (const v of instruction.venues) {
  console.log(`Final ${v} balance: ${balances[v].toFixed(2)}`);
}
