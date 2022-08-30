// === Utils === //
import isEmpty from 'lodash/isEmpty'
import BigNumber from 'bignumber.js'

// === Constants === //
import { ETH } from '@/constants/Chain'
import { sendEthers } from './hardhat'

export const mintSEth2ByAddressInEth = async (reciver, amount = new BigNumber(10).pow(18)) => {
  if (isEmpty(to)) return new BigNumber(0)

  return amount
}

export const mintSEth2ByAddressInBsc = async (reciver, amount = new BigNumber(10).pow(18)) => {
  return amount
}

export const mintSEth2ByAddressInMatic = async (reciver, amount = new BigNumber(10).pow(18)) => {
  return amount
}

const functionMap = {
  [ETH]: mintSEth2ByAddressInEth
}

export const mintSEth2ByAddress = async (amount, reciver, chainId) => {
  const caller = functionMap[chainId]
  if (isEmpty(caller)) return new Error('chainId not support, chainId:', chainId)
  return caller(amount, reciver)
}
