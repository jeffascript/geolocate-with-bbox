import osmtogeojson from 'osmtogeojson';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ConvertedGeoJson } from '@jeff/shared';

export function convertToGeoJson(datum: unknown): ConvertedGeoJson {
    console.log(datum);
    const data = osmtogeojson(datum);
    return data;
}
