import { takeEvery, call, put } from 'redux-saga/effects'
import { INIT_UPDATE_SIDEBAR_LINK, updateSidebarLink, setBoardLinkLoading } from './actions'
import { IInitUpdateSidebarLink } from './actionTypes'
import boardApi from '../../api/boardApi'
import { IBoardPage } from '../../pages/BoardPage/reducer'

export function* watchUpdateUserLink() {
  yield takeEvery(INIT_UPDATE_SIDEBAR_LINK, updateUserLinkSaga)
}
function* updateUserLinkSaga(action: IInitUpdateSidebarLink) {
  try {
    yield put(setBoardLinkLoading(action.payload.position, true))
    const board: IBoardPage = yield call(boardApi.getBoard, action.payload.id)
    const linkUpdates = {
      name: board.name,
      background: board.backgroundImage || '#fff'
    }
    yield put(updateSidebarLink(action.payload.position, linkUpdates))
  } catch (e) {
    console.log(e.message)
  } finally {
    yield put(setBoardLinkLoading(action.payload.position, false))
  }
}
