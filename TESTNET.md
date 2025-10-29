# Testnet Rollout Guide

This document defines the reproducible steps for deploying Pulsaris programs to Solana Testnet.  
All commands are copy‑pasteable and must be run from the workspace root.

---

## Prerequisites
- Solana CLI installed and configured (`solana config set --url https://api.testnet.solana.com`)
- Anchor CLI installed and matching workspace version
- Wallet funded with testnet SOL (`solana airdrop 2`)

---

## Step 1: Build Programs
```bash
anchor build
