import { takeEvery, call, put } from 'redux-saga/effects'
import { INIT_SET_NEW_BOARD } from './actions'
import { IInitSetNewBoard } from './actionTypes'
import boardApi from '../../api/boardApi'
import { IBoardPage } from './reducer'
import { setNewBoardAction, setBoardPageLoading, setBoardPageError } from './actions'

export function* watchSetNewBoard() {
  yield takeEvery(INIT_SET_NEW_BOARD, setNewBoard)
}
export function* setNewBoard(action: IInitSetNewBoard) {
  try {
    yield put(setBoardPageError(null))
    yield put(setBoardPageLoading(true))
    const board: IBoardPage = yield call(boardApi.getBoard, action.payload)
    yield put(setNewBoardAction(board))
  } catch (err) {
    yield put(setBoardPageError(err.message))
  } finally {
    yield put(setBoardPageLoading(false))
  }
}
