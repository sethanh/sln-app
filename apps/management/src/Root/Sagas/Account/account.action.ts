import { put, takeLatest,select } from 'redux-saga/effects'
import { setAccount, clearAccount} from '@my-monorepo/management/Root'
import { PayloadAction } from '@reduxjs/toolkit'

function* onSetAccount({payload}:PayloadAction<string | null>){
  console.log(payload);
  yield put(setAccount(payload))
}


function* onClearAccount({}:PayloadAction<any>){
  console.log('clear');
  yield put(clearAccount())
}

export function* watchClearAccount() {
  console.log('wclear');
  yield takeLatest( setAccount.type, onClearAccount);
}

export function* watchSetAccount() {
  console.log('wset');
  yield takeLatest( setAccount.type, onSetAccount)
}

