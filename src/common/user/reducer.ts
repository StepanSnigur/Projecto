import { ISetUser } from './actionTypes'
import {
  SET_USER
} from './actions'

export interface IUserData {
  email: string,
  nickName: string,
  registeredInBoards: any[],
  id: string,
  icon: string | null,
}
const initialState: IUserData = {
  email: '',
  nickName: '',
  registeredInBoards: [],
  id: '',
  icon: null
}
type userReducerActionType = ISetUser

const userReducer = (state = initialState, action: userReducerActionType): IUserData => {
  switch(action.type) {
    case SET_USER:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}

export default userReducer
