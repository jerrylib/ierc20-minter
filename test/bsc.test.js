import { mintUsdtByAddressInBsc, mintUsdcByAddressInBsc, mintDaiByAddressInBsc } from '../src'
import { ethers } from 'hardhat'

// === Utils === //
import assert from 'assert'
import BigNumber from 'bignumber.js'

// === Constants === //
import { USDT_BSC, USDC_BSC, DAI_BSC } from '@/constants/Address'

const IERC20 = hre.artifacts.require('@interface/IERC20.sol')

let accounts
let farmer1
describe('minter test for BSC', function () {
  before(async function () {
    await ethers.getSigners().then(resp => {
      accounts = resp
      farmer1 = accounts[19].address
    })
  })

  it('mint Usdt in BSC', async function () {
    const contract = await IERC20.at(USDT_BSC)
    const topUpAmount = new BigNumber(10).pow(18 + 9)
    const balanceBefore = await contract.balanceOf(farmer1)
    await mintUsdtByAddressInBsc(farmer1, topUpAmount)
    assert.equal(new BigNumber((await contract.balanceOf(farmer1)).sub(balanceBefore)).toString(), topUpAmount.toString())
  })

  it('mint Usdc in BSC', async function () {
    const contract = await IERC20.at(USDC_BSC)
    const topUpAmount = new BigNumber(10).pow(18 + 9)
    const balanceBefore = await contract.balanceOf(farmer1)
    await mintUsdcByAddressInBsc(farmer1, topUpAmount)
    assert.equal(new BigNumber((await contract.balanceOf(farmer1)).sub(balanceBefore)).toString(), topUpAmount.toString())
  })

  it('mint Dai in BSC', async function () {
    const contract = await IERC20.at(DAI_BSC)
    const topUpAmount = new BigNumber(10).pow(18 + 9)
    const balanceBefore = await contract.balanceOf(farmer1)
    await mintDaiByAddressInBsc(farmer1, topUpAmount)
    assert.equal(new BigNumber((await contract.balanceOf(farmer1)).sub(balanceBefore)).toString(), topUpAmount.toString())
  })
})
