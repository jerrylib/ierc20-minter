// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./../IERC20.sol";

interface IERC20_DAI is IERC20 {
    function mint(address _to, uint256 _amount) external;
}
