import express, { Request, Response } from 'express';
import Validator from '../validators/mapValidator';
// import CarController from '../controllers/CarController';
import MapController from '../controllers/mapController';

const router = express.Router();

// router.get('/api/v1/geo', findValidator, CarController.find);

router.get('/api/v1/map/status', (_req: Request, res: Response) => {
    res.status(200).send({ msg: 'Map Working!' });
});

router.get('/api/v1/map/bbox', Validator.boundbox, MapController.findByBbox);

router.get('/api/v1/map/latlong', Validator.latLong, MapController.findByLatLong);

export default router;
