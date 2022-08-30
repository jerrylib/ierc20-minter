// === Utils === //
import isEmpty from 'lodash/isEmpty'
import BigNumber from 'bignumber.js'

// === Constants === //
import { ETH } from '@/constants/Chain'
import { sendEthers } from './hardhat'

export const mintSEthByAddressInEth = async (reciver, amount = new BigNumber(10).pow(18)) => {
  if (isEmpty(to)) return new BigNumber(0)

  return amount
}

export const mintSEthByAddressInBsc = async (reciver, amount = new BigNumber(10).pow(18)) => {
  return amount
}

export const mintSEthByAddressInMatic = async (reciver, amount = new BigNumber(10).pow(18)) => {
  return amount
}

const functionMap = {
  [ETH]: mintSEthByAddressInEth
}

export const mintSEthByAddress = async (amount, reciver, chainId) => {
  const caller = functionMap[chainId]
  if (isEmpty(caller)) return new Error('chainId not support, chainId:', chainId)
  return caller(amount, reciver)
}
