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
import { ConvertedGeoJson } from "@jeff/shared";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const redColor = { color: "red" };

export function BoundsRectangle() {
  const {
    featureStore: data,
    loadingStatus,
    featuresDataError: error,
  } = useSelector((state: RootState) => state.allFeatures);
  const map = useMap();

  const { lonMax, latMax, lonMin, latMin } = data.reqBbox;

  const boundsData: L.LatLngBoundsExpression = useMemo(
    () => [
      [latMin, lonMin],
      [latMax, lonMax],
    ],

    [latMax, latMin, lonMax, lonMin]
  );
  const [bounds, setBounds] = useState(boundsData);

  const handler = useMemo(
    () => ({
      click() {
        setBounds(boundsData);
        map.fitBounds(boundsData);
      },
    }),
    [boundsData, map]
  );

  if (error) return <p>"An error has occurred."</p>;
  if (loadingStatus === "loading") return <p> "Loading..."</p>;

  return (
    <>
      <Rectangle bounds={boundsData} eventHandlers={handler} pathOptions={bounds && redColor} />
    </>
  );
}
