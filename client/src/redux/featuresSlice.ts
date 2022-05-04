/* eslint-disable import/no-unresolved */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { createSlice, SerializedError } from '@reduxjs/toolkit';

// eslint-disable-next-line import/no-extraneous-dependencies
import { BboxQuery, ConvertedGeoJsonWithBBbox } from '@Jeff/shared';
import axios from 'axios';
import { AppDispatch } from './store';
import { clearOneFeatureData } from './oneFeatureSlice';

export const fetchFeatures = (url: string) => {
    return async (dispatch: AppDispatch) => {
        dispatch(fetchFeaturesPending());
        try {
            const { data }: { data: ConvertedGeoJsonWithBBbox } = await axios.get(url);

            dispatch(fetchFeaturesSuccess(data as ConvertedGeoJsonWithBBbox)); // action for the reducer dispatched here to fulfilled
        } catch (err) {
            dispatch(fetchFeaturesFailure(err)); // action for the reducer dispatched here to rejected
        }
    };
};

export const clearState = () => {
    return async (dispatch: AppDispatch) => {
        dispatch(clearAllFeaturesData());
        dispatch(clearOneFeatureData());
    };
};

type InitialState = {
    featureStore: ConvertedGeoJsonWithBBbox;
    loadingStatus: 'idle' | 'loading';
    loadedCount?: number;
    featuresDataError: string | null | SerializedError;
};

const initialState = {
    featureStore: {
        reqBbox: {} as BboxQuery,
        respData: {
            type: '',
            features: [],
        },
    },

    loadingStatus: 'idle',
    featuresDataError: null,
} as InitialState;

const allFeatures = createSlice({
    name: 'allFeatures',
    initialState,
    reducers: {
        fetchFeaturesPending: (state) => {
            state.loadingStatus = 'loading';
            state.featuresDataError = null;
        },

        // immer library in Redux toolkit makes it easier to update the state in redux toolkit as if it was a normal object
        fetchFeaturesSuccess: (state, action) => {
            state.featureStore = {
                reqBbox: {} as BboxQuery,
                respData: {
                    type: '',
                    features: [],
                },
            };
            state.featureStore = action.payload;
            state.loadingStatus = 'idle';
        },
        fetchFeaturesFailure: (state, action) => {
            if (action.payload) state.featuresDataError = action.payload;
            state.loadingStatus = 'idle';
            state.featureStore = {
                reqBbox: {} as BboxQuery,
                respData: {
                    type: '',
                    features: [],
                },
            };
        },

        clearAllFeaturesData: (state) => {
            state.featureStore = {
                reqBbox: {} as BboxQuery,
                respData: {
                    type: '',
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
