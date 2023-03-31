import { BigNumber } from 'ethers'
import { ethers } from 'hardhat'
import { MockTimeVaporDEXV2Pool } from '../../typechain/MockTimeVaporDEXV2Pool'
import { TestERC20 } from '../../typechain/TestERC20'
import { VaporDEXV2Factory } from '../../typechain/VaporDEXV2Factory'
import { TestVaporDEXV2Callee } from '../../typechain/TestVaporDEXV2Callee'
import { TestVaporDEXV2Router } from '../../typechain/TestVaporDEXV2Router'
import { MockTimeVaporDEXV2PoolDeployer } from '../../typechain/MockTimeVaporDEXV2PoolDeployer'

import { Fixture } from 'ethereum-waffle'

interface FactoryFixture {
  factory: VaporDEXV2Factory
}

async function factoryFixture(): Promise<FactoryFixture> {
  const factoryFactory = await ethers.getContractFactory('VaporDEXV2Factory')
  const factory = (await factoryFactory.deploy()) as VaporDEXV2Factory
  return { factory }
}

interface TokensFixture {
  token0: TestERC20
  token1: TestERC20
  token2: TestERC20
}

async function tokensFixture(): Promise<TokensFixture> {
  const tokenFactory = await ethers.getContractFactory('TestERC20')
  const tokenA = (await tokenFactory.deploy(BigNumber.from(2).pow(255))) as TestERC20
  const tokenB = (await tokenFactory.deploy(BigNumber.from(2).pow(255))) as TestERC20
  const tokenC = (await tokenFactory.deploy(BigNumber.from(2).pow(255))) as TestERC20

  const [token0, token1, token2] = [tokenA, tokenB, tokenC].sort((tokenA, tokenB) =>
    tokenA.address.toLowerCase() < tokenB.address.toLowerCase() ? -1 : 1
  )

  return { token0, token1, token2 }
}

type TokensAndFactoryFixture = FactoryFixture & TokensFixture

interface PoolFixture extends TokensAndFactoryFixture {
  swapTargetCallee: TestVaporDEXV2Callee
  swapTargetRouter: TestVaporDEXV2Router
  createPool(
    fee: number,
    tickSpacing: number,
    firstToken?: TestERC20,
    secondToken?: TestERC20
  ): Promise<MockTimeVaporDEXV2Pool>
}

// Monday, October 5, 2020 9:00:00 AM GMT-05:00
export const TEST_POOL_START_TIME = 1601906400

export const poolFixture: Fixture<PoolFixture> = async function (): Promise<PoolFixture> {
  const { factory } = await factoryFixture()
  const { token0, token1, token2 } = await tokensFixture()

  const MockTimeVaporDEXV2PoolDeployerFactory = await ethers.getContractFactory('MockTimeVaporDEXV2PoolDeployer')
  const MockTimeVaporDEXV2PoolFactory = await ethers.getContractFactory('MockTimeVaporDEXV2Pool')

  const calleeContractFactory = await ethers.getContractFactory('TestVaporDEXV2Callee')
  const routerContractFactory = await ethers.getContractFactory('TestVaporDEXV2Router')

  const swapTargetCallee = (await calleeContractFactory.deploy()) as TestVaporDEXV2Callee
  const swapTargetRouter = (await routerContractFactory.deploy()) as TestVaporDEXV2Router

  return {
    token0,
    token1,
    token2,
    factory,
    swapTargetCallee,
    swapTargetRouter,
    createPool: async (fee, tickSpacing, firstToken = token0, secondToken = token1) => {
      const mockTimePoolDeployer =
        (await MockTimeVaporDEXV2PoolDeployerFactory.deploy()) as MockTimeVaporDEXV2PoolDeployer
      const tx = await mockTimePoolDeployer.deploy(
        factory.address,
        firstToken.address,
        secondToken.address,
        fee,
        tickSpacing
      )

      const receipt = await tx.wait()
      const poolAddress = receipt.events?.[0].args?.pool as string
      return MockTimeVaporDEXV2PoolFactory.attach(poolAddress) as MockTimeVaporDEXV2Pool
    },
  }
}
