// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "./MintableErc20.sol";

contract MintableBurnableErc20 is ERC20Burnable, MintableErc20 {
    constructor(
        string memory name_,
        string memory symbol_,
        uint256 initialSupply
    ) MintableErc20(name_, symbol_, initialSupply) {}
}
