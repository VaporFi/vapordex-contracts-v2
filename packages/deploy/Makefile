# Include .env file and export its .env vars
# (`-include` to ignore error if it does not exist)
-include .env

.PHONY: all test

# Deploy

deploy_avalanche	 		:; yarn start -pk 0x$(DEPLOYER_PRIVATE_KEY) -o 0x6769DB4e3E94A63089f258B9500e0695586315bA -j https://avalanche-c-chain.publicnode.com -w9 0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7 -ncl AVAX
deploy_bsc	 					:; yarn start -pk 0x$(DEPLOYER_PRIVATE_KEY) -o 0x74c90aBB022A2868e9BD05cf7C31E00F999458bB -j https://bsc.publicnode.com -w9 0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c -ncl BNB
deploy_polygon	 			:; yarn start -pk 0x$(DEPLOYER_PRIVATE_KEY) -o 0xe6c549A17617a2Fcd104C8a1AA866599284852d0 -j https://polygon-bor.publicnode.com -w9 0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270 -ncl MATIC -c 20 -g 100
deploy_arbitrum	 			:; yarn start -pk 0x$(DEPLOYER_PRIVATE_KEY) -o 0xBc0BE8F5364c56816A475578a7FC48427f4FdB16 -j https://arbitrum-one.publicnode.com -w9 0x82aF49447D8a07e3bd95BD0d56f35241523fBab1 -ncl ETH
deploy_ethereum	 			:; yarn start -pk 0x$(DEPLOYER_PRIVATE_KEY) -o 0xEfBcfe1be695549e7CFC7440F5E814937f93c42C -j https://eth.llamarpc.com -w9 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2 -ncl ETH -c 3