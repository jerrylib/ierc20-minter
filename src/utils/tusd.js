// === Utils === //
import isEmpty from 'lodash/isEmpty'
import BigNumber from 'bignumber.js'
import { web3 } from 'hardhat'

// === Constants === //
import { ETH, BSC, MATIC } from '@/constants/Chain'
import { USDT_ETH, USDT_BSC, USDT_MATIC, TUSD_ETH, TUSD_BSC } from '@/constants/Address'
import { impersonates, sendEthers } from './hardhat'

const IERC20_TUSD = hre.artifacts.require('IERC20_TUSD')

export const mintTusdByAddressInEth = async (reciver, amount = new BigNumber(10).pow(6)) => {
  if (isEmpty(reciver)) return 0
  const TOKEN = await IERC20_TUSD.at(TUSD_ETH)
  const tokenName = await TOKEN.name()
  const tokenOwner = await TOKEN.owner()
  const nextAmount = new BigNumber(amount)
  console.log(`[Mint]开始为账户充值 ${tokenName}，充值数量：%s`, nextAmount.toFormat())

  // 给钱包账户发送1ETH，确保从里面提钱的交易正常。
  await sendEthers(tokenOwner)

  const callback = await impersonates([tokenOwner])
  await TOKEN.mint(reciver, nextAmount, {
    from: tokenOwner
  })

  console.log(`${tokenName} 余额：` + new BigNumber(await TOKEN.balanceOf(reciver)).toFormat())
  console.log(`${tokenName} 充值完成`)
  await callback()
  return amount
}

export const mintTusdByAddressInBsc = async (reciver, amount = new BigNumber(10).pow(18)) => {
  if (isEmpty(reciver)) return 0
  const TOKEN = await IERC20_TUSD.at(TUSD_BSC)
  const tokenOwner = await TOKEN.getOwner()
  const tokenName = await TOKEN.name()
  const nextAmount = new BigNumber(amount)
  console.log(`[Mint]开始为账户充值 ${tokenName}，充值数量：%s`, nextAmount.toFormat())

  // 给钱包账户发送1ETH，确保从里面提钱的交易正常。
  await sendEthers(tokenOwner)
  const callback = await impersonates([tokenOwner])

  await TOKEN.mint(nextAmount, {
    from: tokenOwner
  })
  await TOKEN.transfer(reciver, nextAmount, {
    from: tokenOwner
  })
  console.log(`${tokenName} 余额：` + new BigNumber(await TOKEN.balanceOf(reciver)).toFormat())
  console.log(`${tokenName} 充值完成`)
  await callback()
  return amount
}

export const mintUsdtByAddressInMatic = async (reciver, amount = new BigNumber(10).pow(18)) => {}

const functionMap = {
  [ETH]: mintTusdByAddressInEth,
  [BSC]: mintTusdByAddressInBsc
  // [MATIC]: mintUsdtByAddressInMatic,
}

export const mintTusdByAddress = async (amount, reciver, chainId) => {
  const caller = functionMap[chainId]
  if (isEmpty(caller)) return new Error('chainId not support, chainId:', chainId)
  return caller(amount, reciver)
}
