export interface IContractData {
    getContract(contractName: string): Promise<any>;
    createContract(contractName: string): Promise<any>;
    deleteContract(contractName: string): Promise<any>;
}
