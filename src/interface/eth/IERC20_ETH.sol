// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./../IERC20.sol";

interface IERC20_ETH is IERC20 {
    function mint(address _to, uint256 amount) external;

    function isMinter(address account) external view returns (bool);

    function masterMinter() external view returns (address);

    function configureMinter(address minter, uint256 minterAllowedAmount)
        external
        returns (bool);

    function issue(uint256 amount) external;

    function owner() external view returns (address);

    function deposit(address user, bytes calldata depositData) external;
}
