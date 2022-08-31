// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import './../IERC20.sol';

interface IERC20_TUSD is IERC20 {
    function owner() external view returns (address);

    function mint(address _to, uint256 _amount) external;
}
