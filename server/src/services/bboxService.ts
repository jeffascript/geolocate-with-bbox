// eslint-disable-next-line import/no-extraneous-dependencies
import { BboxQuery, ConvertedGeoJsonResponse } from '@jeff/shared';

import FetchRequest from '../utils/axios-fetch';

class BboxService {
    public async find(params: BboxQuery): Promise<ConvertedGeoJsonResponse> {
        return FetchRequest.searchWithBbox(params);
    }
}

export default new BboxService();
