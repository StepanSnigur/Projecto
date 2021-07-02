import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface IBoardLink {
  _id: string,
  boardId: string,
  role: string,
  isPinned: boolean
}
export interface IUserData {
  email: string,
  nickName: string,
  registeredInBoards: IBoardLink[],
  _id: string,
  icon: string | null,
}

const userSlice = createSlice({
  name: 'userSlice',
  initialState: {
    email: '',
    nickName: '',
    registeredInBoards: [],
    _id: '',
    icon: null
  } as IUserData,
  reducers: {
    initSetUser(state, action) {},
    setUser(state, action: PayloadAction<IUserData>) {
      return {
        ...state,
        ...action.payload
      }
    },
    addBoardLinkToCurrentUser(state, action: PayloadAction<IBoardLink>) {
      return {
        ...state,
        registeredInBoards: [...state.registeredInBoards, action.payload]
      }
    }
  }
})

export const {
  initSetUser,
  setUser,
  addBoardLinkToCurrentUser
} = userSlice.actions
export default userSlice.reducer
