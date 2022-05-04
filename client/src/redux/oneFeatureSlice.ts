import { createSlice, SerializedError } from "@reduxjs/toolkit";

import { AppDispatch, RootState } from "./store";

import {
  BboxQuery,
  ConvertedGeoJsonResponse,
  ConvertedFeature,
  ConvertedGeoJson,
  ConvertedGeoJsonWithBBbox,
} from "@Jeff/shared";

export const setOneFeatureToStore = (id: string) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(fetchOneFeaturePending());
    try {
      const rootState = getState();
      const found = rootState.allFeatures.featureStore.respData.features.some((el) => el.id === id);
      if (!found) {
        dispatch(fetchOneFeatureFailure("Not found"));
      }
      const oneFound = rootState.allFeatures.featureStore.respData.features.filter(
        (el) => el.id === id
      );
      dispatch(fetchOneFeatureSuccess(oneFound)); // action for the reducer dispatched here to fulfilled
    } catch (err) {
      console.log(err);

      dispatch(fetchOneFeatureFailure(err)); // action for the reducer dispatched here to rejected
    }
  };
};

export const clearState = () => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(clearOneFeatureData());
  };
};

type InitialState = {
  oneFeature: ConvertedFeature[];
  loadingStatus: "idle" | "loading";
  loadedCount?: number;
  oneFeatureDataError: string | null | SerializedError;
};

const initialState = {
  oneFeature: [],
  loadingStatus: "idle",
  oneFeatureDataError: null,
} as InitialState;

const oneFeature = createSlice({
  name: "oneFeature",
  initialState,
  reducers: {
    fetchOneFeaturePending: (state) => {
      state.loadingStatus = "loading";
      state.oneFeatureDataError = null;
    },

    //immer library in Redux toolkit makes it easier to update the state in redux toolkit as if it was a normal object
    fetchOneFeatureSuccess: (state, action) => {
      state.oneFeature = [];
      state.oneFeature = action.payload;
      state.loadingStatus = "idle";
    },

    fetchOneFeatureFailure: (state, action) => {
      if (action.payload) state.oneFeatureDataError = action.payload;
      state.loadingStatus = "idle";
      state.oneFeature = [];
    },

    clearOneFeatureData: (state) => {
      state.oneFeature = [];
    },
  },
});

export const {
  fetchOneFeaturePending,
  fetchOneFeatureFailure,
  fetchOneFeatureSuccess,
  clearOneFeatureData,
} = oneFeature.actions;

export default oneFeature.reducer;
