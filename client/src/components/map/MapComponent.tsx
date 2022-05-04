import React from "react";
import { useCallback, useEffect, useState, useMemo, useRef } from "react";
import {
  Circle,
  MapContainer,
  Marker,
  Polygon,
  Popup,
  TileLayer,
  GeoJSON,
  useMap,
  Rectangle,
} from "react-leaflet";
import * as L from "leaflet";
import { GeoJsonObject } from "geojson";
import useSWR from "swr";
import { GeoJsonData } from "./GeoJsonData";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { BoundsRectangle } from "./BoundsRectangle";

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
          height: "100vh",
          width: "100vw",
          overflow: "hidden",
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {!!data?.respData?.features?.length ? (
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
