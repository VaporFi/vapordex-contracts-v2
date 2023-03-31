import { abi as POOL_ABI } from '@vapordex/v2-core/artifacts/contracts/VaporDEXV2Pool.sol/VaporDEXV2Pool.json'
import { Contract, Wallet } from 'ethers'
import { IVaporDEXV2Pool } from '../../typechain'

export default function poolAtAddress(address: string, wallet: Wallet): IVaporDEXV2Pool {
  return new Contract(address, POOL_ABI, wallet) as IVaporDEXV2Pool
}
