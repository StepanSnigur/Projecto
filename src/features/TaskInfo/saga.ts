import { takeEvery, call, put, select } from 'redux-saga/effects'
import {
  INIT_TASK_INFO_OPEN,
  setTaskInfoOpen,
  setTaskInfoLoading
} from './actions'
import { IInitTaskInfoOpen } from './actionTypes'
import { getUserId } from '../../common/user/selectors'
import { getBoardId } from '../../pages/BoardPage/selectors'
import boardApi from '../../api/boardApi'

export function* watchOpenTaskInfo() {
  yield takeEvery(INIT_TASK_INFO_OPEN, openTaskInfoSaga)
}
function* openTaskInfoSaga(action: IInitTaskInfoOpen) {
  try {
    yield put(setTaskInfoLoading(true))
    const { id, title } = action.payload

    const userId: string = yield select(getUserId)
    const boardId: string = yield select(getBoardId)
    const canEdit: boolean = yield call(boardApi.checkCanEdit, userId, boardId)
    yield put(setTaskInfoOpen(true, title, id, canEdit))
  } catch (e) {
    console.log(e.message)
  } finally {
    yield put(setTaskInfoLoading(false))
  }
}
