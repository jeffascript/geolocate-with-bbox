import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { useSelector } from 'react-redux';
import { GeoJsonData } from './GeoJsonData';
import { RootState } from '../../redux/store';
import { BoundsRectangle } from './BoundsRectangle';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';

// initial zoom level and Center
const zoom = 5;
const mapCenter = { lat: 52.51122, lng: 13.28771 };

const MapComponent = () => {
    const { featureStore: data } = useSelector((state: RootState) => state.allFeatures);

    return (
        <div>
            <MapContainer
                center={mapCenter}
                zoom={zoom}
                scrollWheelZoom={true}
                style={{
                    height: '100vh',
                    width: '100vw',
                    overflow: 'hidden',
                }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {data?.respData?.features?.length ? (
                    <>
                        <GeoJsonData />
                        <BoundsRectangle />
                    </>
                ) : null}
            </MapContainer>
        </div>
    );
};

export default MapComponent;
