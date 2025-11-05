# Governance Parameters

This document defines the governance rules and safety guardrails for Pulsaris‑Core.  
All parameters are DAO‑controlled and can be updated only through governance proposals.

---

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

- **Base APY:** Defined by emissions curve (40% allocation)  
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
# Governance Parameters

## Core Governance
... (voting power, quorum, proposal thresholds)

## Treasury Management
... (20% allocation, DAO control)

## Staking Incentives
- Base APY: defined by emissions curve
- Loyalty multipliers: 30d = 1.1×, 90d = 1.3×, 180d = 1.5×

## Counter‑Bot Vaults
... (drop triggers, 5% guardrails, kill switch)

## Upgrade Authority
... (multi‑sig → DAO)

## Emergency Procedures
... (pause, recovery, transparency)

## Versioning
- Governance Parameters v1.0 (Testnet rollout)

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


# Governance Parameters

## Core Governance
- Governance Token: $PULSE
- Voting Power: 1 $PULSE = 1 vote (subject to staking multipliers)
- Proposal Creation Threshold: 1% of circulating supply staked
- Quorum: 10% of circulating supply must participate
- Approval Threshold: 60% yes votes required

## Treasury Management
- Treasury Allocation: 20% of total supply
- Control: DAO multi‑sig until governance contract is live
- Spending Rules: proposals must specify purpose, amount, and recipient

## Staking Incentives
- Base APY: defined by emissions curve
- Loyalty Multipliers:  
  - 30 days: 1.1×  
  - 90 days: 1.3×  
  - 180 days: 1.5×  
- Slashing: early unstake forfeits loyalty multiplier

---

## Emissions Curve (Staking Rewards)

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

---

## Counter‑Bot Vaults
- Drop Trigger: ≥5% sector drawdown within 15 minutes, correlation ≥0.7
- Exposure Cap: 5% of vault equity per trade
- Stop Loss: 1.5–2% per leg
- Take Profit: 1.5–3% trailing exit
- Flip Throttle: minimum 30 minutes between flips
- Kill Switch: auto‑flatten if daily drawdown >3% or slippage >0.8%

## Upgrade Authority
- Initial: multi‑sig of core contributors
- Transition: transferred to DAO governance after mainnet stabilization
- Immutable Modules: token mint and metadata are permanent once locked

## Emergency Procedures
- Pause Authority: DAO can pause staking, vaults, or governance in case of exploit
- Recovery: snapshot + redeploy with DAO approval
- Transparency: all emergency actions logged on‑chain

## Versioning
- Governance Parameters v1.0 (Testnet rollout)
