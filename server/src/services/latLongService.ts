// eslint-disable-next-line import/no-extraneous-dependencies
import { LatLongQuery, ConvertedGeoJsonResponse } from '@jeff/shared';

import FetchRequest from '../utils/axios-fetch';

class LatLongService {
    public async find(params: LatLongQuery): Promise<ConvertedGeoJsonResponse> {
        return FetchRequest.searchWithLatLong(params);
    }
}

export default new LatLongService();
