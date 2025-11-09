#!/bin/bash
# sanity-check.sh
# Compare Anchor.toml, IDLs, and on-chain program IDs

declare -A programs=(
  ["pulsaris_master_token"]="H9KcwtZEukpbWjtCKTupph3XM6ZwJReUHb1Y4q4bD8H7"
  ["pulsaris_category_vaults"]="Gh4K4joEfrm2P3k1MHNBAWNobXWuuJHNNwFMpStiJVcK"
  ["pulsaris_hedge_manager"]="GyAkayDBE1XDiXYbukc7gGSi3ddZjPhP2aH8Lwmg2Hfs"
  ["pulsaris_staking"]="Cd281Df6HDi63JiEmeYR9cnVPm6g2eL8uDbG7TdWKwQS"
)

echo "=== Pulsaris-Core Sanity Check ==="
for prog in "${!programs[@]}"; do
  expected="${programs[$prog]}"
  echo ""
  echo "Program: $prog"
  echo "Expected ID (Anchor.toml): $expected"

  idl_file="target/idl/${prog}.json"
  if [[ -f "$idl_file" ]]; then
    idl_id=$(jq -r '.metadata.address // .address' "$idl_file")
    echo "IDL address: $idl_id"
  else
    echo "IDL file not found: $idl_file"
  fi

  onchain_id=$(solana program show "$expected" --url https://api.testnet.solana.com | grep 'Program Id' | awk '{print $3}')
  echo "On-chain Program Id: $onchain_id"

  if [[ "$expected" == "$idl_id" && "$expected" == "$onchain_id" ]]; then
    echo "✅ MATCH across Anchor.toml, IDL, and on-chain"
  else
    echo "❌ MISMATCH detected"
  fi
done
