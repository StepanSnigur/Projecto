import { takeEvery, put, call } from 'redux-saga/effects'
import authApi from '../../api/authApi'
import { initSetUser, setUser } from './userSlice'
import { setSidebarLinks } from '../../features/Sidebar/sidebarSlice'
import { addLoadingField } from '../../features/Sidebar/utils'
import { IInitSetUser } from './actionTypes'
import { setProgressBarLoading } from '../../features/ProgressBar/progressBarSlice'
import { fireSetError } from '../../features/ErrorManager/errorManagerSlice'
import { IUserData, IBoardLink } from './userSlice'
import history from '../../App/history'

export interface IUser {
  nickName: string,
  email: string,
  registeredInBoards: IBoardLink[],
  icon: string | null
}
export function* watchSetUser() {
  yield takeEvery(initSetUser.type, setUserSaga)
}
export function* setUserSaga (action: IInitSetUser) {
  try {
    yield put(setProgressBarLoading(true))
    const { email, password } = action.payload

    const response: {
      token: string,
      user: IUserData
    } = yield call(authApi.getUser, email, password)
    const userData: IUserData = response.user
    const token = response.token

    yield put(setUser(userData))
    localStorage.setItem('token', token)
    const extendedUserLinks = addLoadingField(userData.registeredInBoards)
    yield put(setSidebarLinks(extendedUserLinks))
    history.push('/user')
  } catch (e) {
    yield put(fireSetError(e.message))
  } finally {
    yield put(setProgressBarLoading(false))
  }
}
