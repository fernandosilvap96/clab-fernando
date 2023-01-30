export interface IUserData {
    createUser(name: string, password: string): Promise<any>;
    deleteUser(name: string): Promise<any>;
    getUser(name: string): Promise<any>;
    addContract(
        name: string,
        contractAddress: string,
        chain: string,
        type: string
    ): Promise<any>;
    getContracts(name: string): Promise<any>;
    getContract(name: string, contractAddress: string): Promise<any>;
}
