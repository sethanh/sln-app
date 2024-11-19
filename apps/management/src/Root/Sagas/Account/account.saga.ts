import { all, takeLatest } from 'redux-saga/effects'
import { setAccount } from '@my-monorepo/management/Root';
import {onClearAccount, onSetAccount} from './account.action'

function* watchClearAccount() {
    yield takeLatest( setAccount.type, onClearAccount);
  }
  
function* watchSetAccount() {
    yield takeLatest( setAccount.type, onSetAccount)
}

export function* accountSaga() {
    yield all([
       watchSetAccount,
       watchClearAccount
    ])
}