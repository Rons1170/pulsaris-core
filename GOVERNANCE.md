# Governance Parameters

## Core Governance
- **Governance Token:** $PULSE
- **Voting Power:** 1 $PULSE = 1 vote (subject to staking multipliers)
- **Proposal Creation Threshold:** 1% of circulating supply staked
- **Quorum:** 10% of circulating supply must participate
- **Approval Threshold:** 60% yes votes required

---

## Treasury Management
- **Treasury Allocation:** 20% of total supply
- **Control:** DAO multi‑sig until governance contract is live
- **Spending Rules:**  
  - Proposals must specify purpose, amount, and recipient  
  - Funds released only after on‑chain vote passes

---

## Staking Incentives
- **Base APY:** Defined by emissions curve (see below)  
- **Loyalty Multipliers:**  
  - 30 days: 1.1× rewards  
  - 90 days: 1.3× rewards  
  - 180 days: 1.5× rewards  
- **Slashing:** Early unstake forfeits loyalty multiplier

---

## Counter‑Bot Vaults
- **Drop Trigger:** ≥5% sector drawdown within 15 minutes, correlation ≥0.7  
- **Exposure Cap:** 5% of vault equity per trade  
- **Stop Loss:** 1.5–2% per leg  
- **Take Profit:** 1.5–3% trailing exit  
- **Flip Throttle:** Minimum 30 minutes between flips  
- **Kill Switch:**  
  - Auto‑flatten if daily drawdown >3%  
  - Auto‑pause if slippage >0.8%

---

## Upgrade Authority
- **Initial:** Multi‑sig of core contributors  
- **Transition:** Transferred to DAO governance after mainnet stabilization  
- **Immutable Modules:** Token mint and metadata are permanent once locked

---

## Emergency Procedures
- **Pause Authority:** DAO can pause staking, vaults, or governance in case of exploit  
- **Recovery:** Snapshot + redeploy with DAO approval  
- **Transparency:** All emergency actions logged on‑chain

---

## Versioning
- **Governance Parameters v1.0** (Testnet rollout)  
- Future changes must be proposed, voted, and recorded here with version tags

---

# Emissions Curve (Staking Rewards)

Total Allocation: **40% of total supply** reserved for staking incentives.  
Distribution is front‑loaded to reward early adopters, then decays.

| Year | % of Total Supply Released | Cumulative % | Notes |
|------|-----------------------------|--------------|-------|
| 1    | 10%                         | 10%          | Bootstrap staking + liquidity |
| 2    | 8%                          | 18%          | Strong incentives, taper begins |
| 3    | 6%                          | 24%          | Balanced phase, loyalty multipliers kick in |
| 4    | 5%                          | 29%          | Rewards stabilize |
| 5    | 4%                          | 33%          | Long‑term holders benefit most |
| 6    | 3%                          | 36%          | Curve flattens |
| 7    | 2%                          | 38%          | Near completion |
| 8    | 2%                          | 40%          | Final emissions, staking matured |
