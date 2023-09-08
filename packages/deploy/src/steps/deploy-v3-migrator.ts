import V2Migrator from '@vapordex/v2-periphery/artifacts/contracts/V2Migrator.sol/V2Migrator.json'
import createDeployContractStep from './meta/createDeployContractStep'

export const DEPLOY_V3_MIGRATOR = createDeployContractStep({
  key: 'V2MigratorAddress',
  artifact: V2Migrator,
  computeArguments(state, config) {
    if (state.v3CoreFactoryAddress === undefined) {
      throw new Error('Missing V3 Core Factory')
    }
    if (state.nonfungibleTokenPositionManagerAddress === undefined) {
      throw new Error('Missing NonfungiblePositionManager')
    }
    return [state.v3CoreFactoryAddress, config.weth9Address, state.nonfungibleTokenPositionManagerAddress]
  },
})
