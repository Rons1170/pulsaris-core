# 📜 Pulsaris Provenance

This document records the canonical, immutable provenance of Pulsaris assets.  
Arweave is the **permanent source of truth**. IPFS mirrors may be provided for redundancy, but in case of discrepancy, Arweave links are authoritative.

---

## 📂 Canonical Arweave Records

- **Logo (PNG):**  
  https://arweave.net/AJdZ9nGew1Z2vVUNNG54I1ksfm8IQ8XVdrIEYWMDMW4

- **Metadata (JSON):**  
  https://arweave.net/nvI_kA3wGad6JXQkak1RuYeqY50pOrdG9yp4GDeQyn4

- **Provenance (JSON):**  
  https://arweave.net/uTJdOmuVvACK1uLAK31vI-ATsQZLd8-GYlXYQmRxk9E

---

## 🔑 Program IDs

- **Master Token Program**  
  Program ID: `<MASTER_TOKEN_PROGRAM_ID>`  
  Explorer: https://explorer.solana.com/address/<MASTER_TOKEN_PROGRAM_ID>?cluster=devnet

- **Hedge Manager Program**  
  Program ID: `<HEDGE_MANAGER_PROGRAM_ID>`  
  Explorer: https://explorer.solana.com/address/<HEDGE_MANAGER_PROGRAM_ID>?cluster=devnet

- **Staking/Governance Program (planned)**  
  *To be published*

---

## 🧩 Trust Chain

1. **Logo** → Immutable brand asset.  
2. **Metadata** → References the logo and defines token details.  
3. **Provenance** → References both logo + metadata, locking the audit trail.

---

## ✅ Verification

To confirm MIME types:

```bash
curl -sI https://arweave.net/raw/AJdZ9nGew1Z2vVUNNG54I1ksfm8IQ8XVdrIEYWMDMW4 | grep content-type
curl -sI https://arweave.net/raw/nvI_kA3wGad6JXQkak1RuYeqY50pOrdG9yp4GDeQyn4 | grep content-type
curl -sI https://arweave.net/raw/uTJdOmuVvACK1uLAK31vI-ATsQZLd8-GYlXYQmRxk9E | grep content-type
