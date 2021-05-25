import { takeEvery, call, put, select } from 'redux-saga/effects'
import { setBoardLinkLoading, initUpdateSidebarLink, updateSidebarLink } from './sidebarSlice'
import { IInitUpdateSidebarLink } from './actionTypes'
import boardApi from '../../api/boardApi'
import { IBoardPage } from '../../pages/BoardPage/boardPageSlice'
import { getToken } from '../../common/user/selectors'

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
    console.log(e.message)
  } finally {
    yield put(setBoardLinkLoading({
      idx: action.payload.position,
      isLoading: false
    }))
  }
}
