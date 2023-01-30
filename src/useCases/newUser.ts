import { IUserData } from '../domain/data/userData';
import { User } from '../domain/entities/user';

export class NewUser {
    constructor(readonly userData: IUserData) {}

    async execute(name: string, password: string): Promise<any> {
        const user = new User(this.userData);
        await user.create(name, password);
        const userCreated = await user.getUser(name);

        console.log('userCreated', userCreated);

        return userCreated;
    }
}
