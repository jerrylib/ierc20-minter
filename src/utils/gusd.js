// === Utils === //
import isEmpty from 'lodash/isEmpty'
import BigNumber from 'bignumber.js'

// === Constants === //
import { ETH } from '@/constants/Chain'
import { sendEthers } from './hardhat'

export const mintGusdByAddressInEth = async (reciver, amount = new BigNumber(10).pow(18)) => {
  if (isEmpty(reciver)) return new BigNumber(0)

  return amount
}

export const mintGusdByAddressInBsc = async (reciver, amount = new BigNumber(10).pow(18)) => {
  return amount
}

export const mintGusdByAddressInMatic = async (reciver, amount = new BigNumber(10).pow(18)) => {
  return amount
}

const functionMap = {
  [ETH]: mintGusdByAddressInEth
}

export const mintGusdByAddress = async (reciver, amount, chainId) => {
  const caller = functionMap[chainId]
  if (isEmpty(caller)) return new Error('chainId not support, chainId:', chainId)
  return caller(reciver, amount)
}
