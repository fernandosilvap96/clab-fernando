import { IBlockchainData } from '../../../domain/data/blockchainData';

export class BlockchainDataMemory implements IBlockchainData {
    blockchainData: any[];

    constructor() {
        this.blockchainData = [
            {
                name: 'polygon',
                url: 'https://polygon-mainnet.g.alchemy.com/v2/WHev3DotE_g-6l9OK49C1UTeOlf6um7j',
            },
            {
                name: 'binance',
                url: 'https://Input-seed-prebsc-1-s1.binance.org:8545/',
            },
            {
                name: 'ethereum',
                url: 'https://eth-goerli.g.alchemy.com/v2/iFxTVL17uwE0H4vbr47MJ2U95bPND5en',
            },
        ];
    }

    async createBlockchainConnection(name: string, url: string): Promise<any> {
        const blockchain = {
            name,
            url,
        };
        this.blockchainData.push(blockchain);
        return this.blockchainData;
    }

    async deleteBlockchainConnection(name: string): Promise<any> {
        this.blockchainData.filter(
            (blockchainIndex) => blockchainIndex.name === name
        );
        return this.blockchainData;
    }

    async getProvider(provider: string): Promise<any> {
        const providerValid = this.blockchainData.find(
            (providerIndex) => providerIndex.name === provider
        );

        if (!providerValid) {
            return undefined;
        }

        return providerValid.url;
    }
}
