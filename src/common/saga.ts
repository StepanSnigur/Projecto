import { select } from 'redux-saga/effects'
import { getUserState } from './user/selectors'
import { IUserData } from './user/userSlice'

export function* checkIsLogged() {
  const user: IUserData = yield select(getUserState)
  if (!user._id) throw new Error('Вы не вошли в аккаунт')
}
