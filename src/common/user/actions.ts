import { IUserData, IBoardLink } from './reducer'

export const INIT_SET_USER = 'USER/INIT_SET'
export const initSetUser = (email: string, password: string) => ({
  type: INIT_SET_USER,
  payload: {
    email,
    password
  }
})

export const SET_USER = 'USER/SET'
export const setUser = (userData: IUserData) => ({
  type: SET_USER,
  payload: userData
})

export const UPDATE_USER_BOARDS = 'USER/UPDATE_BOARDS'
export const updateUserBoards = (boards: IBoardLink[]) => ({
  type: UPDATE_USER_BOARDS,
  payload: boards
})
