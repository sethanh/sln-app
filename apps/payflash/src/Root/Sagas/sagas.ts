// src/sagas.ts
import { all } from 'redux-saga/effects';
import { accountSaga } from '@my-monorepo/payflash/Root'


export default function* rootSaga() {
  yield all([accountSaga()]);
}
