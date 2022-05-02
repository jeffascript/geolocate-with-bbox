import { Request, Response } from 'express';
// eslint-disable-next-line import/no-extraneous-dependencies
import { CustomError } from '@jeff/shared';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default (error: any, req: Request, res: Response): Response<any, Record<string, any>> => {
    if (error instanceof CustomError) {
        return res.status(error.statusCode).json({ message: error.message });
    }
    return res.status(500).json({ message: error.message });
};
