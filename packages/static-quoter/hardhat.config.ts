import "dotenv/config";
import { HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-etherscan";
import "hardhat-abi-exporter";
import "hardhat-deploy";
import "hardhat-deploy-ethers";

const AVALANCHE_RPC = process.env.AVALANCHE_RPC ?? "";
const FUJI_RPC = process.env.FUJI_RPC ?? "";
const TELOS_TESTNET_RPC = process.env.TELOS_TESTNET_RPC ?? "";
const TELOS_RPC = process.env.TELOS_RPC ?? "";
const DEPLOYER_ADDRESS = process.env.DEPLOYER_ADDRESS as string;
const DEPLOYER_PRIVATE_KEY = process.env.DEPLOYER_PRIVATE_KEY as string;
const ETHERSCAN_API_KEY = process.env.SNOWTRACE_API_KEY;
const DOGECHAIN_RPC = process.env.DOGECHAIN_RPC ?? "";
const EUROPA_TESTNET_RPC = process.env.EUROPA_TESTNET_RPC ?? "";
const CURTIS_RPC = process.env.CURTIS_RPC ?? "";
const BASE_SEPOLIA_RPC = process.env.BASE_SEPOLIA_RPC ?? "";

const avalancheConfig = {
  url: AVALANCHE_RPC,
  chainId: 43114,
  live: true,
  saveDeployments: true,
  accounts: [] as string[],
};

const fujiConfig = {
  url: FUJI_RPC,
  chainId: 43113,
  live: true,
  saveDeployments: true,
  accounts: [] as string[],
};

const telosTestnetConfig = {
  url: TELOS_TESTNET_RPC,
  chainId: 41,
  live: true,
  saveDeployments: true,
  accounts: [] as string[],
};

const telosConfig = {
  url: TELOS_RPC,
  chainId: 40,
  live: true,
  saveDeployments: true,
  accounts: [] as string[],
};

const dogechainConfig = {
  url: DOGECHAIN_RPC,
  chainId: 2000,
  live: true,
  saveDeployments: true,
  accounts: [] as string[],
};

const europaTestnetConfig = {
  url: EUROPA_TESTNET_RPC,
  chainId: 1444673419,
  live: true,
  saveDeployments: true,
  accounts: [] as string[],
};

const curtisConfig = {
  url: CURTIS_RPC,
  chainId: 33111,
  live: true,
  saveDeployments: true,
  accounts: [] as string[],
};

const baseSepoliaConfig = {
  url: BASE_SEPOLIA_RPC,
  chainId: 84532,
  live: true,
  saveDeployments: true,
  accounts: [] as string[],
};

if (DEPLOYER_PRIVATE_KEY) {
  avalancheConfig.accounts.push(DEPLOYER_PRIVATE_KEY);
  fujiConfig.accounts.push(DEPLOYER_PRIVATE_KEY);
  telosTestnetConfig.accounts.push(DEPLOYER_PRIVATE_KEY);
  telosConfig.accounts.push(DEPLOYER_PRIVATE_KEY);
  dogechainConfig.accounts.push(DEPLOYER_PRIVATE_KEY);
  europaTestnetConfig.accounts.push(DEPLOYER_PRIVATE_KEY);
  curtisConfig.accounts.push(DEPLOYER_PRIVATE_KEY);
  baseSepoliaConfig.accounts.push(DEPLOYER_PRIVATE_KEY);
}

const config: HardhatUserConfig = {
  solidity: {
    version: "0.7.6",
    settings: {
      evmVersion: "istanbul",
      optimizer: {
        enabled: true,
        runs: 1_000_000,
      },
      metadata: {
        bytecodeHash: "none",
      },
    },
  },
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      forking: { enabled: true, url: "https://mainnet.telos.net/evm" },
    },
    avalanche: avalancheConfig,
    fuji: fujiConfig,
    telosTestnet: telosTestnetConfig,
    telos: telosConfig,
    dogechain: dogechainConfig,
    europaTestnet: europaTestnetConfig,
    curtis: curtisConfig,
    baseSepolia: baseSepoliaConfig,
  },
  namedAccounts: {
    deployer: {
      default: 0,
      1: DEPLOYER_ADDRESS,
      10: DEPLOYER_ADDRESS,
      42161: DEPLOYER_ADDRESS,
      43114: DEPLOYER_ADDRESS,
      43113: DEPLOYER_ADDRESS,
      40: DEPLOYER_ADDRESS,
      41: DEPLOYER_ADDRESS,
      1444673419: DEPLOYER_ADDRESS,
      33111: DEPLOYER_ADDRESS,
      84532: DEPLOYER_ADDRESS,
    },
  },
  abiExporter: {
    path: "./abis",
    clear: true,
    flat: true,
    only: [":UniswapV3StaticQuoter"],
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
    customChains: [
      {
        network: "mainnet",
        chainId: 1,
        urls: {
          apiURL: "https://api.etherscan.io/api",
          browserURL: "https://etherscan.io",
        },
      },
      {
        network: "optimism",
        chainId: 10,
        urls: {
          apiURL: "https://api-optimistic.etherscan.io/api",
          browserURL: "https://optimistic.etherscan.io",
        },
      },
      {
        network: "arbitrum",
        chainId: 42161,
        urls: {
          apiURL: "https://api.arbiscan.io/api",
          browserURL: "https://arbiscan.io",
        },
      },
      {
        network: "avalanche",
        chainId: 43114,
        urls: {
          apiURL: "https://api.snowtrace.io/api",
          browserURL: "https://snowtrace.io",
        },
      },
      {
        network: "polygon",
        chainId: 137,
        urls: {
          apiURL: "https://api.polygonscan.com/api",
          browserURL: "https://polygonscan.com",
        },
      },
    ],
  },
  mocha: {
    timeout: 600000000,
  },
};

export default config;
