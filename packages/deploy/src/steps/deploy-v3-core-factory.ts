import VaporDEXV2Factory from '@vapordex/v2-core/artifacts/contracts/VaporDEXV2Factory.sol/VaporDEXV2Factory.json'
import createDeployContractStep from './meta/createDeployContractStep'

export const DEPLOY_V3_CORE_FACTORY = createDeployContractStep({
  key: 'v3CoreFactoryAddress',
  artifact: VaporDEXV2Factory,
})
