import {
  SET_REGISTRATION_INPUT_ERRORS,
  SET_REGISTRATION_PAGE_LOADING
} from './actions'
import {
  setRegistrationInputErrorsActionType,
  setRegistrationPageLoadingActionType
} from './actionTypes'

type registrationPageActionTypes = setRegistrationInputErrorsActionType | setRegistrationPageLoadingActionType
export interface IRegistrationPage {
  isLoading: boolean,
  errors: string[] | null
}

const initialState: IRegistrationPage = {
  isLoading: false,
  errors: null
}

const registrationPageReducer = (
  state = initialState,
  action: registrationPageActionTypes
): IRegistrationPage => {
  switch(action.type) {
    case SET_REGISTRATION_PAGE_LOADING:
      return {
        ...state,
        isLoading: action.payload
      }
    case SET_REGISTRATION_INPUT_ERRORS:
      return {
        ...state,
        errors: action.payload
      }
    default:
      return state
  }
}

export default registrationPageReducer
