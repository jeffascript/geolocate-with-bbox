import { useContext } from "react";
import { createCtx } from "./contextStore";

export enum GeoDisplayMode {
  Geobox = "Geobox",
  LatLongBox = "LatLongBox",
}

const [ctx, Provider] = createCtx<string>(GeoDisplayMode.Geobox);

export const GeoModeSelectContext = ctx;
export const GeoModeSelectProvider = Provider;

export const useGeoModeFromCtx = () => {
  const { geoMode } = useContext(GeoModeSelectContext);
  return geoMode;
};

export const useSetGeoModeInCtx = () => {
  const { updateGeoMode } = useContext(GeoModeSelectContext);
  return updateGeoMode;
};
