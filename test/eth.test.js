import {
  mintUsdtByAddressInEth,
  mintUsdcByAddressInEth,
  mintDaiByAddressInEth,
  mintEthByAddress,
  mintGusdByAddressInEth,
  mintLusdByAddressInEth,
  mintREth2ByAddressInEth,
  mintRocketPoolEthByAddressInEth,
  mintSEthByAddressInEth,
  mintSEth2ByAddressInEth,
  mintStEthByAddressInEth,
  mintSusdByAddressInEth,
  mintTusdByAddressInEth,
  mintUsdpByAddressInEth,
  mintWethByAddressInEth,
  mintWstEthByAddressInEth
} from '../src'
import { ethers } from 'hardhat'

// === Utils === //
import assert from 'assert'
import BigNumber from 'bignumber.js'

// === Constants === //
import { USDT_ETH, USDC_ETH, DAI_ETH, LUSD_ETH, GUSD_ETH } from '@/constants/Address'

const IERC20 = hre.artifacts.require('@interface/IERC20.sol')

let accounts
let farmer1
describe('minter test for ETH', function () {
  before(async function () {
    await ethers.getSigners().then(resp => {
      accounts = resp
      farmer1 = accounts[19].address
    })
  })

  it('mint Usdt in eth', async function () {
    const contract = await IERC20.at(USDT_ETH)
    const topUpAmount = new BigNumber(10).pow(6 + 9)
    const balanceBefore = await contract.balanceOf(farmer1)
    await mintUsdtByAddressInEth(farmer1, topUpAmount)
    assert.equal((await contract.balanceOf(farmer1)).sub(balanceBefore).toString(), topUpAmount.toString())
  })

  it('mint Usdc in eth', async function () {
    const contract = await IERC20.at(USDC_ETH)
    const topUpAmount = new BigNumber(10).pow(6 + 9)
    const balanceBefore = await contract.balanceOf(farmer1)
    await mintUsdcByAddressInEth(farmer1, topUpAmount)
    assert.equal((await contract.balanceOf(farmer1)).sub(balanceBefore).toString(), topUpAmount.toString())
  })

  it('mint Dai in eth', async function () {
    const contract = await IERC20.at(DAI_ETH)
    const topUpAmount = new BigNumber(10).pow(18 + 9)
    const balanceBefore = await contract.balanceOf(farmer1)
    await mintDaiByAddressInEth(farmer1, topUpAmount)
    assert.equal(new BigNumber((await contract.balanceOf(farmer1)).sub(balanceBefore)).toString(), topUpAmount.toString())
  })

  it('mint Lusd in eth', async function () {
    const contract = await IERC20.at(LUSD_ETH)
    const topUpAmount = new BigNumber(10).pow(18 + 9)
    const balanceBefore = await contract.balanceOf(farmer1)
    await mintLusdByAddressInEth(farmer1, topUpAmount)
    assert.equal(new BigNumber((await contract.balanceOf(farmer1)).sub(balanceBefore)).toString(), topUpAmount.toString())
  })

  it('mint Gusd in eth', async function () {
    const contract = await IERC20.at(GUSD_ETH)
    const topUpAmount = new BigNumber(10).pow(18 + 9)
    const balanceBefore = await contract.balanceOf(farmer1)
    await mintGusdByAddressInEth(farmer1, topUpAmount)
    assert.equal(new BigNumber((await contract.balanceOf(farmer1)).sub(balanceBefore)).toString(), topUpAmount.toString())
  })

  it('mint rEth2 in eth', async function () {
    const contract = await IERC20.at(RETH2_ETH)
    const topUpAmount = new BigNumber(10).pow(18 + 9)
    const balanceBefore = await contract.balanceOf(farmer1)
    await mintREth2ByAddressInEth(farmer1, topUpAmount)
    assert.equal(new BigNumber((await contract.balanceOf(farmer1)).sub(balanceBefore)).toString(), topUpAmount.toString())
  })

  it('mint rocketPoolEth in eth', async function () {
    const contract = await IERC20.at(ROCKET_POOL_ETH_ETH)
    const topUpAmount = new BigNumber(10).pow(18 + 9)
    const balanceBefore = await contract.balanceOf(farmer1)
    await mintRocketPoolEthByAddressInEth(farmer1, topUpAmount)
    assert.equal(new BigNumber((await contract.balanceOf(farmer1)).sub(balanceBefore)).toString(), topUpAmount.toString())
  })

  it('mint sEth in eth', async function () {
    const contract = await IERC20.at(SETH_ETH)
    const topUpAmount = new BigNumber(10).pow(18 + 9)
    const balanceBefore = await contract.balanceOf(farmer1)
    await mintSEthByAddressInEth(farmer1, topUpAmount)
    assert.equal(new BigNumber((await contract.balanceOf(farmer1)).sub(balanceBefore)).toString(), topUpAmount.toString())
  })

  it('mint sEth2 in eth', async function () {
    const contract = await IERC20.at(SETH2_ETH)
    const topUpAmount = new BigNumber(10).pow(18 + 9)
    const balanceBefore = await contract.balanceOf(farmer1)
    await mintSEth2ByAddressInEth(farmer1, topUpAmount)
    assert.equal(new BigNumber((await contract.balanceOf(farmer1)).sub(balanceBefore)).toString(), topUpAmount.toString())
  })

  it('mint stEth in eth', async function () {
    const contract = await IERC20.at(STETH_ETH)
    const topUpAmount = new BigNumber(10).pow(18 + 9)
    const balanceBefore = await contract.balanceOf(farmer1)
    await mintStEthByAddressInEth(farmer1, topUpAmount)
    assert.equal(new BigNumber((await contract.balanceOf(farmer1)).sub(balanceBefore)).toString(), topUpAmount.toString())
  })

  it('mint sUsd in eth', async function () {
    const contract = await IERC20.at(SUSD_ETH)
    const topUpAmount = new BigNumber(10).pow(18 + 9)
    const balanceBefore = await contract.balanceOf(farmer1)
    await mintSusdByAddressInEth(farmer1, topUpAmount)
    assert.equal(new BigNumber((await contract.balanceOf(farmer1)).sub(balanceBefore)).toString(), topUpAmount.toString())
  })

  it('mint tUsd in eth', async function () {
    const contract = await IERC20.at(TUSD_ETH)
    const topUpAmount = new BigNumber(10).pow(18 + 9)
    const balanceBefore = await contract.balanceOf(farmer1)
    await mintTusdByAddressInEth(farmer1, topUpAmount)
    assert.equal(new BigNumber((await contract.balanceOf(farmer1)).sub(balanceBefore)).toString(), topUpAmount.toString())
  })

  it('mint usdp in eth', async function () {
    const contract = await IERC20.at(USDP_ETH)
    const topUpAmount = new BigNumber(10).pow(18 + 9)
    const balanceBefore = await contract.balanceOf(farmer1)
    await mintUsdpByAddressInEth(farmer1, topUpAmount)
    assert.equal(new BigNumber((await contract.balanceOf(farmer1)).sub(balanceBefore)).toString(), topUpAmount.toString())
  })

  it('mint weth in eth', async function () {
    const contract = await IERC20.at(WETH_ETH)
    const topUpAmount = new BigNumber(10).pow(18 + 9)
    const balanceBefore = await contract.balanceOf(farmer1)
    await mintWethByAddressInEth(farmer1, topUpAmount)
    assert.equal(new BigNumber((await contract.balanceOf(farmer1)).sub(balanceBefore)).toString(), topUpAmount.toString())
  })

  it('mint wstEth in eth', async function () {
    const contract = await IERC20.at(WSTETH_ETH)
    const topUpAmount = new BigNumber(10).pow(18 + 9)
    const balanceBefore = await contract.balanceOf(farmer1)
    await mintWstEthByAddressInEth(farmer1, topUpAmount)
    assert.equal(new BigNumber((await contract.balanceOf(farmer1)).sub(balanceBefore)).toString(), topUpAmount.toString())
  })
})
