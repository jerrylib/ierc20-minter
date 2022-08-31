// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./../IERC20.sol";

interface IERC20_STETH is IERC20 {
    function submit(address _to) external;
    function removeStakingLimit() external;
}
