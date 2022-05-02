// eslint-disable-next-line import/no-extraneous-dependencies
import { BboxQuery } from '@jeff/shared';

function convertToNumber(str: unknown) {
    return typeof str === 'string' ? parseFloat(str) : str;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function getBoundsWithLatLng(lat: number, lng: number) {
    const maximumBoundByDistance = 0.001;
    const oneSide = maximumBoundByDistance / 2; // for both sides
    const latChange = oneSide; // for latitude each side
    const lonChange = oneSide * 3; // for longitude each side

    const lonMin = lng - lonChange;
    const latMin = lat - latChange;
    const lonMax = lng + lonChange;
    const latMax = lat + latChange;

    console.log(lonMin, latMin, lonMax, latMax);

    const bounds = {
        lonMin: convertToNumber(lonMin),
        latMin: convertToNumber(latMin),
        lonMax: convertToNumber(lonMax),
        latMax: convertToNumber(latMax),
    };
    return bounds as BboxQuery;
}
