SHELL := /bin/bash

WHITEPAPER_SRC = WHITEPAPER.md
WHITEPAPER_PDF = whitepaper.pdf

.PHONY: whitepaper clean provenance verify addresses

whitepaper:
	pandoc $(WHITEPAPER_SRC) -o $(WHITEPAPER_PDF)

clean:
	rm -f $(WHITEPAPER_PDF)

# Canonical Arweave records
PROVENANCE_URLS = \
	https://arweave.net/AJdZ9nGew1Z2vVUNNG54I1ksfm8IQ8XVdrIEYWMDMW4 \
	https://arweave.net/nvI_kA3wGad6JXQkak1RuYeqY50pOrdG9yp4GDeQyn4 \
	https://arweave.net/uTJdOmuVvACK1uLAK31vI-ATsQZLd8-GYlXYQmRxk9E

PROVENANCE_FILE = PROVENANCE_URLS.txt

provenance:
	@for url in $(PROVENANCE_URLS); do \
	  echo "Checking $$url"; \
	  curl -s -I --max-time 10 $$url | sed -n '1p'; \
	done

.PHONY: addresses addresses-devnet addresses-testnet verify provenance

verify:
	@echo "🔍 Verifying Pulsaris canonical Arweave records..."
	@./verify_arweave.sh
	@echo "✅ Verification complete"

addresses-devnet:
	@./scripts/show-devnet-addresses.sh

addresses-testnet:
	@./scripts/show-addresses.sh

addresses:
	@$(MAKE) addresses-testnet


audit:
	@echo "🔍 Verifying Arweave provenance..."
	@$(MAKE) verify
	@echo ""
	@echo "📦 Checking Testnet token distribution..."
	@$(MAKE) addresses
	@echo ""
	@echo "📊 Confirming token supply..."
	@spl-token supply FW1RvMemmp9diudC3VKwAR2p7kTXX6dediDjiSf72bJF --url https://api.testnet.solana.com
	@echo ""
	@echo "👛 Confirming wallet balances..."
	@spl-token accounts --url https://api.testnet.solana.com
