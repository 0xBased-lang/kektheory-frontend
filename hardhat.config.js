require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    // BasedAI Mainnet (Chain ID: 32323)
    basedai: {
      url: process.env.BASEDAI_RPC_URL || "https://mainnet.basedaibridge.com/rpc",
      chainId: 32323,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      gasPrice: 100000000, // 0.1 Gwei (BasedAI typical)
      gas: 8000000, // 8M gas limit
      timeout: 60000, // 60 second timeout
    },
    // Localhost for testing
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    // Hardhat network for testing
    hardhat: {
      chainId: 31337,
    },
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
  // Etherscan verification (BasedAI explorer)
  etherscan: {
    apiKey: {
      basedai: "no-api-key-needed",
    },
    customChains: [
      {
        network: "basedai",
        chainId: 32323,
        urls: {
          apiURL: "https://explorer.bf1337.org/api",
          browserURL: "https://explorer.bf1337.org",
        },
      },
    ],
  },
};
