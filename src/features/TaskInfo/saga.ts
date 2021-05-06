import { takeEvery, call, put, select } from 'redux-saga/effects'
import { IInitTaskInfoOpen } from './actionTypes'
import { getUserId } from '../../common/user/selectors'
import { getBoardId } from '../../pages/BoardPage/selectors'
import boardApi from '../../api/boardApi'

import { initSetTaskInfoOpen, setTaskInfoOpen, setTaskInfoLoading } from './taskInfoSlice'
import { setSidebarSpinnerLoading } from '../SidebarSpinner/sidebarSpinnerSlice'
import { fireSetError } from '../ErrorManager/errorManagerSlice'

export function* watchOpenTaskInfo() {
  yield takeEvery(initSetTaskInfoOpen.type, openTaskInfoSaga)
}
function* openTaskInfoSaga(action: IInitTaskInfoOpen) {
  try {
    yield put(setTaskInfoLoading(true))
    yield put(setSidebarSpinnerLoading(true))
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
    yield put(fireSetError('Не удалось открыть описание'))
  } finally {
    yield put(setTaskInfoLoading(false))
    yield put(setSidebarSpinnerLoading(false))
  }
}
