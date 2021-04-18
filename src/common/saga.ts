import { select } from 'redux-saga/effects'
import { getUserState } from '../common/user/selectors'
import { IUserData } from '../common/user/reducer'

export function* checkIsLogged() {
  const user: IUserData = yield select(getUserState)
  if (!user.id) throw new Error('Вы не вошли в аккаунт')
}
