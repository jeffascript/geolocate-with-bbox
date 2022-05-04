import axios, { AxiosResponse, AxiosError } from 'axios';

// eslint-disable-next-line import/no-extraneous-dependencies
import {
    BboxQuery,
    ConvertedGeoJson,
    ConvertedGeoJsonError,
    ConvertedGeoJsonResponse,
    LatLongQuery,
    ConvertedGeoJsonWithBBbox,
} from '@jeff/shared';
import NotFound from '../errors/notFound';
import { convertToGeoJson } from './convertOsmToGeojson';
import { getBoundsWithLatLng } from './getBoundsWithLatLong';

class FetchRequest {
    public async searchWithBbox({
        lonMin,
        latMin,
        lonMax,
        latMax,
    }: Required<BboxQuery>): Promise<ConvertedGeoJsonResponse> {
        const url = `${process.env.OSM_URL}${lonMin},${latMin},${lonMax},${latMax}`;

        const fetchJson = await axios
            .get(url)
            .then((response: AxiosResponse) => response.data)
            .then((data) => convertToGeoJson(data) as ConvertedGeoJson)
            .then((finalResp) => {
                const formatedResponse = {
                    reqBbox: { lonMin, latMin, lonMax, latMax },
                    respData: finalResp,
                };

                return formatedResponse as ConvertedGeoJsonWithBBbox;
            })
            .catch((error: AxiosError) => {
                if (error.response) {
                    throw new NotFound(error.response.data as ConvertedGeoJsonError['message']);
                }
            });

        return fetchJson as ConvertedGeoJsonResponse;
    }

    public async searchWithLatLong({ lat, long }: Required<LatLongQuery>) {
        const boundingBox = getBoundsWithLatLng(lat, long);

        return this.searchWithBbox(boundingBox);
    }
}

export default new FetchRequest();
