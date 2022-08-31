// === Utils === //
import isEmpty from 'lodash/isEmpty'
import BigNumber from 'bignumber.js'
import { mintEthByAddressInEth } from './eth'

// === Constants === //
import { ETH } from '@/constants/Chain'
import { ROCKET_POOL_ETH_ETH } from '@/constants/Address'
import { sendEthers } from './hardhat'

const IERC20_ROCKET_POOL_ETH = hre.artifacts.require('IERC20_ROCKET_POOL_ETH')

export const mintRocketPoolEthByAddressInEth = async (to, amount = new BigNumber(10).pow(18)) => {
  if (isEmpty(to)) return new BigNumber(0)

  const TOKEN = await IERC20_ROCKET_POOL_ETH.at(ROCKET_POOL_ETH_ETH)
  const decimal = new BigNumber(10).pow(18)
  const tokenName = await TOKEN.name()
  const rethValue = await TOKEN.getExchangeRate()
  const tokenOwner = '0x4D05E3d48a938db4b7a9A59A802D5b45011BDe58'

  const nextAmount = new BigNumber(amount)
  const rethAmount = nextAmount.multipliedBy(rethValue).div(decimal).multipliedBy(101).div(100)
  await mintEthByAddressInEth(decimal, tokenOwner)
  await mintEthByAddressInEth(rethAmount, tokenOwner)
  console.log(`[Mint]Start recharge ${tokenName}，recharge amount：%s`, nextAmount.toFormat())

  impersonates([tokenOwner])

  await TOKEN.mint(rethAmount, to, {
    from: tokenOwner
  })

  console.log(`${tokenName} Balance of toAddress：` + new BigNumber(await TOKEN.balanceOf(to)).toFormat())
  console.log(`${tokenName} recharge completed`)
  return amount
}

export const mintRocketPoolEthByAddressInBsc = async (reciver, amount = new BigNumber(10).pow(18)) => {
  return amount
}

export const mintRocketPoolEthByAddressInMatic = async (reciver, amount = new BigNumber(10).pow(18)) => {
  return amount
}

const functionMap = {
  [ETH]: mintRocketPoolEthByAddressInEth
}

export const mintRocketPoolEthByAddress = async (amount, reciver, chainId) => {
  const caller = functionMap[chainId]
  if (isEmpty(caller)) return new Error('chainId not support, chainId:', chainId)
  return caller(amount, reciver)
}
