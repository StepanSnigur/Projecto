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
import { translatedServerErrors } from '../constants'

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

    const userId: string = yield call(authApi.getUserId, email, password)
    if (!userId) throw new Error('Пользователь не найден')

    const user: IUser = yield call(authApi.getUser, userId)
    const userData: IUserData = {
      ...user,
      id: userId
    }

    yield put(setUser(userData))
    const extendedUserLinks = addLoadingField(userData.registeredInBoards)
    yield put(setSidebarLinks(extendedUserLinks))
    history.push('/user')
  } catch (e) {
    yield put(fireSetError(translatedServerErrors[e.code] || 'Непредвиденная ошибка'))
  } finally {
    yield put(setProgressBarLoading(false))
  }
}
