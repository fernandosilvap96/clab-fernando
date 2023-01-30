import { IContractData } from '../../../domain/data/contractData';

export class ContractDataMemory implements IContractData {
    contractData: string[];

    constructor() {
        this.contractData = ['Contract0', 'CustomErc721', 'CustomErc20'];
    }

    async getContract(contractName: string): Promise<any> {
        const contractValid = this.contractData.find(
            (contractIndex) => contractIndex === contractName
        );

        return contractValid;
    }

    async createContract(contractName: string): Promise<any> {
        this.contractData.push(contractName);
        return this.contractData;
    }

    async deleteContract(contractName: string): Promise<any> {
        this.contractData.filter(
            (contractIndex) => contractIndex === contractName
        );
        return this.contractData;
    }
}
