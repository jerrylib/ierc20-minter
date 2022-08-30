// === Utils === //
import isEmpty from 'lodash/isEmpty'
import BigNumber from 'bignumber.js'

// === Constants === //
import { ETH } from '@/constants/Chain'
import { sendEthers } from './hardhat'

export const mintEthByAddressInEth = async (reciver, amount = new BigNumber(10).pow(18)) => {
  if (isEmpty(to)) return 0
  const tokenName = 'ETH'
  const nextAmount = new BigNumber(amount)
  console.log(`[Mint]Start recharge ${tokenName}，recharge amount：%s`, nextAmount.toFormat())
  const beforeBalance = await balance.current(to)
  await sendEthers(reciver, nextAmount.plus(beforeBalance))
  console.log(`${tokenName} Balance of toAddress：` + new BigNumber(await balance.current(reciver)).toFormat())
  console.log(`${tokenName} recharge completed`)
  return amount
}

export const mintEthByAddressInBsc = async (reciver, amount = new BigNumber(10).pow(18)) => {
  return amount
}

export const mintEthByAddressInMatic = async (reciver, amount = new BigNumber(10).pow(18)) => {
  return amount
}

const functionMap = {
  [ETH]: mintEthByAddressInEth
}

export const mintEthByAddress = async (amount, reciver, chainId) => {
  const caller = functionMap[chainId]
  if (isEmpty(caller)) return new Error('chainId not support, chainId:', chainId)
  return caller(amount, reciver)
}
