const config = require('./hardhat.config')

const networks = {
  hardhat: {
    forking: {
      url: 'https://eth-mainnet.alchemyapi.io/v2/RbuvkoqtcsoGKG0__pVEKQWjh8cLNyV1',
      blockNumber: 14954555 // <-- edit here
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
