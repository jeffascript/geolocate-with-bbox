export type BboxQuery = {
  lonMin: number;
  latMin: number;
  lonMax: number;
  latMax: number;
};

export type ConvertedFeature =
  | {
      [key: string]: number | string | boolean;
    }
  | Record<string, any>;

export type ConvertedGeoJson = {
  type: string;
  features: ConvertedFeature[];
};

export type ConvertedGeoJsonWithBBbox = {
  reqBbox: BboxQuery;
  respData: ConvertedGeoJson;
};

export type ConvertedGeoJsonError = {
  error: number;
  message: any;
};

export type ConvertedGeoJsonResponse =
  | ConvertedGeoJsonWithBBbox
  | ConvertedGeoJsonError;
