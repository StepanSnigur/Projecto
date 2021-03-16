import { put, takeEvery, delay } from 'redux-saga/effects'
import { FIRE_SET_ERROR, setErrorCreator } from './actions'
import { fireSetErrorActionType } from './actionTypes'

export function* watchSetError() {
  yield takeEvery(FIRE_SET_ERROR, setError)
}
function* setError(action: fireSetErrorActionType) {
  yield put(setErrorCreator(action.payload))
  yield delay(3000)
  yield put(setErrorCreator(''))
}
