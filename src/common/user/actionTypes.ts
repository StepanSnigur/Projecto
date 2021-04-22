import {
  INIT_SET_USER,
  SET_USER
} from './actions'
import { IUserData, IBoardLink } from './reducer'

export interface IInitSetUser {
  type: typeof INIT_SET_USER,
  payload: {
    email: string,
    password: string
  }
}
export interface ISetUser {
  type: typeof SET_USER,
  payload: IUserData
}
