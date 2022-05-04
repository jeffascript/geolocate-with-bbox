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

type GeoProps = {};
export const GeoJsonData = ({}: GeoProps) => {
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
    [latMax, latMin, lonMax, lonMin]
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

  const handleEachTile = () => {
    console.log("clicked");
  };

  function onEachFeature(feature: any, layer: L.Layer) {
    if (feature.properties) {
      const { properties } = feature;
      layer.bindPopup(properties);
      layer.bindTooltip(properties.id);
      layer.on("click", handleEachTile);
      layer.addTo(map);
    }
  }

  if (error) return <p>"An error has occurred."</p>;
  if (loadingStatus === "loading") return <p> "Loading..."</p>;

  return <GeoJSON data={data.respData as unknown as GeoJsonObject} onEachFeature={onEachFeature} />;
};
