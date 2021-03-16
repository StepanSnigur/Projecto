import {
  SET_REGISTRATION_PAGE_LOADING,
  SET_REGISTRATION_INPUT_ERRORS
} from './actions'
import {
  addNewUserSagaCreator,
} from './actions'

export type addNewUserSagaCreatorType = ReturnType<typeof addNewUserSagaCreator>
export interface setRegistrationInputErrorsActionType {
  type: typeof SET_REGISTRATION_INPUT_ERRORS,
  payload: string[] | null
}
export interface setRegistrationPageLoadingActionType {
  type: typeof SET_REGISTRATION_PAGE_LOADING,
  payload: boolean
}
