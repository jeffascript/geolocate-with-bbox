/* eslint-disable no-useless-escape */

/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';

// eslint-disable-next-line import/no-unresolved

import { LatLongQuery, BboxQuery } from '@jeff/shared';
import app from '../app';

const lonMin = 13.3410422;
const latMin = 52.5296017;
const lonMax = 13.3425422;
const latMax = 52.5301017;
const lat = 52.5301017;
const long = 13.3425422;

const bboxQuery: BboxQuery = { lonMin, latMin, lonMax, latMax };
const latLongQuery: LatLongQuery = { lat, long };

const bboxUrlBase = '/api/v1/map/bbox';
const longLatUrlBase = '/api/v1/map/latlong';

describe('GET results based on Query', () => {
    it('Given the route (GET)/api/v1/map/bbox, should be able to fetch data with appropriate reqs', async () => {
        const response = await request(app).get(bboxUrlBase).query(bboxQuery).type('json');
        expect(response.status).toBe(200);
        expect(response.body.respData.type).toBe('FeatureCollection');
        expect(response.body.respData.features[0].type).toBe('Feature');
        expect(response.body).toHaveProperty('reqBbox');
        expect(response.body).toHaveProperty('respData');
    });

    it('Given the route (GET)/api/v1/map/latLong, should be able to fetch data with appropriate reqs', async () => {
        const response = await request(app).get(longLatUrlBase).query(latLongQuery).type('json');
        expect(response.status).toBe(200);
        expect(response.body.respData.type).toBe('FeatureCollection');
        expect(response.body.respData.features[0].type).toBe('Feature');
        expect(response.body).toHaveProperty('reqBbox');
        expect(response.body).toHaveProperty('respData');
    });

    it('Given the route (GET)/api/v1/map, should not be able to fetch data with inappropriate reqs', async () => {
        const response = await request(app).get(bboxUrlBase).query(latLongQuery).type('json');
        expect(response.status).toBe(400);
        expect(response.body[0].message).toBe('"lonMin" is required');
    });

    it('Given the route (GET)/api/v1/latLong, should not be able to fetch data with inappropriate reqs', async () => {
        const response = await request(app).get(longLatUrlBase).query(bboxQuery).type('json');
        expect(response.status).toBe(400);
        expect(response.body[0].message).toBe('"lat" is required');
    });
});
