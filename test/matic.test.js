import {
  mintUsdtByAddressInMatic,
  mintUsdcByAddressInMatic,
  mintDaiByAddressInMatic
} from '../src/index'
import { ethers } from 'hardhat'

// === Utils === //
import assert from 'assert'
import BigNumber from 'bignumber.js'

// === Constants === //
import { USDT_MATIC, USDC_MATIC, DAI_MATIC } from '@constants/Address'

const IERC20 = hre.artifacts.require('@interface/IERC20.sol')

let accounts
let farmer1
describe('minter test for MATIC', function () {
  before(async function () {
    await ethers.getSigners().then(resp => {
      accounts = resp
      farmer1 = accounts[19].address
    })
  })

  it('mint Usdt in MATIC', async function () {
    const contract = await IERC20.at(USDT_MATIC)
    const topUpAmount = new BigNumber(10).pow(18 + 9)
    const balanceBefore = await contract.balanceOf(farmer1)
    await mintUsdtByAddressInMatic(farmer1, topUpAmount)
    assert.equal(
      new BigNumber(
        (await contract.balanceOf(farmer1)).sub(balanceBefore)
      ).toString(),
      topUpAmount.toString()
    )
  })

  it('mint Usdc in MATIC', async function () {
    const contract = await IERC20.at(USDC_MATIC)
    const topUpAmount = new BigNumber(10).pow(18 + 9)
    const balanceBefore = await contract.balanceOf(farmer1)
    await mintUsdcByAddressInMatic(farmer1, topUpAmount)
    assert.equal(
      new BigNumber(
        (await contract.balanceOf(farmer1)).sub(balanceBefore)
      ).toString(),
      topUpAmount.toString()
    )
  })

  it('mint Dai in MATIC', async function () {
    const contract = await IERC20.at(DAI_MATIC)
    const topUpAmount = new BigNumber(10).pow(18 + 9)
    const balanceBefore = await contract.balanceOf(farmer1)
    await mintDaiByAddressInMatic(farmer1, topUpAmount)
    assert.equal(
      new BigNumber(
        (await contract.balanceOf(farmer1)).sub(balanceBefore)
      ).toString(),
      topUpAmount.toString()
    )
  })
})
