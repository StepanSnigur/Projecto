import { takeEvery, put } from 'redux-saga/effects'
import { IInitTaskInfoOpen } from './actionTypes'

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
    const { id, listId, title, description, completed } = action.payload

    yield put(setTaskInfoOpen({
      isOpen: true,
      title,
      description,
      id,
      listId,
      completed
    }))
  } catch (e) {
    yield put(fireSetError('Не удалось открыть описание'))
  } finally {
    yield put(setTaskInfoLoading(false))
    yield put(setSidebarSpinnerLoading(false))
  }
}
