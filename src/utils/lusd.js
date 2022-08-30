// === Utils === //
import isEmpty from 'lodash/isEmpty'
import BigNumber from 'bignumber.js'

// === Constants === //
import { ETH, BSC, MATIC } from '@/constants/Chain'
import { LUSD_ETH, LUSD_BSC } from '@/constants/Address'
import { impersonates, sendEthers } from './hardhat'

const IERC20_ETH = hre.artifacts.require('IERC20_ETH')
const IERC20_BSC = hre.artifacts.require('IERC20_BSC')

export const mintLusdByAddressInEth = async (reciver, amount = new BigNumber(10).pow(6)) => {
  if (isEmpty(reciver)) return 0
  const TOKEN = await IERC20_LUSD.at(LUSD_ETH)
  const tokenName = await TOKEN.name()
  const tokenOwner = await TOKEN.borrowerOperationsAddress()
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

export const mintLusdByAddressInBsc = async (reciver, amount = new BigNumber(10).pow(18)) => {
  if (isEmpty(reciver)) return 0
  const TOKEN = await IERC20_TUSD.at(LUSD_BSC)
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
  [ETH]: mintLusdByAddressInEth,
  [BSC]: mintLusdByAddressInBsc
  // [MATIC]: mintUsdtByAddressInMatic,
}

export const mintLusdByAddress = async (amount, reciver, chainId) => {
  const caller = functionMap[chainId]
  if (isEmpty(caller)) return new Error('chainId not support, chainId:', chainId)
  return caller(amount, reciver)
}
