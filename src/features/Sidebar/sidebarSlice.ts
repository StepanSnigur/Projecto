import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IBoardLink } from '../../common/user/userSlice'
import { ISetBoardLinksLoadingPayload, IUpdateSidebarLinkPayload } from './actionTypes'

export interface IExtendedBoardLink extends IBoardLink {
  name?: string,
  background?: string,
  isLoading: boolean
}
export interface ISidebarReducer {
  boards: IExtendedBoardLink[]
}

const sidebarSlice = createSlice({
  name: 'sidebarSlice',
  initialState: {
    boards: []
  } as ISidebarReducer,
  reducers: {
    setSidebarLinks(state, action: PayloadAction<IExtendedBoardLink[]>) {
      return {
        ...state,
        boards: action.payload
      }
    },
    setBoardLinkLoading(state, action: PayloadAction<ISetBoardLinksLoadingPayload>) {
      const newBoards = [...state.boards]
      newBoards[action.payload.idx] = {
        ...newBoards[action.payload.idx],
        isLoading: action.payload.isLoading
      }
      return {
        ...state,
        boards: newBoards
      }
    },
    addSidebarLink(state, action: PayloadAction<IExtendedBoardLink>) {
      return {
        ...state,
        boards: [...state.boards, action.payload]
      }
    },
    initUpdateSidebarLink(state, action) {},
    updateSidebarLink(state, action: PayloadAction<IUpdateSidebarLinkPayload>) {
      const updatedBoards = [...state.boards]
      updatedBoards[action.payload.idx] = {
        ...updatedBoards[action.payload.idx],
        ...action.payload.updates
      }
      return {
        ...state,
        boards: updatedBoards
      }
    }
  }
})

export const {
  setSidebarLinks,
  setBoardLinkLoading,
  addSidebarLink,
  initUpdateSidebarLink,
  updateSidebarLink
} = sidebarSlice.actions
export default sidebarSlice.reducer
