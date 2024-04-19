const hre = require("hardhat");
async function main() {
    const ac = await hre.ethers.deployContract("Account");

    await ac.waitForDeployment();

    

    console.log("Account deployed to ", ac.target);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
}); 

