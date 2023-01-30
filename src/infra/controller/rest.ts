import { Deploy } from '../../useCases/deploy';
import { Interact } from '../../useCases/interact';
import { NewUser } from '../../useCases/newUser';
import { IHttpServer } from '../http/serverInterface';

export class RestController {
    constructor(
        readonly httpServer: IHttpServer,
        readonly deploy: Deploy,
        readonly interact: Interact,
        readonly newUser: NewUser
    ) {
        httpServer.on('post', '/deploy', async (params: any, body: any) => {
            const { configInput, blockchainInput } = body;

            const output = await deploy.execute(configInput, blockchainInput);
            return output;
        });
        httpServer.on(
            'post',
            '/:contractAddress/:method',
            async (params: any, body: any) => {
                const { configInput } = body;
                const { method, contractAddress } = params;

                const output = await interact.execute(
                    configInput,
                    method,
                    contractAddress
                );
                return output;
            }
        );
        httpServer.on('post', '/newUser', async (params: any, body: any) => {
            const { name, password } = body;

            const output = await newUser.execute(name, password);
            return `User ${output.name} created`;
        });
    }
}
