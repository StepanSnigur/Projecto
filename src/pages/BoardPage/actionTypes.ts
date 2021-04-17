import {
  INIT_CREATE_BOARD,
  INIT_SET_NEW_BOARD,
  SET_NEW_BOARD,
  SET_BOARD_PAGE_LOADING,
  SET_BOARD_PAGE_ERROR,
  INIT_ADD_NEW_BOARD_CARD,
  ADD_NEW_BOARD_CARD,
  SET_BOARD_CARD_LOADING,
  INIT_ADD_NEW_BOARD_LIST,
  ADD_NEW_BOARD_LIST,
  INIT_DELETE_BOARD_LIST,
  DELETE_BOARD_LIST,
  MOVE_BOARD_TASK,
  INIT_MOVE_BOARD_COLUMN,
  MOVE_BOARD_COLUMN
} from './actions'
import { IBoardList, IBoardPage, IBoardTask } from './reducer'
import { IDropResult } from './BoardPage'
import { ITableMember } from '../../features/AddNewTable/AddNewTable'

export interface IInitCreateBoardPage {
  type: typeof INIT_CREATE_BOARD,
  payload: {
    name: string,
    members: ITableMember[]
  }
}
export interface IInitSetNewBoard {
  type: typeof INIT_SET_NEW_BOARD,
  payload: string
}
export interface ISetNewBoard {
  type: typeof SET_NEW_BOARD,
  payload: IBoardPage
}
export interface ISetBoardPageLoading {
  type: typeof SET_BOARD_PAGE_LOADING,
  payload: boolean
}
export interface ISetBoardPageError {
  type: typeof SET_BOARD_PAGE_ERROR,
  payload: string | null
}
export interface IInitAddNewBoardCard {
  type: typeof INIT_ADD_NEW_BOARD_CARD,
  payload: {
    cardName: string,
    boardId: string,
    columnId: string
  }
}
export interface IAddNewBoardCard {
  type: typeof ADD_NEW_BOARD_CARD,
  payload: {
    columnId: string,
    newCard: IBoardTask
  }
}
export interface ISetBoardCardLoading {
  type: typeof SET_BOARD_CARD_LOADING,
  payload: boolean
}
export interface IInitAddNewBoardList {
  type: typeof INIT_ADD_NEW_BOARD_LIST,
  payload: {
    boardId: string,
    name: string
  }
}
export interface IAddNewBoardList {
  type: typeof ADD_NEW_BOARD_LIST,
  payload: IBoardList
}
export interface IInitDeleteBoardList {
  type: typeof INIT_DELETE_BOARD_LIST,
  payload: {
    boardId: string,
    listId: string
  }
}
export interface IDeleteBoardList {
  type: typeof DELETE_BOARD_LIST,
  payload: string
}

export interface IMoveBoardTask {
  type: typeof MOVE_BOARD_TASK,
  payload: {
    source: IDropResult,
    destination: IDropResult
  }
}
export interface IInitMoveBoardColumn {
  type: typeof INIT_MOVE_BOARD_COLUMN,
  payload: {
    source: IDropResult,
    destination: IDropResult
  }
}
export interface IMoveBoardColumn {
  type: typeof MOVE_BOARD_COLUMN,
  payload: {
    source: IDropResult,
    destination: IDropResult
  }
}
