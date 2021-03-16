import { SET_ERROR } from './actions'
import { setErrorActionType } from './actionTypes'

export interface IErrorManagerReducer {
  error: string
}

const initialState = {
  error: ''
}

const errorManagerReducer = (state = initialState, action: setErrorActionType): IErrorManagerReducer => {
  switch(action.type) {
    case SET_ERROR:
      return {
        ...state,
        error: action.payload
      }
    default:
      return state
  }
}

export default errorManagerReducer
