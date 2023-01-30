// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MintableErc20 is ERC20, Ownable {
    mapping(address => bool) _minter;

    event MinterAdded(address indexed account);
    event MinterRemoved(address indexed account);

    constructor(
        string memory name_,
        string memory symbol_,
        uint256 initialSupply
    ) ERC20(name_, symbol_) {
        _mint(msg.sender, initialSupply);
        _minter[msg.sender] = true;
    }

    modifier onlyMinter() {
        require(_minter[msg.sender], "MintableErc20: Only minter can do this");
        _;
    }

    function addMinter(address account) public onlyMinter {
        _minter[account] = true;
        emit MinterAdded(account);
    }

    function transferMinterRole(address newMinter) public onlyMinter {
        _minter[msg.sender] = false;
        _minter[newMinter] = true;
        emit MinterRemoved(msg.sender);
        emit MinterAdded(newMinter);
    }

    function mint(address account, uint256 amount) public onlyMinter {
        _mint(account, amount);
    }
}
