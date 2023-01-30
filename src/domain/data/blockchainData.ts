export interface IBlockchainData {
    getProvider(provider: string): Promise<any>;
    createBlockchainConnection(name: string, url: string): Promise<any>;
    deleteBlockchainConnection(name: string): Promise<any>;
}
