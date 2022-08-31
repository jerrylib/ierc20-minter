// === Utils === //
import isEmpty from 'lodash/isEmpty'
import BigNumber from 'bignumber.js'
import { mintStEthByAddressInEth } from './stEth'

// === Constants === //
import { ETH } from '@/constants/Chain'
import { WST_ETH_ETH } from '@/constants/Address'
import { sendEthers } from './hardhat'
import { STETH_ETH } from '../constants/Address'

const IERC20_WSTETH = hre.artifacts.require('IERC20_WSTETH')

export const mintWstEthByAddressInEth = async (to, amount = new BigNumber(10).pow(18)) => {
  if (isEmpty(to)) return 0
  const TOKEN = await IERC20_WSTETH.at(WST_ETH_ETH)
  const tokenName = await TOKEN.name()
  const stEthPerToken = await TOKEN.stEthPerToken()
  const accounts = await ethers.getSigners()
  const account0 = accounts[0].address
  const nextAmount = new BigNumber(amount)
  const stEthAmount = nextAmount.multipliedBy(stEthPerToken).div(1e18)

  await mintStEthByAddressInEth(stEthAmount, account0)

  console.log(`[Mint]Start recharge ${tokenName}，recharge amount：%s`, nextAmount.toFormat())

  const stETHTOKEN = await IERC20_STETH.at(STETH_ETH)
  const balanceOfSTETH = await stETHTOKEN.balanceOf(account0)
  await stETHTOKEN.approve(WST_ETH_ETH, 0, { from: account0 })
  await stETHTOKEN.approve(WST_ETH_ETH, balanceOfSTETH, { from: account0 })
  await TOKEN.wrap(balanceOfSTETH, { from: account0 })

  await TOKEN.transfer(to, nextAmount, {
    from: account0
  })

  console.log(`${tokenName} Balance of toAddress：` + new BigNumber(await TOKEN.balanceOf(to)).toFormat())
  console.log(`${tokenName} recharge completed`)
  return amount
}

export const mintWstEthByAddressInBsc = async (reciver, amount = new BigNumber(10).pow(18)) => {
  return amount
}

export const mintWstEthByAddressInMatic = async (reciver, amount = new BigNumber(10).pow(18)) => {
  return amount
}

const functionMap = {
  [ETH]: mintWstEthByAddressInEth
}

export const mintWstEthByAddress = async (amount, reciver, chainId) => {
  const caller = functionMap[chainId]
  if (isEmpty(caller)) return new Error('chainId not support, chainId:', chainId)
  return caller(amount, reciver)
}
