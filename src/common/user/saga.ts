import { takeEvery, put, call } from 'redux-saga/effects'
import authApi from '../../api/authApi'
import { INIT_SET_USER, setUser } from './actions'
import { IInitSetUser } from './actionTypes'
import { setProgressBarLoading } from '../../features/ProgressBar/actions'
import { fireSetError } from '../../features/ErrorManager/actions'
import { IUserData, IBoardLink } from './reducer'
import history from '../../App/history'
import { translatedServerErrors } from '../constants'

export interface IUser {
  nickName: string,
  email: string,
  registeredInBoards: IBoardLink[],
  icon: string | null
}
export function* watchSetUser() {
  yield takeEvery(INIT_SET_USER, setUserSaga)
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
    history.push('/user')
  } catch (e) {
    yield put(fireSetError(translatedServerErrors[e.code] || 'Непредвиденная ошибка'))
  } finally {
    yield put(setProgressBarLoading(false))
  }
}
