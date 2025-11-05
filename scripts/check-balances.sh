#!/usr/bin/env bash
set -euo pipefail

MINT="FW1RvMemmp9diudC3VKwAR2p7kTXX6dediDjiSf72bJF"

AUTHORITY="3aE5wBNir4bVWJSh2gATFVfBAuBsMXAcG6m2FysiMG7N"
PHANTOM="EJa5Xo9bSb1QVMVrPbQKNNe4aikB3JVtyoyAcVN74cui"
SOLFLARE="FZnvjiv56SKYVdyFjQGa6oGU7QXnb3AdNSuvGH9EFWUv"

echo "=== Pulsaris Balances (Testnet) ==="
echo "Mint: $MINT"
echo

echo "Authority ($AUTHORITY):"
spl-token accounts --owner $AUTHORITY --url https://api.testnet.solana.com | grep $MINT || true
echo

echo "Phantom ($PHANTOM):"
spl-token accounts --owner $PHANTOM --url https://api.testnet.solana.com | grep $MINT || true
echo

echo "Solflare ($SOLFLARE):"
spl-token accounts --owner $SOLFLARE --url https://api.testnet.solana.com | grep $MINT || true
