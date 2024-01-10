import { BigNumber } from "ethers";
import { ethers } from "hardhat";
import { expect } from "chai";

import {
  encodePathNoFees,
  ThenArgRecursive,
  deployContract,
  forkNetwork,
} from "../helpers";
import addresses from "../addresses.json";

const { tokens } = addresses.telos;
const { swapsicleV2 } = addresses.telos.protocols;

async function telosFixture(blockNumber: number) {
  await forkNetwork("telos", blockNumber);
  return fixture();
}

async function fixture() {
  const StaticQuoter = await deployAlgebraStaticQuoter();
  const OriginalQuoter = await getAlgebraQuoterV2();
  return { StaticQuoter, OriginalQuoter };
}

async function deployAlgebraStaticQuoter() {
  const [deployer] = await ethers.getSigners();
  return deployContract(deployer, "AlgebraStaticQuoter", [swapsicleV2.factory]);
}

async function getAlgebraQuoterV2() {
  return ethers.getContractAt(
    require("../../abis/AlgebraQuoterV2.json"),
    swapsicleV2.quoterV2
  );
}

describe("Quoter:SwapsicleV2", async () => {
  context("telos", () => {
    async function checkStaticMatchesOriginalSingle(
      amountIn: BigNumber,
      tokenIn: string,
      tokenOut: string
    ) {
      const params = { sqrtPriceLimitX96: 0, amountIn, tokenIn, tokenOut };
      const dyOriginal = await getOriginalQuoterV2QuoteSingle(params);
      const dyStatic = await fix.StaticQuoter.quoteExactInputSingle(params);
      expect(dyStatic).to.eq(dyOriginal);
      logGasEstimate(params);
    }

    async function checkStaticMatchesOriginalPath(
      amountIn: BigNumber,
      tokens: string[]
    ) {
      const path = encodePathNoFees(tokens);
      const dyOriginal = await getOriginalQuoterV2QuotePath(path, amountIn);
      const dyStatic = await fix.StaticQuoter.quoteExactInput(path, amountIn);
      expect(dyStatic).to.eq(dyOriginal);
    }

    async function getOriginalQuoterV2QuoteSingle(params: any) {
      return fix.OriginalQuoter.callStatic.quoteExactInputSingle(
        params.tokenIn,
        params.tokenOut,
        params.amountIn,
        params.sqrtPriceLimitX96
      );
    }

    async function getOriginalQuoterV2QuotePath(
      path: any,
      amountIn: BigNumber
    ) {
      return fix.OriginalQuoter.callStatic.quoteExactInput(path, amountIn);
    }

    async function logGasEstimate(params: any) {
      const gas = await fix.StaticQuoter.estimateGas.quoteExactInputSingle(
        params
      );
      console.log(`Gas: ${gas.toString()}`);
    }

    let fix: ThenArgRecursive<ReturnType<typeof telosFixture>>;

    context("319886591", async () => {
      const FORK_BLOCK = 319886591;

      beforeEach(async () => {
        fix = await telosFixture(FORK_BLOCK);
      });

      context(
        "static-Quoter and original-Quoter quotes match :: single",
        async () => {
          it("WTLOS -> USDC :: 1000 WTLOS", async () => {
            await checkStaticMatchesOriginalSingle(
              ethers.utils.parseUnits("1000", 18),
              tokens.wtlos,
              tokens.usdc
            );
          });

          it("USDC -> WTLOS :: 33_000 USDC", async () => {
            await checkStaticMatchesOriginalSingle(
              ethers.utils.parseUnits("33000", 6),
              tokens.usdc,
              tokens.wtlos
            );
          });

          it("USDC -> ETH :: 330_000 USDC", async () => {
            await checkStaticMatchesOriginalSingle(
              ethers.utils.parseUnits("330000", 6),
              tokens.usdc,
              tokens.eth
            );
          });
        }
      );

      context(
        "static-Quoter and original-Quoter quotes match :: path",
        async () => {
          it("ETH --> USDC --> WTLOS :: 100 ETH", async () => {
            await checkStaticMatchesOriginalPath(
              ethers.utils.parseUnits("100", 18),
              [tokens.eth, tokens.usdc, tokens.wtlos]
            );
          });

          // it("ETH --> USDC --> WTLOS -> DC :: 1 ETH", async () => {
          //   await checkStaticMatchesOriginalPath(
          //     ethers.utils.parseUnits("1", 18),
          //     [tokens.eth, tokens.usdc, tokens.wtlos, tokens.dc]
          //   );
          // });
        }
      );
    });
  });
});
