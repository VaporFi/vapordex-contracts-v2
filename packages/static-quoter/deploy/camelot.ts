import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

import addresses from "../test/addresses.json";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const { deployments, getNamedAccounts, network } = hre;
    const { deploy, log } = deployments;

    const allowedNetworks = ["arbitrum"];
    if (!allowedNetworks.includes(network.name))
        throw new Error(`Wrong network! Only "${allowedNetworks}" supported`);
    const networkAddresses: any = Object.entries(addresses).find(([key, _]) => key == network.name)?.[1];

    const contractName = "AlgebraStaticQuoter";
    const args = [ networkAddresses.protocols.camelot.factory ];
    const { deployer } = await getNamedAccounts();

    log("1) Deploy contract");
    const deployResult: any = await deploy(contractName, {
        from: deployer,
        contract: contractName,
        skipIfAlreadyDeployed: true,
        log: true,
        args
    });

    if (deployResult.newlyDeployed)
        log(`- 🎉 Deployed at: ${deployResult.address}`);   
    else
        log(`- ⏩ Deployment skipped, using previous deployment at: ${deployResult.address}`);
};

export default func;
func.tags = [ "camelot" ];
