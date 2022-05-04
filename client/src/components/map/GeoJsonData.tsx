import { useEffect, useMemo } from 'react';
import { GeoJSON, useMap } from 'react-leaflet';
import * as L from 'leaflet';
import { GeoJsonObject } from 'geojson';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

export const GeoJsonData = () => {
    const map = useMap();
    const {
        featureStore: data,
        loadingStatus,
        featuresDataError: error,
    } = useSelector((state: RootState) => state.allFeatures);

    const { lonMax, latMax, lonMin, latMin } = data.reqBbox;

    const boundsData: L.LatLngBoundsExpression = useMemo(
        () => [
            [latMin, lonMin],
            [latMax, lonMax],
        ],
        [latMax, latMin, lonMax, lonMin],
    );

    useEffect(() => {
        map.flyToBounds(boundsData, {
            maxZoom: 15,
            animate: true,
            duration: 2,
            easeLinearity: 0.25,
            padding: [50, 50],
        });
    }, [boundsData, map]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function onEachFeature(feature: any, layer: L.Layer) {
        if (feature.properties) {
            const { properties } = feature;
            layer.bindPopup(properties);
            layer.bindTooltip(properties.id);
        }
    }

    if (error) return <p>"An error has occurred."</p>;
    if (loadingStatus === 'loading') return <p> "Loading..."</p>;

    return <GeoJSON data={data.respData as unknown as GeoJsonObject} onEachFeature={onEachFeature} />;
};
