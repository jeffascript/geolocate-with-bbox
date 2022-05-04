/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-extraneous-dependencies */
import { AnyAction, configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import featuresReducer from './featuresSlice';
import oneFeatureReducer from './oneFeatureSlice';

const store = configureStore({
    reducer: {
        allFeatures: featuresReducer,
        oneFeature: oneFeatureReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
export default store;

export const featureStore = (state: RootState) => state.allFeatures;

export type AppDispatch = typeof store.dispatch;
// export type ReduxState = ReturnType<typeof rootReducer>;
export type TypedDispatch = ThunkDispatch<RootState, any, AnyAction>;
export type TypedThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>;

// reason for going for typed Dispatch PR: https://github.com/reduxjs/redux-toolkit/pull/329
export const useTypedDispatch = () => useDispatch<TypedDispatch>();
