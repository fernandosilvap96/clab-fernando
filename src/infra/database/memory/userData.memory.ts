import { IUserData } from '../../../domain/data/userData';

export class UserDataMemory implements IUserData {
    userData: any[];

    constructor() {
        this.userData = [
            {
                name: 'alejandro',
                password: '1234567',
                contracts: [
                    {
                        address:
                            '0x1c815cf9f87cbe72dee844665df2b2291d645a85bd526a5da8d97152ab07fae7',
                        chain: 'polygon',
                        type: 'CustomErc721',
                    },
                ],
            },
            {
                name: 'fernando',
                password: '1234567',
                contracts: [
                    {
                        address: '0x68474Dd8A379bFae822a673448bd1648aFF3Aa35',
                        chain: 'polygon',
                        type: 'CustomErc721',
                    },
                ],
            },
        ];
    }

    getContract(name: string, contractAddress: string): Promise<any> {
        const userValid = this.userData.find(
            (userIndex) => userIndex.name === name
        );
        const contractValid = userValid.contracts.find(
            (contractIndex: any) => contractIndex.address === contractAddress
        );
        return contractValid;
    }

    async getUser(name: string): Promise<any> {
        const userValid = this.userData.find(
            (userIndex) => userIndex.name === name
        );

        if (!userValid) {
            return undefined;
        }

        return userValid;
    }

    async createUser(name: string, password: string): Promise<any> {
        const user = {
            name,
            password,
        };
        this.userData.push(user);
        return this.userData;
    }

    async deleteUser(name: string): Promise<any> {
        this.userData.filter((userIndex) => userIndex.name === name);
        return this.userData;
    }

    async addContract(
        name: string,
        address: string,
        chain: string,
        type: string
    ): Promise<any> {
        const oldData = this.userData.find(
            (userIndex) => userIndex.name === name
        );

        const newData = oldData.contracts.push({
            address,
            chain,
            type,
        });

        this.userData.push(newData);
    }

    async getContracts(name: string): Promise<any> {
        const data = this.userData.find((userIndex) => userIndex.name === name);

        return data.contracts;
    }
}
