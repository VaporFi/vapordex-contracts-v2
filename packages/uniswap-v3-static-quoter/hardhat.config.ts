import { HardhatUserConfig } from "hardhat/config";
import * as dotenv from "dotenv";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-etherscan";
import "hardhat-abi-exporter";
import "hardhat-deploy";
import "hardhat-deploy-ethers";

dotenv.config();

const FUJI_RPC = process.env.FUJI_RPC ?? "";
const DEPLOYER_ADDRESS = process.env.DEPLOYER_ADDRESS as string;
const DEPLOYER_PRIVATE_KEY = process.env.DEPLOYER_PRIVATE_KEY as string;

const fujiConfig = {
  url: FUJI_RPC,
  chainId: 43113,
  live: true,
  saveDeployments: true,
  accounts: [] as string[],
};

if (DEPLOYER_PRIVATE_KEY) {
  fujiConfig.accounts.push(DEPLOYER_PRIVATE_KEY);
}

const config: HardhatUserConfig = {
  solidity: {
    version: "0.7.6",
    settings: {
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
      live: false,
      saveDeployments: false,
    },
    fuji: fujiConfig,
  },
  namedAccounts: {
    deployer: {
      default: 0,
      1: DEPLOYER_ADDRESS,
      10: DEPLOYER_ADDRESS,
      42161: DEPLOYER_ADDRESS,
    },
  },
  abiExporter: {
    path: "./abis",
    clear: true,
    flat: true,
    only: [":UniswapV3StaticQuoter"],
  },

  mocha: {
    timeout: 600000000,
  },
};

export default config;
