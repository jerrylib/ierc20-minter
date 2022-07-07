// === Utils === //
import isArray from 'lodash/isArray'
import BigNumber from 'bignumber.js'

/**
 * 身份伪装
 * @param {*} targetAccounts
 * @returns
 */
export const impersonates = async (targetAccounts) => {
  if (!isArray(targetAccounts)) return new Error('must be a array')
  await hre.network.provider.request({
    method: 'hardhat_impersonateAccount',
    params: targetAccounts
  })
  return async () => {
    await hre.network.provider.request({
      method: 'hardhat_stopImpersonatingAccount',
      params: targetAccounts
    })
  }
}

export const sendEthers = (
  reviver,
  amount = new BigNumber(10).pow(18).multipliedBy(10)
) => {
  if (!BigNumber.isBigNumber(amount)) {
    return new Error('must be a bignumber.js object')
  }

  return hre.network.provider.send('hardhat_setBalance', [
    reviver,
    `0x${amount.toString(16)}`
  ])
}
