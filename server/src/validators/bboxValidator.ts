import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const schema = Joi.object({
            lon_min: Joi.number().required(),
            lat_min: Joi.number().required(),
            lon_max: Joi.number().required(),
            lat_max: Joi.number().required(),
        });
        const { error } = await schema.validate(req.query, { abortEarly: true });
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
};
