require('@babel/register')
require('@nomiclabs/hardhat-truffle5')
require('@nomiclabs/hardhat-waffle')
require('@nomiclabs/hardhat-ethers')

process.env.FORCE_COLOR = '3'
process.env.TS_NODE_TRANSPILE_ONLY = 'true'

const DEFAULT_BLOCK_GAS_LIMIT = 30000000

task('accounts', 'Prints the list of accounts', async () => {
  const accounts = await ethers.getSigners()

  for (const account of accounts) {
    console.log(account.address)
  }
})

const config = {
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {
      forking: {
        url: 'https://eth-mainnet.alchemyapi.io/v2/RbuvkoqtcsoGKG0__pVEKQWjh8cLNyV1',
        blockNumber: 14954555 // <-- edit here
      },
      blockGasLimit: DEFAULT_BLOCK_GAS_LIMIT,
      timeout: 1800000,
      allowUnlimitedContractSize: true
    },
    localhost: {
      url: 'http://localhost:8545',
      allowUnlimitedContractSize: true,
      timeout: 1800000
    }
  },
  solidity: {
    compilers: [
      {
        version: '0.6.12',
        settings: {
          optimizer: {
            details: {
              yul: false
            },
            enabled: true,
            runs: 200
          }
        }
      },
      {
        version: '0.8.3',
        settings: {
          optimizer: {
            details: {
              yul: true
            },
            enabled: true,
            runs: 200
          }
        }
      }
    ]
  },
  paths: {
    sources: './src/interface'
  },
  mocha: {
    timeout: 2000000
  },
  gasReporter: {
    enabled: true,
    currency: 'USD'
  },
  contractSizer: {
    alphaSort: true,
    runOnCompile: true,
    disambiguatePaths: false
  }
}

module.exports = config
