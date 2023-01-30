/* 
Deployment:

Publicação de um Smart Contract ERC20 Mintable
de nome Token, símbolo TKN e supply 100
na Blockchain Polygon
Usando a Wallet "Criptolab"

A publicação desse Smart Contract 
é propiciada por uma Compilação feita
usando solc
*/

import Web3 from 'web3';

import { IBlockchainData } from '../domain/data/blockchainData';
import { CompilationResult, ICompiler } from '../domain/data/compiler';
import { IContractData } from '../domain/data/contractData';
import { IUserData } from '../domain/data/userData';
import { IWalletData } from '../domain/data/walletData';
import { ContractCompiler } from '../domain/entities/contractCompiler';

export class Deploy {
    constructor(
        readonly walletData: IWalletData,
        readonly contractData: IContractData,
        readonly blockchainData: IBlockchainData,
        readonly userData: IUserData,
        readonly compiler: ICompiler
    ) {}

    async execute(
        configInput: Config,
        blockchainInput: Blockchain
    ): Promise<any> {
        // consulta o blockchain data

        const providerIsValid = await this.blockchainData.getProvider(
            blockchainInput.provider
        );

        if (!providerIsValid) {
            return 'provider invalid';
        }
        const provider = new Web3.providers.HttpProvider(providerIsValid);
        const web3 = new Web3(provider);

        // consulta o contract data
        const contractIsValid = await this.contractData.getContract(
            configInput.contractName
        );
        if (!contractIsValid) {
            return 'contract invalid';
        }

        const { userName } = configInput;
        // consulta o user data
        const userIsValid = await this.userData.getUser(userName);
        if (!userIsValid) {
            return 'user invalid';
        }

        const currentCompiler = this.compiler;
        const contractCompiler = new ContractCompiler(currentCompiler);
        const compilationResult: CompilationResult = contractCompiler.compile(
            configInput.contractName
        );

        if (!compilationResult) {
            return 'compiling error';
        }

        const contract = new web3.eth.Contract(compilationResult.abi);

        if (
            !configInput.contractParams.supply ||
            !configInput.contractParams.tokenName ||
            !configInput.contractParams.tokenSymbol
        ) {
            return 'contractParams invalid';
        }

        const contractEncoded = await contract
            .deploy({
                data: compilationResult.bytecode,
                arguments: [
                    configInput.contractParams.tokenName,
                    configInput.contractParams.tokenSymbol,
                    configInput.contractParams.supply,
                ],
            })
            .encodeABI();

        // consulta a wallet data
        const walletIsValid: Wallet = await this.walletData.getWallet();

        if (!walletIsValid) {
            return 'wallet invalid';
        }

        // Envie a transação usando o método sendTransaction() da instância do Web3
        const nonce = await web3.eth.getTransactionCount(
            walletIsValid.publicAddress,
            'pending'
        );
        // const nonceHex = this.web3.utils.toHex(nonce);
        const gasPrice = await web3.eth.getGasPrice();
        const gasPriceHex = web3.utils.toHex(gasPrice);
        const gasLimitHex = web3.utils.toHex(6000000);

        const rawTx = {
            nonce,
            gasPrice: gasPriceHex,
            gasLimit: gasLimitHex,
            data: contractEncoded,
            from: walletIsValid.publicAddress,
        };

        const signedTx = await web3.eth.accounts.signTransaction(
            rawTx,
            walletIsValid.privateKey
        );

        if (!signedTx.rawTransaction) {
            throw new Error('transação não assinada');
        }

        const receipt = await web3.eth.sendSignedTransaction(
            signedTx.rawTransaction
        );

        if (!receipt.contractAddress) {
            return 'falha ao criar o contract';
        }

        await this.userData.addContract(
            userIsValid.name,
            receipt.contractAddress,
            blockchainInput.provider,
            contractIsValid
        );
        const contracts = await this.userData.getContracts(userIsValid.name);
        console.log(`contracts do user ${userIsValid.name}`, contracts);

        return receipt;
    }
}

export type Wallet = {
    privateKey: string;
    publicAddress: string;
};

export type Config = {
    contractName: string;
    contractParams: {
        tokenName: string;
        tokenSymbol: string;
        supply: number;
    };
    userName: string;
};
export type Blockchain = {
    provider: string;
};
