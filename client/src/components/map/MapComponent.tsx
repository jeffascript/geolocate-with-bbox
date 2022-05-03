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

type Props = {};

const MapComponent = (props: Props) => {
  const center: [number, number] = [51.505, -0.09];
  const zoom = 13;

  return (
    <>
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={true}
        // ref={setMap as any}
        style={{
          height: "100%",
          width: "100vw",
          overflow: "hidden",
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* <GeoJSONData />
        <SetBoundsRectangles /> */}
      </MapContainer>
    </>
  );
};

export default MapComponent;
