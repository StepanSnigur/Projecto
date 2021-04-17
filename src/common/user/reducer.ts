import { ISetUser, IUpdateUserBoards } from './actionTypes'
import {
  SET_USER,
  UPDATE_USER_BOARDS
} from './actions'

export interface IBoardLink {
  id: string,
  isAdmin: boolean
}
export interface IUserData {
  email: string,
  nickName: string,
  registeredInBoards: IBoardLink[],
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
type userReducerActionType = ISetUser | IUpdateUserBoards

const userReducer = (state = initialState, action: userReducerActionType): IUserData => {
  switch(action.type) {
    case SET_USER:
      return {
        ...state,
        ...action.payload
      }
    case UPDATE_USER_BOARDS:
      return {
        ...state,
        registeredInBoards: action.payload
      }
    default:
      return state
  }
}

export default userReducer
