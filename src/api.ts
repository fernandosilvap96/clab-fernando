import { SolcCompiler } from './infra/compilers/solcCompiler';
import { RestController } from './infra/controller/rest';
import { BlockchainDataMemory } from './infra/database/memory/blockchainData.memory';
import { ContractDataMemory } from './infra/database/memory/contractData.memory';
import { UserDataMemory } from './infra/database/memory/userData.memory';
import { WalletDataMemory } from './infra/database/memory/walletData.memory';
import { ExpressHttpServer } from './infra/http/expressServer';
import { Deploy } from './useCases/deploy';
import { Interact } from './useCases/interact';
import { NewUser } from './useCases/newUser';

const httpServer = new ExpressHttpServer();

const walletData = new WalletDataMemory();
const contractData = new ContractDataMemory();
const blockchainData = new BlockchainDataMemory();
const userData = new UserDataMemory();
const compiler = new SolcCompiler();

const deploy = new Deploy(
    walletData,
    contractData,
    blockchainData,
    userData,
    compiler
);

const interact = new Interact(
    walletData,
    contractData,
    blockchainData,
    userData
);

const newUser = new NewUser(userData);

new RestController(httpServer, deploy, interact, newUser);
httpServer.listen(3000);
