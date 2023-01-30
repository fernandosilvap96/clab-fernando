// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/*
 ** Smart Contract para ERC-20 da OpenZeppelin ajustado a partir das demandas/experiências
 ** de mercado. Implementando assim um constructor que recebe os parâmetros de name, symbol
 ** e supply. E faz um mint inicial ao ser criado.
 ****************************************************************************************/

contract CustomErc20 is ERC20, Ownable {
    constructor(
        string memory name_,
        string memory symbol_,
        uint256 initialSupply
    ) ERC20(name_, symbol_) {
        _mint(msg.sender, initialSupply);
    }
}
