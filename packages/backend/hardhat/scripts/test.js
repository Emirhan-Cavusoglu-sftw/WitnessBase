const hre = require("hardhat");

const EP_ADDRESS = "0xB6580c0A7fDCf97044C6d8052116e934a5F748AF";
// 0x986649720B37F6434b2C65836410eA2b1Bb15d4c
// 0xd7486758789b9fAf45B6d3Fba08dE358ae8d8872
async function main() {
    
    
 
    const ep = await ethers.getContractAt("Account", EP_ADDRESS);

    console.log("EntryPoint deployed to ", await ep.attestTSD());
    

    


    console.log("EntryPoint deployed to ", ep.target);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
}); // Add closing parenthesis here

