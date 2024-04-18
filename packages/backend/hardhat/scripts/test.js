const hre = require("hardhat");

const EP_ADDRESS = "0xDabEbE1f35842cD865B49d601F672eBd873b216E";
async function main() {
    
    // await hre.run("verify:verify", {
    //     address: "0xDabEbE1f35842cD865B49d601F672eBd873b216E",
    //     constructorArguments: [
    //       "0x633aDfb3430b96238c9FB7026195D1d5b0889EA6"
            
    //     ],
    //   });
 
    const ep = await ethers.getContractAt("Account", EP_ADDRESS);

    console.log("EntryPoint deployed to ", await ep.count());
    

    

    // console.log("EntryPoint deployed to ", ep.target);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
}); // Add closing parenthesis here

