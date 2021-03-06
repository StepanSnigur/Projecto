import { takeEvery, put, call, select } from 'redux-saga/effects'
import {
  initAddNewUser,
  setRegistrationPageLoading,
  setRegistrationInputErrors
} from './registrationPageSlice'
import { setUser } from '../../common/user/userSlice'
import { fireSetError } from '../../features/ErrorManager/errorManagerSlice'
import authApi from '../../api/authApi'
import { IUserData } from '../../common/user/userSlice'
import { getRegistrationPageState } from './selectors'

import { isJson } from './utils'
import Validator from '../../common/utils/validator'
import {
  emailRegexp,
  minPasswordLength,
  maxPasswordLength,
  requiredPasswordCharacters
} from './constants'

const requiredPasswordCharactersString = requiredPasswordCharacters.reduce((acc, character, idx) => {
  return `${acc}${idx === 0 ? '' : ', '}${character.name}`
}, '')
const requiredPasswordCharactersRegexp = requiredPasswordCharacters.map(character => character.regexp)
const validateEmailAndPassword = (email: string, password: string) => {
  const emailErrors = new Validator(email)
      .mustMatchRegExp(emailRegexp, 'Невалидный email')
      .getErrors()
    const passwordErrors = new Validator(password)
      .minLength(minPasswordLength, `Пароль слишком короткий, минимум ${minPasswordLength} символов`)
      .maxLength(maxPasswordLength, `Пароль слишком длинный, максимум ${maxPasswordLength} символов`)
      .mustIncludeCharacters(requiredPasswordCharactersRegexp, `Пароль должен включать в себя символы: ${requiredPasswordCharactersString}`)
      .getErrors()

    return [emailErrors, passwordErrors]
}

export function* watchAddNewUser() {
  yield takeEvery(initAddNewUser.type, addNewUser)
}
function* addNewUser(action: ReturnType<typeof initAddNewUser>) {
  try {
    yield put(setRegistrationPageLoading(true))
    const fieldErrors: string[] | null = getRegistrationPageState(yield select()).errors
    const { email, password } = action.payload
    const [emailErrors, passwordErrors] = validateEmailAndPassword(email, password)
    if (emailErrors.length || passwordErrors.length) throw new Error(JSON.stringify([...emailErrors, ...passwordErrors]))
    else if (fieldErrors && fieldErrors.length) yield put(setRegistrationInputErrors(null))

    const userData: IUserData = yield call(authApi.registerNewUser, email, password)
    yield put(setUser(userData))
  } catch (err) {
    const errorMessage = err.message
    if (isJson(errorMessage)) {
      const errors = JSON.parse(errorMessage)
      yield put(setRegistrationInputErrors(errors))
    } else {
      yield put(fireSetError(errorMessage))
    }
  } finally {
    yield put(setRegistrationPageLoading(false))
  }
}
