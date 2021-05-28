import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IBoardLink } from '../../common/user/userSlice'
import {
  IDeleteBoardPayload,
  IPinBoardPayload,
  ISetBoardLinksLoadingPayload,
  IUpdateSidebarLinkPayload
} from './actionTypes'

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
    },
    changeSidebarLinkName(state, action: PayloadAction<{ id: string, name: string }>) {
      const newBoards = [...state.boards]
      const boardToChange = newBoards.findIndex(board => board.boardId === action.payload.id)
      newBoards[boardToChange] = {
        ...newBoards[boardToChange],
        name: action.payload.name
      }
      return {
        ...state,
        boards: newBoards
      }
    },
    initPinBoard(state, action) {},
    pinBoard(state, action: PayloadAction<IPinBoardPayload>) {
      const newBoards = [...state.boards]
      const idx = newBoards.findIndex(board => board.boardId === action.payload.boardId)
      newBoards[idx] = {
        ...newBoards[idx],
        isPinned: action.payload.isPinned
      }

      return {
        ...state,
        boards: newBoards
      }
    },
    initDeleteBoard(state, action) {},
    initDeleteBoardFromUser(state, action) {},
    deleteBoard(state, action: PayloadAction<IDeleteBoardPayload>) {
      return {
        ...state,
        boards: state.boards.filter(board => board.boardId !== action.payload.boardId)
      }
    }
  }
})

export const {
  setSidebarLinks,
  setBoardLinkLoading,
  addSidebarLink,
  initUpdateSidebarLink,
  updateSidebarLink,
  changeSidebarLinkName,
  initPinBoard,
  pinBoard,
  initDeleteBoard,
  initDeleteBoardFromUser,
  deleteBoard
} = sidebarSlice.actions
export default sidebarSlice.reducer
