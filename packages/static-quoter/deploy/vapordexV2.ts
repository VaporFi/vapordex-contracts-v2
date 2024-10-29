import type { DeployFunction } from "hardhat-deploy/types";
import type { HardhatRuntimeEnvironment } from "hardhat/types";
import addresses from "../constants/addresses.json";

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
	const { deployments, getNamedAccounts, network } = hre;
	const { deploy, log } = deployments;

	const allowedNetworks = [
		"avalanche",
		"fuji",
		"telos",
		"telosTestnet",
		"apechain",
		"europaTestnet",
		"curtis",
	];
	if (!allowedNetworks.includes(network.name))
		throw new Error(`Wrong network! Only "${allowedNetworks}" supported`);

	const contractName = "UniswapV3StaticQuoter";
	let factory;
	switch (network.name) {
		case "fuji":
			factory = addresses.fuji.protocols.vapordexV2.factory;
			break;

		case "avalanche":
			factory = addresses.avalanche.protocols.vapordexV2.factory;
			break;
		case "telosTestnet":
			factory = addresses.telosTestnet.protocols.vapordexV2.factory;
			break;
		case "telos":
			factory = addresses.telos.protocols.vapordexV2.factory;
			break;
		case "apechain":
			factory = addresses.apechain.protocols.vapordexV2.factory;
			break;
		case "europaTestnet":
			factory = addresses.europaTestnet.protocols.vapordexV2.factory;
			break;
		case "curtis":
			factory = addresses.curtis.protocols.vapordexV2.factory;
			break;
	}
	const args = [factory];
	const { deployer } = await getNamedAccounts();

	log("1) Deploy contract");
	const deployResult: any = await deploy(contractName, {
		from: deployer,
		contract: contractName,
		skipIfAlreadyDeployed: false,
		log: true,
		args,
	});

	if (deployResult.newlyDeployed)
		log(`- 🎉 Deployed at: ${deployResult.address}`);
	else
		log(
			`- ⏩ Deployment skipped, using previous deployment at: ${deployResult.address}`,
		);
};

export default func;
func.tags = ["vapordexV2"];
