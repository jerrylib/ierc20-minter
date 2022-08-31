// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./../IERC20.sol";

interface IERC20_USDC is IERC20 {
    function owner() external view returns (address);

    function mint(address _to, uint256 _amount) external;

    function isMinter(address _account) external view returns (bool);

    function masterMinter() external view returns (address);

    function configureMinter(address _minter, uint256 _minterAllowedAmount) external returns (bool);
}
