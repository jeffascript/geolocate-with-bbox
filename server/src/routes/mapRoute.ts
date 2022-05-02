import express, { Request, Response, Application } from 'express';
import bboxValidator from '../validators/bboxValidator';
// import CarController from '../controllers/CarController';

const router = express.Router();

// router.get('/api/v1/geo', findValidator, CarController.find);

router.get('/api/v1/map/status', (_req: Request, res: Response) => {
    res.status(200).send({ msg: 'Map Working!' });
});

router.get('/api/v1/map/bbox', bboxValidator, (_req: Request, res: Response) => {
    res.status(200).send({ msg: 'Map Working!' });
});

export default router;
