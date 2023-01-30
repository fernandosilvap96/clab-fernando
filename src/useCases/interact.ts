import fs from 'fs';
import path from 'path';
import Web3 from 'web3';

import { IBlockchainData } from '../domain/data/blockchainData';
import { IContractData } from '../domain/data/contractData';
import { IUserData } from '../domain/data/userData';
import { IWalletData } from '../domain/data/walletData';
import { Wallet } from './deploy';

export class Interact {
    constructor(
        readonly walletData: IWalletData,
        readonly contractData: IContractData,
        readonly blockchainData: IBlockchainData,
        readonly userData: IUserData
    ) {}

    async execute(
        configInput: any,
        method: any,
        contractAddress: string
    ): Promise<any> {
        const walletIsValid: Wallet = await this.walletData.getWallet();
        console.log('wallet', walletIsValid);
        if (!walletIsValid) {
            return 'wallet invalid';
        }
        const { userName } = configInput;
        const userIsValid = await this.userData.getUser(userName);
        if (!userIsValid) {
            return 'user invalid';
        }
        const contractData = await this.userData.getContract(
            userName,
            contractAddress
        );
        const providerIsValid = await this.blockchainData.getProvider(
            contractData.chain
        );
        if (!providerIsValid) {
            return 'provider invalid';
        }
        const setPath = path.resolve();
        const pathJson = `${setPath}/src/chain/abi/${contractData.type}.json`;
        let contractAbi;
        try {
            const abi = fs.readFileSync(pathJson, 'utf8');
            contractAbi = JSON.parse(abi);
        } catch (error) {
            return error;
        }
        const provider = new Web3.providers.HttpProvider(providerIsValid);
        const web3 = new Web3(provider);

        const contract = new web3.eth.Contract(contractAbi, contractAddress);

        console.log('method', method);
        console.log('configInput', configInput.methodParams);
        const methodEncoded = await contract.methods[method](
            ...configInput.methodParams
        ).encodeABI();

        const gasPrice = await web3.eth.getGasPrice();
        const gasPriceHex = web3.utils.toHex(gasPrice);
        const gasLimitHex = web3.utils.toHex(6000000);
        const nonce = await web3.eth.getTransactionCount(
            walletIsValid.publicAddress,
            'pending'
        );

        const rawTx = {
            nonce,
            gasPrice: gasPriceHex,
            gasLimit: gasLimitHex,
            data: methodEncoded,
            from: walletIsValid.publicAddress,
            to: contractAddress,
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

        return receipt;
    }
}
