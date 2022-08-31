// === Utils === //
import isEmpty from 'lodash/isEmpty'
import BigNumber from 'bignumber.js'
import { mintEthByAddressInEth } from './eth'

// === Constants === //
import { ETH } from '@/constants/Chain'
import { WETH_ETH } from '@/constants/Address'
import { sendEthers } from './hardhat'

const IERC20_WETH = hre.artifacts.require('IERC20_WETH')

export const mintWethByAddressInEth = async (to, amount = new BigNumber(10).pow(18)) => {
  if (isEmpty(to)) return 0
  const TOKEN = await IERC20_WETH.at(WETH_ETH)
  const tokenName = await TOKEN.name()
  const accounts = await ethers.getSigners()
  const account0 = accounts[0].address

  const nextAmount = new BigNumber(amount)

  await mintEthByAddressInEth(nextAmount, account0)

  console.log(`[Mint]Start recharge ${tokenName}，recharge amount：%s`, nextAmount.toFormat())

  await TOKEN.deposit({ from: account0, value: nextAmount })

  await TOKEN.transfer(to, nextAmount, {
    from: account0
  })

  console.log(`${tokenName} Balance of toAddress：` + new BigNumber(await TOKEN.balanceOf(to)).toFormat())
  console.log(`${tokenName} recharge completed`)
  return amount
}

export const mintWethByAddressInBsc = async (reciver, amount = new BigNumber(10).pow(18)) => {
  return amount
}

export const mintWethByAddressInMatic = async (reciver, amount = new BigNumber(10).pow(18)) => {
  return amount
}

const functionMap = {
  [ETH]: mintWethByAddressInEth
}

export const mintWethByAddress = async (amount, reciver, chainId) => {
  const caller = functionMap[chainId]
  if (isEmpty(caller)) return new Error('chainId not support, chainId:', chainId)
  return caller(amount, reciver)
}
