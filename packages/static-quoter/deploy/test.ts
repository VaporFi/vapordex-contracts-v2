import { parseEther } from "ethers/lib/utils";
import { ethers } from "hardhat";

async function main() {
  const contractName = "UniswapV3StaticQuoter";

  const contract = await ethers.getContractAt(
    contractName,
    "0x5d0A3f51f52194085dA39b3407B4318167c38551"
  );

  const args = [
    "0xbb742cfdB20c1d9Da3363CA12Bb1584634987327", // Roy
    "0xbA3136bE37807f46849a549a1733178A7A25803F", // Vape
    parseEther("100"),
    3000, //  fee
    0,
  ];

  const res = await contract.quoteExactInputSingle(args);

  console.log(Number(res));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
