import { ethers } from "hardhat";

async function mainTelos() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  const contractName = "AlgebraStaticQuoter";

  const USDC = "0x8D97Cea50351Fb4329d591682b148D43a0C3611b";
  const USDT = "0x975Ed13fa16857E83e7C493C7741D556eaaD4A3f";
  const pool = "0xCf88255B5dc7C3eeB16266366e0965A7333065CE";
  console.log("Getting contract factory");
  const factory = await ethers.getContractFactory(contractName);

  console.log("Deploying contract");
  let contract = await factory.deploy(
    "0xA09BAbf9A48003ae9b9333966a8Bda94d820D0d9"
  );
  contract = await contract.deployed();
  const quoterAddress = contract.address;
  console.log("Contract deployed to:", quoterAddress);

  const alegebraQuoter = await ethers.getContractAt(
    contractName,
    quoterAddress
  );

  const quote = await alegebraQuoter.quote(
    pool,
    false,
    "1000000",
    "1461446703485210103287273052203988822378723970341",
    { gasLimit: "5000000" }
  );

  console.log(quote);
}

mainTelos()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
