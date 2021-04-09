import { takeEvery, call, put } from 'redux-saga/effects'
import { v4 as uuidv4 } from 'uuid'
import {
  INIT_SET_NEW_BOARD,
  INIT_ADD_NEW_BOARD_CARD,
  INIT_ADD_NEW_BOARD_LIST,
  INIT_DELETE_BOARD_LIST,
  INIT_MOVE_BOARD_COLUMN
} from './actions'
import {
  IInitAddNewBoardCard,
  IInitSetNewBoard,
  IInitAddNewBoardList,
  IInitDeleteBoardList,
  IInitMoveBoardColumn
} from './actionTypes'
import boardApi from '../../api/boardApi'
import { IBoardPage, IBoardList } from './reducer'
import {
  setNewBoardAction,
  setBoardPageLoading,
  setBoardPageError,
  setBoardCardLoading,
  addNewBoardCardAction,
  addNewBoardListAction,
  deleteBoardListAction,
  moveBoardColumn
} from './actions'
import { fireSetError } from '../../features/ErrorManager/actions'
import { setProgressBarLoading } from '../../features/ProgressBar/actions'

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

export function* watchAddNewBoardCard() {
  yield takeEvery(INIT_ADD_NEW_BOARD_CARD, addNewBoardCard)
}
export function* addNewBoardCard(action: IInitAddNewBoardCard) {
  try {
    if (!action.payload.columnId) throw new Error('Не удалось добавить задачу')
    yield put(setProgressBarLoading(true))
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
    yield put(setProgressBarLoading(false))
  }
}

export function* watchAddNewBoardList() {
  yield takeEvery(INIT_ADD_NEW_BOARD_LIST, addNewBoardList)
}
export function* addNewBoardList(action: IInitAddNewBoardList) {
  try {
    if (!action.payload) throw new Error('Список должен иметь корректное название')
    yield put(setProgressBarLoading(true))
    yield put(setBoardCardLoading(true))
    const newBoardList: IBoardList = {
      name: action.payload.name,
      id: uuidv4(),
      tasks: []
    }
    yield call(boardApi.addNewList, newBoardList, action.payload.boardId)
    yield put(addNewBoardListAction(newBoardList))
  } catch (e) {
    yield put(fireSetError(e.message || 'Непредвиденная ошибка'))
  } finally {
    yield put(setBoardCardLoading(false))
    yield put(setProgressBarLoading(false))
  }
}

export function* watchDeleteBoardList() {
  yield takeEvery(INIT_DELETE_BOARD_LIST, deleteBoardList)
}
export function* deleteBoardList(action: IInitDeleteBoardList) {
  try {
    if (!action.payload.listId) throw new Error('Ошибка при удалении списка')
    yield put(setProgressBarLoading(true))
    yield put(setBoardCardLoading(true))
    yield put(deleteBoardListAction(action.payload.listId))
  } catch (e) {
    yield put(fireSetError(e.message || 'Непредвиденная ошибка'))
  } finally {
    yield put(setBoardCardLoading(false))
    yield put(setProgressBarLoading(false))
  }
}

export function* watchMoveBoardColumn() {
  yield takeEvery(INIT_MOVE_BOARD_COLUMN, moveBoardColumnSaga)
}
export function* moveBoardColumnSaga(action: IInitMoveBoardColumn) {
  try {
    yield put(setProgressBarLoading(true))
    yield put(setBoardCardLoading(true))
    yield put(moveBoardColumn(action.payload.source, action.payload.destination))
  } catch (e) {
    yield put(fireSetError(e.message || 'Непредвиденная ошибка'))
  } finally {
    yield put(setBoardCardLoading(false))
    yield put(setProgressBarLoading(false))
  }
}
