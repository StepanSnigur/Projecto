import { initSetUser } from './userSlice'

export interface IInitSetUser {
  type: typeof initSetUser.type,
  payload: {
    email: string,
    password: string
  }
}
