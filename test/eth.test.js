import {
  mintUsdtByAddressInEth,
  mintUsdcByAddressInEth,
  mintDaiByAddressInEth,
} from "../src/index";
import { ethers } from "hardhat";

// === Utils === //
import assert from "assert";
import BigNumber from "bignumber.js";

// === Constants === //
import { USDT_ETH, USDC_ETH, DAI_ETH } from "@constants/Address";

const IERC20 = hre.artifacts.require("@interface/IERC20.sol");

let accounts;
let farmer1;
describe("minter test for ETH", function () {
  before(async function () {
    await ethers.getSigners().then((resp) => {
      accounts = resp;
      farmer1 = accounts[19].address;
    });
  });

  it("mint Usdt in eth", async function () {
    const contract = await IERC20.at(USDT_ETH);
    const topUpAmount = new BigNumber(10).pow(6 + 9);
    const balanceBefore = await contract.balanceOf(farmer1);
    await mintUsdtByAddressInEth(farmer1, topUpAmount);
    assert.equal(
      (await contract.balanceOf(farmer1)).sub(balanceBefore).toString(),
      topUpAmount.toString()
    );
  });

  it("mint Usdc in eth", async function () {
    const contract = await IERC20.at(USDC_ETH);
    const topUpAmount = new BigNumber(10).pow(6 + 9);
    const balanceBefore = await contract.balanceOf(farmer1);
    await mintUsdcByAddressInEth(farmer1, topUpAmount);
    assert.equal(
      (await contract.balanceOf(farmer1)).sub(balanceBefore).toString(),
      topUpAmount.toString()
    );
  });

  it("mint Dai in eth", async function () {
    const contract = await IERC20.at(DAI_ETH);
    const topUpAmount = new BigNumber(10).pow(18 + 9);
    const balanceBefore = await contract.balanceOf(farmer1);
    await mintDaiByAddressInEth(farmer1, topUpAmount);
    assert.equal(
      new BigNumber(
        (await contract.balanceOf(farmer1)).sub(balanceBefore)
      ).toString(),
      topUpAmount.toString()
    );
  });
});
