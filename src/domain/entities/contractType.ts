import fs from 'fs';
import path from 'path';

import { IContractData } from '../data/contractData';

export class ContractType {
    constructor(readonly contractData: IContractData) {}

    async create(
        name: string,
        contractJson: any,
        contractSolidity: any
    ): Promise<any> {
        await this.contractData.createContract(name);

        const contractJsonPath = `${path.resolve()}/src/chain/abi/${name}.json`;

        try {
            fs.writeFileSync(contractJsonPath, contractJson);
        } catch (error) {
            return error;
        }

        const contractSolidityPath = `${path.resolve()}/src/chain/contracts/${name}.sol`;

        try {
            fs.writeFileSync(contractSolidityPath, contractSolidity);
        } catch (error) {
            return error;
        }

        return `ContractType ${name} created`;
    }

    async delete(name: string): Promise<any> {
        await this.contractData.deleteContract(name);

        const contractJsonPath = `${path.resolve()}/src/chain/abi/${name}.json`;
        try {
            fs.unlinkSync(contractJsonPath);
        } catch (error) {
            return error;
        }

        const contractSolidityPath = `${path.resolve()}/src/chain/contracts/${name}.sol`;

        try {
            fs.unlinkSync(contractSolidityPath);
        } catch (error) {
            return error;
        }

        return `ContractType ${name} deleted`;
    }
}
