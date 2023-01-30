import axios from 'axios';
import fs from 'fs';
import path from 'path';

import { Blockchain, Config } from '../src/useCases/deploy';
// eslint-disable-next-line func-names
axios.defaults.validateStatus = function () {
    return true;
};

// test.skipes do deploy
test.skip('O usuario deve poder fazer um deploy de um smart Contract Er721 na polygon', async () => {
    const configInput: Config = {
        contractName: 'CustomErc721',
        contractParams: {
            tokenName: 'CriptoToken',
            tokenSymbol: 'CT',
            supply: 100000,
        },
        userName: 'fernando',
    };
    const blockchainInput: Blockchain = {
        provider: 'polygon',
    };

    const input = {
        blockchainInput,
        configInput,
    };

    const response = await axios.post('http://localhost:3000/deploy', input);
    const output = response.data;

    console.log('output', output);

    expect(output).not.toBe(undefined);
}, 300000);

test.skip('Provider inválido', async () => {
    const blockchainInput: Blockchain = {
        provider: 'providerErrado',
    };
    const configInput: Config = {
        contractName: 'CustomErc721',
        contractParams: {
            tokenName: 'CriptoToken',
            tokenSymbol: 'CT',
            supply: 100000,
        },
        userName: 'fernando',
    };

    const input = {
        blockchainInput,
        configInput,
    };

    const response = await axios.post('http://localhost:3000/deploy', input);

    const output = response.data;
    expect(output).toBe('provider invalid');
}, 300000);

test.skip('O usuario deve poder fazer uma interação com o contrato deployado', async () => {
    const configInput: any = {
        methodParams: ['x'],
        userName: 'fernando',
    };

    const input = {
        configInput,
    };

    const response = await axios.post(
        'http://localhost:3000/0x68474Dd8A379bFae822a673448bd1648aFF3Aa35/safeMint',
        input
    );
    const output = response.data;

    console.log('output', output);

    expect(output).not.toBe(undefined);
}, 300000);

test('Deve ser possivel criar um novo usuário (borat)', async () => {
    const input = {
        name: 'borat',
        password: '123456dwdsd7',
    };

    const response = await axios.post('http://localhost:3000/newUser', input);
    const output = response.data;

    expect(output).toBe(`User ${input.name} created`);
}, 300000);

// test.skip('ContractName inválido', async () => {
//     const contractInput: Config = {
//         contractName: 'CustomErc721',
//         contractParams: {
//             tokenName: 'CriptoToken',
//             tokenSymbol: 'CT',
//             supply: 100000,
//         },
//         userName: 'fernando',
//     };
//     const blockchainInput: Blockchain = {
//         provider: 'polygon',
//     };

//     const input = {
//         blockchain: blockchainInput,
//         contract: contractInput,
//     };

//     const response = await axios.post('http://localhost:3000/deploy', input);
//     const output = response.data;
//     expect(output).toBe('contract invalid');
// }, 300000);

// test.skip('Parametros do contract inválidos', async () => {
//     const contractInput: Config = {
//         contractName: 'CustomErc721',
//         contractParams: {
//             tokenName: 'CriptoToken',
//             tokenSymbol: 'CT',
//             supply: 100000,
//         },
//         userName: 'fernando',
//     };
//     const blockchainInput: Blockchain = {
//         provider: 'polygon',
//     };

//     const input = {
//         blockchain: blockchainInput,
//         contract: contractInput,
//     };

//     const response = await axios.post('http://localhost:3000/deploy', input);
//     const output = response.data;
//     expect(output).toBe('contractParams invalid');
// }, 300000);

// test.skip('Wallet inválida', async () => {
//     const contractInput: Config = {
//         contractName: 'CustomErc721',
//         contractParams: {
//             tokenName: 'CriptoToken',
//             tokenSymbol: 'CT',
//             supply: 100000,
//         },
//         userName: 'fernando',
//     };
//     const blockchainInput: Blockchain = {
//         provider: 'polygon',
//     };

//     const input = {
//         blockchain: blockchainInput,
//         contract: contractInput,
//     };

//     const response = await axios.post('http://localhost:3000/deploy', input);
//     const output = response.data;
//     expect(output).toBe('wallet invalid');
// }, 300000);

// test.skip('User inválido', async () => {
//     const contractInput: Config = {
//         contractName: 'CustomErc721',
//         contractParams: {
//             tokenName: 'CriptoToken',
//             tokenSymbol: 'CT',
//             supply: 100000,
//         },
//         userName: 'fernando',
//     };
//     const blockchainInput: Blockchain = {
//         provider: 'polygon',
//     };

//     const input = {
//         blockchain: blockchainInput,
//         contract: contractInput,
//     };

//     const response = await axios.post('http://localhost:3000/deploy', input);
//     const output = response.data;

//     expect(output).toBe('user invalid');
// }, 300000);

// // test.skipes do contractType
// test.skip('Deve ser possivel criar um novo tipo de contrato', async () => {
//     const jsonLocation = `${path.resolve()}/newContractType.json`;
//     const contractJsonData = fs.readFileSync(jsonLocation, {
//         encoding: 'utf-8',
//     });
//     const solidityLocation = `${path.resolve()}/newContractType.sol`;
//     const contractSolidityData = fs.readFileSync(solidityLocation, {
//         encoding: 'utf-8',
//     });

//     const input = {
//         name: 'Contract1',
//         contractJson: contractJsonData,
//         contractSolidity: contractSolidityData,
//     };

//     const response = await axios.post(
//         'http://localhost:3000/newContractType',
//         input
//     );
//     const output = response.data;

//     expect(output).toBe(`ContractType ${input.name} created`);
// }, 300000);

// test.skip('Deve ser possivel excluir um tipo de contrato', async () => {
//     const input = {
//         name: 'Contract1',
//     };

//     const response = await axios.post(
//         'http://localhost:3000/deleteContractType',
//         input
//     );
//     const output = response.data;

//     expect(output).toBe(`ContractType ${input.name} deleted`);
// }, 300000);

// // test.skipes da blockchainConnection
// test.skip('Deve ser possivel criar uma nova BlockchainConnection', async () => {
//     const input = {
//         name: 'mumbai',
//         url: 'test.skipe1',
//     };

//     const response = await axios.post(
//         'http://localhost:3000/newBlockchainConnection',
//         input
//     );
//     const output = response.data;

//     expect(output).toBe(`BlockchainConnection ${input.name} created`);
// }, 300000);

// test.skip('Deve ser possivel excluir uma BlockchainConnection', async () => {
//     const input = { name: 'mumbai' };

//     const response = await axios.post(
//         'http://localhost:3000/deleteBlockchainConnection',
//         input
//     );
//     const output = response.data;

//     expect(output).toBe(`BlockchainConnection ${input.name} deleted`);
// }, 300000);

// // test.skipes do usuario
// test.skip('Deve ser possivel criar um novo usuário (borat)', async () => {
//     const input = {
//         name: 'borat',
//         password: '1234567',
//     };

//     const response = await axios.post('http://localhost:3000/newUser', input);
//     const output = response.data;

//     expect(output).toBe(`User ${input.name} created`);
// }, 300000);

// test.skip('Deve ser possivel excluir um usuário (borat)', async () => {
//     const input = {
//         name: 'fernando',
//     };

//     const response = await axios.post(
//         'http://localhost:3000/deleteUser',
//         input
//     );
//     const output = response.data;

//     expect(output).toBe(`User ${input.name} deleted`);
// }, 300000);

// test.skip('Deve ser possivel ver os contracts de um usuário', async () => {
//     const input = {
//         name: 'alejandro',
//     };

//     const response = await axios.post('http://localhost:3000/getUser', input);
//     const output = response.data;

//     expect(output).not.toBe(undefined);
// }, 300000);
