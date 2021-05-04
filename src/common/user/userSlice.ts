import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface IBoardLink {
  id: string,
  isAdmin: boolean,
  isPinned: boolean
}
export interface IUserData {
  email: string,
  nickName: string,
  registeredInBoards: IBoardLink[],
  id: string,
  icon: string | null,
}

const userSlice = createSlice({
  name: 'userSlice',
  initialState: {
    email: '',
    nickName: '',
    registeredInBoards: [],
    id: '',
    icon: null
  } as IUserData,
  reducers: {
    initSetUser(state, action) {},
    setUser(state, action: PayloadAction<IUserData>) {
      return {
        ...state,
        ...action.payload
      }
    }
  }
})

export const {
  initSetUser,
  setUser
} = userSlice.actions
export default userSlice.reducer
