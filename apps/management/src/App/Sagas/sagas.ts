// src/sagas.ts
import { all, takeLatest, put } from 'redux-saga/effects';
import { setUser } from '../Reducers/Account/userSlice';
import { PayloadAction } from '@reduxjs/toolkit';

function* handleSetUser(action: PayloadAction<string | null>) {
  yield put(setUser(action.payload));
}

function* watchSetUser() {
  yield takeLatest('user/setUserAsync', handleSetUser);
}

export default function* rootSaga() {
  yield all([watchSetUser()]);
}
