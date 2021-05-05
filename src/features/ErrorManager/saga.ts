import { put, takeEvery, delay } from 'redux-saga/effects'
import { fireSetError, setError } from './errorManagerSlice'
import { fireSetErrorActionType } from './actionTypes'

export function* watchSetError() {
  yield takeEvery(fireSetError.type, setErrorSaga)
}
function* setErrorSaga(action: fireSetErrorActionType) {
  yield put(setError(action.payload))
  yield delay(3000)
  yield put(setError(''))
}
