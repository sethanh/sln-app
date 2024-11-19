import { put } from 'redux-saga/effects'
import { setAccount, clearAccount} from '@my-monorepo/payflash/Root'
import { PayloadAction } from '@reduxjs/toolkit'

export function* onSetAccount({payload}:PayloadAction<string | null>){
  console.log(payload);
  yield put(setAccount(payload))
}


export function* onClearAccount({}:PayloadAction<any>){
  yield put(clearAccount())
}
