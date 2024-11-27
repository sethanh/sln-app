import { all, takeLatest } from 'redux-saga/effects'
import { clearAccount, setAccount, getCurrentAccount } from '@my-monorepo/payflash/Root';
import {onClearAccount, onSetAccount, onGetCurrentAccount} from './account.action'

function* watchClearAccount() {
    yield takeLatest( clearAccount.type, onClearAccount);
  }
  
function* watchSetAccount() {
    yield takeLatest( setAccount.type, onSetAccount)
}

function* watchGetCurrentAccount() {
    yield takeLatest( getCurrentAccount.type, onGetCurrentAccount)
}

export function* accountSaga() {
    yield all([
       watchSetAccount,
       watchClearAccount,
       watchGetCurrentAccount
    ])
}