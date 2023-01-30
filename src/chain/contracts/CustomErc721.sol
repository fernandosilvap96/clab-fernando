// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/*
 ** Smart Contract para ERC-721 da OpenZeppelin ajustado a partir das demandas/experiências
 ** de mercado. Implementando assim funções como setmaxSupply e um constructor que recebe
 ** os parâmetros de name, symbol e supply.
 ****************************************************************************************/

contract CustomErc721 is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    uint256 public maxSupply = 0;

    Counters.Counter private _tokenIdCounter;

    constructor(
        string memory name_,
        string memory symbol_,
        uint256 supply
    ) ERC721(name_, symbol_) {
        setMaxSupply(supply);
    }

    function safeMint(string memory uri) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, uri);
    }

    function setMaxSupply(uint256 _newMaxSupply) public onlyOwner {
        maxSupply = _newMaxSupply;
    }

    // The following functions are overrides required by Solidity.

    function _burn(uint256 tokenId)
        internal
        override(ERC721, ERC721URIStorage)
    {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
}
