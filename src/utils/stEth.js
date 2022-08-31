// === Utils === //
import isEmpty from 'lodash/isEmpty'
import BigNumber from 'bignumber.js'
import { mintEthByAddressInEth } from './eth'
import { impersonates } from './hardhat'

// === Constants === //
import { ETH } from '@/constants/Chain'
import { STETH_ETH } from '../constants/Address'

const IERC20_STETH = hre.artifacts.require('IERC20_STETH')

const removeSTETHStakeLimit = async () => {
  const TOKEN = await IERC20_STETH.at(STETH_ETH)
  const masterMinter = '0x2e59A20f205bB85a89C53f1936454680651E618e'
  await mintEthByAddressInEth(masterMinter)
  const callback = await impersonates([masterMinter])
  await TOKEN.removeStakingLimit({ from: masterMinter })
  await callback()
}

export const mintStEthByAddressInEth = async (to, amount = new BigNumber(10).pow(18)) => {
  if (isEmpty(to)) return new BigNumber(0)
  const TOKEN = await IERC20_STETH.at(STETH_ETH)
  const tokenName = await TOKEN.name()
  const accounts = await ethers.getSigners()
  const account0 = accounts[0].address

  // mint more
  const nextAmount = new BigNumber(amount).multipliedBy(101).div(100)

  await mintEthByAddressInEth(account0, nextAmount)

  console.log(`[Mint]Start recharge ${tokenName}，recharge amount：%s`, nextAmount.toFormat())

  await removeSTETHStakeLimit()

  await TOKEN.submit(account0, { from: account0, value: nextAmount })
  await TOKEN.transfer(to, nextAmount, {
    from: account0
  })

  console.log(`${tokenName} Balance of toAddress：` + new BigNumber(await TOKEN.balanceOf(to)).toFormat())
  console.log(`${tokenName} recharge completed`)
  return amount
}

export const mintStEthByAddressInBsc = async (reciver, amount = new BigNumber(10).pow(18)) => {
  return amount
}

export const mintStEthByAddressInMatic = async (reciver, amount = new BigNumber(10).pow(18)) => {
  return amount
}

const functionMap = {
  [ETH]: mintStEthByAddressInEth
}

export const mintStEthByAddress = async (reciver, amount, chainId) => {
  const caller = functionMap[chainId]
  if (isEmpty(caller)) return new Error('chainId not support, chainId:', chainId)
  return caller(reciver, amount)
}
