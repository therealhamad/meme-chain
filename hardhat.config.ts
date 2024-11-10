import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "dotenv/config";

console.log("AIA_RPC_URL:", process.env.AIA_RPC_URL);
console.log("PRIVATE_KEY:", process.env.PRIVATE_KEY);

const config: HardhatUserConfig = {
  solidity: "0.8.27",
  networks: {
    aia: {
      url: process.env.AIA_RPC_URL || "",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    },
  },
};

export default config;