const config = require('./hardhat.config')

const networks = {
  hardhat: {
    forking: {
      url: 'https://speedy-nodes-nyc.moralis.io/249ea5fa1eb291ff5fc77a1a/bsc/mainnet/archive',
      blockNumber: 18160614
    },
    timeout: 1800000
  },
  localhost: {
    url: 'http://localhost:8545',
    timeout: 1800000
  }
}

module.exports = {
  ...config,
  networks
}
