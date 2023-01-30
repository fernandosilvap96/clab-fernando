import express from 'express';

import { IHttpServer } from './serverInterface';

export class ExpressHttpServer implements IHttpServer {
    app: any;

    constructor() {
        this.app = express();
        this.app.use(express.json());
    }

    on(method: string, url: string, callback: any): void {
        this.app[method](url, async (req: any, res: any) => {
            try {
                const output = await callback(req.params, req.body);
                res.json(output);
            } catch (error: any) {
                res.status(422).json({
                    message: error.message,
                });
            }
        });
    }

    listen(port: number): void {
        return this.app.listen(port);
    }
}
