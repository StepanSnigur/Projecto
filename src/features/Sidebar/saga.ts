import { takeEvery, call, put, select } from 'redux-saga/effects'
import { PayloadAction } from '@reduxjs/toolkit'
import {
  setBoardLinkLoading,
  initUpdateSidebarLink,
  updateSidebarLink,
  initPinBoard,
  pinBoard
} from './sidebarSlice'
import { IInitUpdateSidebarLink, IPinBoardPayload } from './actionTypes'
import boardApi from '../../api/boardApi'
import { IBoardPage } from '../../pages/BoardPage/boardPageSlice'
import { getToken, getUserId } from '../../common/user/selectors'
import { fireSetError } from '../ErrorManager/errorManagerSlice'
import { setProgressBarLoading } from '../ProgressBar/progressBarSlice'

export function* watchUpdateUserLink() {
  yield takeEvery(initUpdateSidebarLink.type, updateUserLinkSaga)
}
function* updateUserLinkSaga(action: IInitUpdateSidebarLink) {
  try {
    yield put(setBoardLinkLoading({
      idx: action.payload.position,
      isLoading: true
    }))
    const token: string = yield select(getToken)
    const board: IBoardPage = yield call(boardApi.getBoard, action.payload.id, token)
    const linkUpdates = {
      name: board.name,
      background: board.backgroundImage || '#fff'
    }
    yield put(updateSidebarLink({
      idx: action.payload.position,
      updates: linkUpdates
    }))
  } catch (e) {
    yield put(fireSetError('Непредвиденная ошибка'))
  } finally {
    yield put(setBoardLinkLoading({
      idx: action.payload.position,
      isLoading: false
    }))
  }
}

export function* watchPinBoard() {
  yield takeEvery(initPinBoard.type, pinBoardSaga)
}
function* pinBoardSaga(action: PayloadAction<IPinBoardPayload>) {
  try {
    yield put(setProgressBarLoading(true))
    const userId: string = yield select(getUserId)
    const token: string = yield select(getToken)
    const { boardId, isPinned } = action.payload
    yield call(boardApi.pinBoard, userId, boardId, isPinned, token)
    yield put(pinBoard(action.payload))
  } catch (e) {
    yield put(fireSetError('Не удалось закрепить доску'))
  } finally {
    yield put(setProgressBarLoading(false))
  }
}
