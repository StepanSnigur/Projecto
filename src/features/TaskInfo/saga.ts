import { takeEvery, call, put, select } from 'redux-saga/effects'
import { IInitTaskInfoOpen } from './actionTypes'
import { getUserId } from '../../common/user/selectors'
import { getBoardId } from '../../pages/BoardPage/selectors'
import boardApi from '../../api/boardApi'

import { initSetTaskInfoOpen, setTaskInfoOpen, setTaskInfoLoading } from './taskInfoSlice'

export function* watchOpenTaskInfo() {
  yield takeEvery(initSetTaskInfoOpen.type, openTaskInfoSaga)
}
function* openTaskInfoSaga(action: IInitTaskInfoOpen) {
  try {
    yield put(setTaskInfoLoading({
      isLoading: true
    }))
    const { id, listId, title, description } = action.payload

    const userId: string = yield select(getUserId)
    const boardId: string = yield select(getBoardId)
    const canEdit: boolean = yield call(boardApi.checkCanEdit, userId, boardId)
    yield put(setTaskInfoOpen({
      isOpen: true,
      title,
      description,
      id,
      listId,
      canEdit
    }))
  } catch (e) {
    console.log(e.message)
  } finally {
    yield put(setTaskInfoLoading({
      isLoading: false
    }))
  }
}
