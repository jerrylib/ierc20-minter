// === Utils === //
import isEmpty from 'lodash/isEmpty'
import BigNumber from 'bignumber.js'
import { web3 } from 'hardhat'

// === Constants === //
import { ETH, BSC, MATIC } from '@/constants/Chain'
import { DAI_ETH, DAI_BSC, DAI_MATIC } from '@/constants/Address'
import { impersonates, sendEthers } from './hardhat'

const IERC20_ETH = hre.artifacts.require('IERC20_ETH')
const IERC20_BSC = hre.artifacts.require('IERC20_BSC')

export const mintDaiByAddressInEth = async (reciver, amount = new BigNumber(10).pow(18)) => {
  if (isEmpty(reciver)) return new BigNumber(0)
  const TOKEN = await IERC20_ETH.at(DAI_ETH)
  const tokenOwner = '0x9759a6ac90977b93b58547b4a71c78317f391a28'
  const tokenName = await TOKEN.name()
  const nextAmount = new BigNumber(amount)
  console.log(`[Mint]开始为账户充值 ${tokenName}，充值数量：%s`, nextAmount.toFormat())

  // 给钱包账户发送10ETH，确保从里面提钱的交易正常。
  await sendEthers(tokenOwner)
  const callback = await impersonates([tokenOwner])

  await TOKEN.mint(reciver, nextAmount, {
    from: tokenOwner
  })

  console.log(`${tokenName} 充值完成，余额：${new BigNumber(await TOKEN.balanceOf(reciver)).toFormat()}`)
  await callback()
  return amount
}

export const mintDaiByAddressInBsc = async (reciver, amount = new BigNumber(10).pow(18)) => {
  if (isEmpty(reciver)) return 0
  const TOKEN = await IERC20_BSC.at(DAI_BSC)
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
  console.log(`${tokenName} 充值完成, 余额：${new BigNumber(await TOKEN.balanceOf(reciver)).toFormat()}`)
  await callback()
  return amount
}

export const mintDaiByAddressInMatic = async (reciver, amount = new BigNumber(10).pow(18)) => {
  if (isEmpty(reciver)) return new BigNumber(0)
  const TOKEN = await IERC20_ETH.at(DAI_MATIC)
  const tokenName = await TOKEN.symbol()
  const tokenOwner = '0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa'
  const nextAmount = new BigNumber(amount)
  const nextAmountInHex = web3.utils.padLeft(web3.utils.toHex(amount), 64)
  await sendEthers(tokenOwner)
  console.log(`[Mint]开始为账户充值 ${tokenName}，充值数量：%s`, nextAmount.toFormat())
  const callback = await impersonates([tokenOwner])
  await TOKEN.deposit(reciver, nextAmountInHex, {
    from: tokenOwner
  })
  console.log(`${tokenName} 充值完成, 余额：${new BigNumber(await TOKEN.balanceOf(reciver)).toFormat()}`)
  await callback()
  return amount
}

const functionMap = {
  [ETH]: mintDaiByAddressInEth,
  [BSC]: mintDaiByAddressInBsc,
  [MATIC]: mintDaiByAddressInMatic
}

export const mintDaiByAddress = async (reciver, amount, chainId) => {
  const caller = functionMap[chainId]
  if (isEmpty(caller)) return new Error('chainId not support, chainId:', chainId)
  return caller(reciver, amount)
}
