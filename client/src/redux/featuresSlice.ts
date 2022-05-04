import { createSlice, SerializedError } from "@reduxjs/toolkit";

import { AppDispatch, RootState } from "./store";

import {
  BboxQuery,
  ConvertedGeoJsonResponse,
  ConvertedFeature,
  ConvertedGeoJson,
  ConvertedGeoJsonWithBBbox,
} from "@Jeff/shared";
import axios from "axios";
import { clearOneFeatureData } from "./oneFeatureSlice";

export const fetchFeatures = (url: string) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(fetchFeaturesPending());
    try {
      const { data }: { data: ConvertedGeoJsonWithBBbox } = await axios.get(url);

      dispatch(fetchFeaturesSuccess(data as ConvertedGeoJsonWithBBbox)); // action for the reducer dispatched here to fulfilled
    } catch (err) {
      console.log(err);

      dispatch(fetchFeaturesFailure(err)); // action for the reducer dispatched here to rejected
    }
  };
};

export const clearState = () => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(clearAllFeaturesData());
    dispatch(clearOneFeatureData());
  };
};

type InitialState = {
  featureStore: ConvertedGeoJsonWithBBbox;
  loadingStatus: "idle" | "loading";
  loadedCount?: number;
  featuresDataError: string | null | SerializedError;
};

const initialState = {
  featureStore: {
    reqBbox: {} as BboxQuery,
    respData: {
      type: "",
      features: [],
    },
  },

  loadingStatus: "idle",
  featuresDataError: null,
} as InitialState;

const allFeatures = createSlice({
  name: "allFeatures",
  initialState,
  reducers: {
    fetchFeaturesPending: (state) => {
      state.loadingStatus = "loading";
      state.featuresDataError = null;
    },

    //immer library in Redux toolkit makes it easier to update the state in redux toolkit as if it was a normal object
    fetchFeaturesSuccess: (state, action) => {
      state.featureStore = {
        reqBbox: {} as BboxQuery,
        respData: {
          type: "",
          features: [],
        },
      };
      state.featureStore = action.payload;
      state.loadingStatus = "idle";
    },
    fetchFeaturesFailure: (state, action) => {
      if (action.payload) state.featuresDataError = action.payload;
      state.loadingStatus = "idle";
      state.featureStore = {
        reqBbox: {} as BboxQuery,
        respData: {
          type: "",
          features: [],
        },
      };
    },

    clearAllFeaturesData: (state) => {
      state.featureStore = {
        reqBbox: {} as BboxQuery,
        respData: {
          type: "",
          features: [],
        },
      };
    },
  },
});

export const {
  fetchFeaturesPending,
  fetchFeaturesFailure,
  fetchFeaturesSuccess,
  // fetchUsersPostsSuccess,
  clearAllFeaturesData,
} = allFeatures.actions;

export default allFeatures.reducer;
