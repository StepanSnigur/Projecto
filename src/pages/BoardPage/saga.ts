import { takeEvery, call, put } from 'redux-saga/effects'
import { v4 as uuidv4 } from 'uuid'
import { INIT_SET_NEW_BOARD, INIT_ADD_NEW_BOARD_CARD } from './actions'
import { IInitAddNewBoardCard, IInitSetNewBoard } from './actionTypes'
import boardApi from '../../api/boardApi'
import { IBoardPage } from './reducer'
import {
  setNewBoardAction,
  setBoardPageLoading,
  setBoardPageError,
  setBoardCardLoading,
  addNewBoardCardAction
} from './actions'
import { fireSetError } from '../../features/ErrorManager/actions'

export function* watchSetNewBoard() {
  yield takeEvery(INIT_SET_NEW_BOARD, setNewBoard)
}
export function* setNewBoard(action: IInitSetNewBoard) {
  try {
    yield put(setBoardPageError(null))
    yield put(setBoardPageLoading(true))
    const board: IBoardPage = yield call(boardApi.getBoard, action.payload)
    console.log(board)
    yield put(setNewBoardAction(board))
  } catch (err) {
    yield put(setBoardPageError(err.message))
  } finally {
    yield put(setBoardPageLoading(false))
  }
}

export function* watchAddNewBoardCard() {
  yield takeEvery(INIT_ADD_NEW_BOARD_CARD, addNewBoardCard)
}
export function* addNewBoardCard(action: IInitAddNewBoardCard) {
  try {
    if (!action.payload.columnId) throw new Error('Не удалось добавить задачу')
    yield put(setBoardCardLoading(true))
    const boardId = action.payload.boardId
    const newCard = {
      id: uuidv4(),
      name: action.payload.cardName,
      createdAt: new Date().toLocaleDateString()
    }
    yield call(boardApi.addNewCard, boardId, action.payload.columnId, newCard)
    yield put(addNewBoardCardAction(action.payload.columnId, newCard))
  } catch (e) {
    yield put(fireSetError(e.message || 'Непредвиденная ошибка'))
  } finally {
    yield put(setBoardCardLoading(false))
  }
}
