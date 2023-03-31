import VaporDEXV2Factory from '@vapordex/v2-core/artifacts/contracts/VaporDEXV2Factory.sol/VaporDEXV2Factory.json'
import { Contract } from '@ethersproject/contracts'
import { MigrationStep } from '../migrations'

export const TRANSFER_V3_CORE_FACTORY_OWNER: MigrationStep = async (state, { signer, gasPrice, ownerAddress }) => {
  if (state.v3CoreFactoryAddress === undefined) {
    throw new Error('Missing VaporDEXV2Factory')
  }

  const v3CoreFactory = new Contract(state.v3CoreFactoryAddress, VaporDEXV2Factory.abi, signer)

  const owner = await v3CoreFactory.owner()
  if (owner === ownerAddress)
    return [
      {
        message: `VaporDEXV2Factory owned by ${ownerAddress} already`,
      },
    ]

  if (owner !== (await signer.getAddress())) {
    throw new Error('VaporDEXV2Factory.owner is not signer')
  }

  const tx = await v3CoreFactory.setOwner(ownerAddress, { gasPrice })

  return [
    {
      message: `VaporDEXV2Factory ownership set to ${ownerAddress}`,
      hash: tx.hash,
    },
  ]
}
