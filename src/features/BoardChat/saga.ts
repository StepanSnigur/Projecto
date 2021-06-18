import { takeEvery, put, select, call } from 'redux-saga/effects'
import { PayloadAction } from '@reduxjs/toolkit'
import boardApi from '../../api/boardApi'

import { fireSetError } from '../ErrorManager/errorManagerSlice'
import {
  IChatMessage,
  initSendMessage,
  initSetBoardChatOpen,
  sendMessage,
  setBoardChatData,
  setBoardChatLoading
} from './boardChatSlice'
import { getBoardId } from '../../pages/BoardPage/selectors'
import { setProgressBarLoading } from '../ProgressBar/progressBarSlice'
import { getToken, getUserState } from '../../common/user/selectors'
import { IUserData } from '../../common/user/userSlice'

export function* watchBoardChatOpen() {
  yield takeEvery(initSetBoardChatOpen.type, setBoardChatOpenSaga)
}
function* setBoardChatOpenSaga() {
  try {
    yield put(setBoardChatLoading(true))
    const boardId: string = yield select(getBoardId)
    const token: string = yield select(getToken)
    const chatMessages: IChatMessage[] = yield call(boardApi.getChatMessages, boardId, token)
    yield put(setBoardChatData(chatMessages))
  } catch (e) {
    yield put(fireSetError(e.message || 'Непредвиденная ошибка'))
  } finally {
    yield put(setBoardChatLoading(false))
  }
}

export function* watchSendMessage() {
  yield takeEvery(initSendMessage.type, sendMessageSaga)
}
function* sendMessageSaga(action: PayloadAction<string>) {
  try {
    yield put(setProgressBarLoading(true))
    const user: IUserData = yield select(getUserState)
    const boardId: string = yield select(getBoardId)
    const token: string = yield select(getToken)
    const messageData = {
      sender: user.email,
      sendedAt: new Date().toLocaleDateString(),
      content: action.payload
    }
    const message: IChatMessage = yield call(boardApi.sendChatMessage, boardId, messageData, token)
    yield put(sendMessage(message))
  } catch (e) {
    yield put(fireSetError(e.message || 'Непредвиденная ошибка'))
  } finally {
    yield put(setProgressBarLoading(false))
  }
}
