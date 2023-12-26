import { parseEther } from "ethers/lib/utils";
import { ethers } from "hardhat";

async function main() {
  const contractName = "UniswapV3StaticQuoter";

  const contract = await ethers.getContractAt(
    contractName,
    "0xcB44ba54Edb00e89a1722b677707E898b7c63BF8"
  );

  const args = [
    "0xbA3136bE37807f46849a549a1733178A7A25803F", // Vape
    "0xbb742cfdB20c1d9Da3363CA12Bb1584634987327", // Roy
    parseEther("10"),
    3000, //  fee
    0,
  ];

  const res = await contract.quoteExactInputSingle(args);
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
