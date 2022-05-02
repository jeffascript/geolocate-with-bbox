import { BboxQuery } from "../index";
export function decreaseBounds({
  lonMin,
  latMin,
  lonMax,
  latMax,
  count,
}: BboxQuery & { count: number }) {
  const maximumBoundByDistance = 0.001 / count;
  const oneSide = maximumBoundByDistance / 2;
  const latChange = oneSide;
  const lonChange = oneSide * 3;
  const customBounds = {
    lonMin: lonMin - lonChange,
    latMin: latMin - latChange,
    lonMax: lonMax + lonChange,
    latMax: latMax + latChange,
  };

  return customBounds;
}
