// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./../IERC20.sol";

interface IERC20_BSC is IERC20 {
    function mint(uint256 amount) external;

    function getOwner() external view returns (address);
}
