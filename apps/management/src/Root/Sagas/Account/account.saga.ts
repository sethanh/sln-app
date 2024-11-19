import { all } from 'redux-saga/effects'
import { watchSetAccount, watchClearAccount } from './account.action'
export function* accountSaga() {
    yield all([
       watchSetAccount,
       watchClearAccount
    ])
}