import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const MemeVoting = await ethers.getContractFactory("MemeVoting");
  const memeVoting = await MemeVoting.deploy();

  await memeVoting.deployed();

  console.log("MemeVoting contract deployed to:", memeVoting.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });