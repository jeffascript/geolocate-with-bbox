// eslint-disable-next-line import/no-extraneous-dependencies
import { BboxQuery, LatLongQuery } from '@jeff/shared';
import { NextFunction, Request, Response } from 'express';
import BboxService from '../services/bboxService';
import LatLongService from '../services/latLongService';

class MapController {
    public async findByBbox(req: Request, res: Response, next: NextFunction) {
        try {
            const bboxResponse = await BboxService.find(req.query as unknown as BboxQuery);
            return res.status(200).json(bboxResponse);
        } catch (error) {
            next(error);
        }
    }

    public async findByLatLong(req: Request, res: Response, next: NextFunction) {
        try {
            const car = await LatLongService.find(req.query as unknown as LatLongQuery);
            return res.status(200).json(car);
        } catch (error) {
            next(error);
        }
    }
}

export default new MapController();
