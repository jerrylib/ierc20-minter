// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./../IERC20.sol";

interface IERC20_ROCKET_POOL_ETH is IERC20 {
    function getExchangeRate() external view returns (uint256);

    function mint(uint256 _ethAmount, address _to) external;
}
