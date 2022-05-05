import { assert } from 'chai';

import sinon from 'sinon';
// eslint-disable-next-line import/no-unresolved
// eslint-disable-next-line import/no-extraneous-dependencies
import { LatLongQuery, BboxQuery } from '@jeff/shared';
import { getBoundsWithLatLng } from '../utils/getBoundsWithLatLong';

import FetchRequest from '../utils/axios-fetch';

const lonMin = 13.3410422;
const latMin = 52.5296017;
const lonMax = 13.3425422;
const latMax = 52.5301017;
const lat = 52.5301017;
const long = 13.3425422;

const bboxQuery: BboxQuery = { lonMin, latMin, lonMax, latMax };
const latLongQuery: LatLongQuery = { lat, long };

const errMsg = { error: 404, message: new Error('Too many fetch from node ...over 5000 requests!') };

const result = {
    reqBbox: bboxQuery,
    respData: {
        type: 'FeatureCollection',
        features: [
            {
                type: 'Feature',
                id: 'way/35413750',
            },
        ],
    },
};
describe('Fetch data With Query', () => {
    let fetchBBoxStub: any = null;
    let fetchLatLongStub: any = null;

    beforeEach(() => {
        // Stubbing the fetch by BBOX query
        fetchBBoxStub = sinon.stub(FetchRequest, 'searchWithBbox');
        fetchBBoxStub
            .withArgs(bboxQuery)
            .returns(Promise.resolve(result))
            .withArgs(latLongQuery)
            .returns(Promise.reject(errMsg));

        // Stubbing the fetch by LatLong query
        fetchLatLongStub = sinon.stub(FetchRequest, 'searchWithLatLong');
        fetchLatLongStub.withArgs(latLongQuery).returns(Promise.resolve(result));
    });

    afterEach(() => {
        fetchBBoxStub.restore();
        fetchLatLongStub.restore();
    });

    it('Mock bbox based on longLat only', async () => {
        const query = { lat: 52.5301017, long: 13.3425422 };

        const formatted = getBoundsWithLatLng(query.lat, query.long);
        const resp = await FetchRequest.searchWithBbox(formatted);
        console.log(resp);
        assert.notEqual(resp, errMsg);
    });
});
