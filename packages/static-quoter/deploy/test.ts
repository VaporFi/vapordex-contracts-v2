import { parseEther } from "ethers/lib/utils";
import { ethers } from "hardhat";

async function main() {
  const contractName = "UniswapV3StaticQuoter";

  const contract = await ethers.getContractAt(
    contractName,
    "0x9678B8D1c0acE490bDfc07B0C04868c08a001b39"
  );

  const args = [
    "0xbA3136bE37807f46849a549a1733178A7A25803F", // Vape
    "0xbb742cfdB20c1d9Da3363CA12Bb1584634987327", // Roy
    parseEther("1"),
    3000, //  fee
    0,
  ];
  //I give 1 VAPE, how much ROY will I get?
  const res = await contract.quoteExactInputSingle(args);
  //I want 1 ROY, how much VAPE I need to have?
  const res1 = await contract.quoteExactOutputSingle(args);

  console.log("exact input:", Number(res) / 1e18);
  console.log("exact output:", Number(res1) / 1e18);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
