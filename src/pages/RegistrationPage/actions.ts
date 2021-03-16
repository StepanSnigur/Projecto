import { IUserData } from '../../common/user/reducer'

export const ADD_NEW_USER_HANDLER = 'ADD_NEW_USER_HANDLER'
export const ADD_NEW_USER = 'ADD_NEW_USER'
export const addNewUserSagaCreator = (email: string, password: string) => ({
  type: ADD_NEW_USER_HANDLER,
  payload: {
    email,
    password
  }
})
export const addNewUserActionCreator = (userData: IUserData) => ({
  type: ADD_NEW_USER,
  payload: userData
})

export const SET_REGISTRATION_INPUT_ERRORS = 'SET_REGISTRATION_INPUT_ERRORS'
export const setRegistrationInputErrors = (errors: string[] | null) => ({
  type: SET_REGISTRATION_INPUT_ERRORS,
  payload: errors
})

export const SET_REGISTRATION_PAGE_LOADING = 'REGISTRATION_PAGE/SET_LOADING'
export const setRegistrationPageLoading = (isLoading: boolean) => ({
  type: SET_REGISTRATION_PAGE_LOADING,
  payload: isLoading
})
