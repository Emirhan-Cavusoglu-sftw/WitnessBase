const hre = require("hardhat");

const EP_ADDRESS = "0x3106Da244d5C404D2aBb16EF75af9Cb68BfFd3c5";
// 0x986649720B37F6434b2C65836410eA2b1Bb15d4c
// 0xd7486758789b9fAf45B6d3Fba08dE358ae8d8872
async function main() {
  const ep = await ethers.getContractAt("Account", EP_ADDRESS);

  await ep.createTSD("emo", "emo", "emo");

  const receipt = await ep.attestTSD();

  const tsd = await ep.lastTSD();

  console.log("EntryPoint deployed to ", tsd);
  console.log("EntryPoint deployed to ", receipt);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
