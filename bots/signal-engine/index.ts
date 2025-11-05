const { fetchFundingRates, fetchOpenInterest, fetchBasis, fetchWhaleFlows } = require('./feeds');
const { signInstruction } = require('./signer');

const config = {
  hedge: {
    cap_nav_pct: 0.70,
    venues_whitelist: ['binance', 'bybit', 'okx', 'kraken'],
  },
  signals: {
    weights: {
      funding: 0.30,
      basis: 0.20,
      open_interest: 0.20,
      liquidation_proximity: 0.15,
      correlation_vol: 0.10,
      whale_flows: 0.05,
    },
    thresholds: {
      ramp_start: 20,
      ramp_mid: 40,
      ramp_high: 60,
      ramp_peak: 80,
    },
  },
};

async function computeRiskScore() {
  const funding = await fetchFundingRates();
  const oi = await fetchOpenInterest();
  const basis = await fetchBasis();
  const whales = await fetchWhaleFlows();

  const score =
    config.signals.weights.funding * funding.score +
    config.signals.weights.open_interest * oi.score +
    config.signals.weights.basis * basis.score +
    config.signals.weights.whale_flows * whales.score;

  return Math.min(100, Math.max(0, score));
}

function mapScoreToHedge(R: number): number {
  if (R < config.signals.thresholds.ramp_start) return 0;
  if (R < config.signals.thresholds.ramp_mid) return 15;
  if (R < config.signals.thresholds.ramp_high) return 35;
  if (R < config.signals.thresholds.ramp_peak) return 55;
  return config.hedge.cap_nav_pct * 100;
}

async function main() {
  const R = await computeRiskScore();
  const hedgeRatio = mapScoreToHedge(R);
  const instruction = {
    timestamp: Date.now(),
    riskScore: R,
    hedgeRatio,
    venues: config.hedge.venues_whitelist,
  };

  const signed = signInstruction(instruction);
  console.log(JSON.stringify(signed, null, 2));
}

main();
