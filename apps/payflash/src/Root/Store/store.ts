// src/store.ts
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../Sagas/sagas';
import {accountReducers, languageReducers} from '@my-monorepo/payflash/Root';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    ...languageReducers,
    ...accountReducers
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false, // Disable thunk if you only want to use saga
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
