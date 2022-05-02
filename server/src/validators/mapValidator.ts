/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

class Validator {
    public async boundbox(req: Request, res: Response, next: NextFunction) {
        try {
            const schema = Joi.object({
                lonMin: Joi.number().required(),
                latMin: Joi.number().required(),
                lonMax: Joi.number().required(),
                latMax: Joi.number().required(),
            });
            const { error } = schema.validate(req.query, { abortEarly: true });
            if (error) throw error;
            return next();
        } catch (erro: any) {
            return res.status(400).json(
                erro.details.map((detail: Record<string, unknown>) => ({
                    message: detail.message,
                    path: detail.path,
                })),
            );
        }
    }

    public async latLong(req: Request, res: Response, next: NextFunction) {
        try {
            const schema = Joi.object({
                lat: Joi.number().required(),
                long: Joi.number().required(),
            });
            const { error } = schema.validate(req.query, { abortEarly: true });
            if (error) throw error;
            return next();
        } catch (erro: any) {
            return res.status(400).json(
                erro.details.map((detail: Record<string, unknown>) => ({
                    message: detail.message,
                    path: detail.path,
                })),
            );
        }
    }
}

export default new Validator();
