const config = require("./hardhat.config");

const networks = {
  hardhat: {
    forking: {
      url: "https://polygon-mainnet.g.alchemy.com/v2/Adoz7Rt1NnymP8CLPdhkTLHKncqQXkKz",
      blockNumber: 28787261, // <-- edit here
    },
    timeout: 1800000,
  },
  localhost: {
    url: "http://localhost:8545",
    timeout: 1800000,
  },
};

module.exports = {
  ...config,
  networks,
};
