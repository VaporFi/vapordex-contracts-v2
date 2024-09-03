import { ethers } from "hardhat";

async function main() {
  const contractName = "AlgebraStaticQuoter";
  const factory = "0xA09BAbf9A48003ae9b9333966a8Bda94d820D0d9";

  const algebra = await ethers.getContractFactory(contractName);

  const algebraD = await algebra.deploy(factory);

  await algebraD.deployed();

  const deployedContract = await ethers.getContractAt(
    contractName,
    algebraD.address
  );

  const factoryAddress = await deployedContract.getFactory();

  console.log("factoryAddress", factoryAddress);

  const pool = await deployedContract.getPool(
    "0x8D97Cea50351Fb4329d591682b148D43a0C3611b",
    "0x975Ed13fa16857E83e7C493C7741D556eaaD4A3f"
  );

  console.log("pool", pool);

  const quote = await algebraD.quoteExactInputSingle([
    "0x8D97Cea50351Fb4329d591682b148D43a0C3611b",
    "0x975Ed13fa16857E83e7C493C7741D556eaaD4A3f",
    1e6,
    0,
  ]);

  console.log("quote", quote);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
