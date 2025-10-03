import UniswapV3Factory from '@uniswap/v3-core/artifacts/contracts/UniswapV3Factory.sol/UniswapV3Factory.json'
import { Contract } from '@ethersproject/contracts'
import { MigrationStep } from '../migrations'

const FIVE_HUNDRED_BP_FEE = 50_000
const FIVE_HUNDRED_BP_TICK_SPACING = 1_000

export const ADD_500BP_FEE_TIER: MigrationStep = async (state, { signer, gasPrice }) => {
  if (state.v3CoreFactoryAddress === undefined) {
    throw new Error('Missing UniswapV3Factory')
  }

  const v3CoreFactory = new Contract(state.v3CoreFactoryAddress, UniswapV3Factory.abi, signer)

  // If already enabled, skip to make step idempotent
  const existingTickSpacing = await v3CoreFactory.feeAmountTickSpacing(FIVE_HUNDRED_BP_FEE)
  if (existingTickSpacing.toString() !== '0') {
    return [
      {
        message: `UniswapV3Factory fee tier ${FIVE_HUNDRED_BP_FEE / 100} bps already enabled with tick spacing ${existingTickSpacing.toString()}`,
      },
    ]
  }

  const owner = await v3CoreFactory.owner()
  if (owner !== (await signer.getAddress())) {
    throw new Error('UniswapV3Factory.owner is not signer')
  }
  const tx = await v3CoreFactory.enableFeeAmount(FIVE_HUNDRED_BP_FEE, FIVE_HUNDRED_BP_TICK_SPACING, { gasPrice })

  return [
    {
      message: `UniswapV3Factory added a new fee tier ${FIVE_HUNDRED_BP_FEE / 100} bps with tick spacing ${FIVE_HUNDRED_BP_TICK_SPACING}`,
      hash: tx.hash,
    },
  ]
}
