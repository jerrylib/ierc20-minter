// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./../IERC20.sol";

interface IERC20_SUSD is IERC20 {
    function issue(address to, uint256 _amount) external;

    function owner() external view returns (address);
}
