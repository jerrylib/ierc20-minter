// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./../IERC20.sol";

interface IERC20_USDT is IERC20 {
    function issue(uint256 _amount) external;

    function owner() external view returns (address);
}
