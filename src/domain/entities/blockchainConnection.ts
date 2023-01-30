import { IBlockchainData } from '../data/blockchainData';

export class BlockchainConnection {
    constructor(readonly blockchainData: IBlockchainData) {}

    async create(name: string, url: string): Promise<any> {
        await this.blockchainData.createBlockchainConnection(name, url);

        return `BlockchainConnection ${name} created`;
    }

    async delete(name: string): Promise<any> {
        await this.blockchainData.deleteBlockchainConnection(name);

        return `BlockchainConnection ${name} deleted`;
    }
}
