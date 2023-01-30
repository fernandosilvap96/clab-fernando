import { IUserData } from '../data/userData';

export class User {
    constructor(readonly userData: IUserData) {}

    async create(name: string, password: string): Promise<any> {
        await this.userData.createUser(name, password);

        return `User ${name} created`;
    }

    async delete(name: string): Promise<any> {
        await this.userData.deleteUser(name);

        return `User ${name} deleted`;
    }

    async getUser(name: string): Promise<any> {
        const user = await this.userData.getUser(name);

        return user;
    }
}
