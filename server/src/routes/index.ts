import express, { Request, Response, Application } from 'express';
import mapRouter from './mapRoute';
import errorMidleware from '../middlewares/errorMiddleware';

export class Routes {
    public routes(app: Application): void {
        app.use(express.json());
        app.use(mapRouter);

        app.route('/_status').get((_req: Request, res: Response) => {
            res.status(200).send({ msg: 'Working!' });
        });

        app.use(errorMidleware);
    }
}
