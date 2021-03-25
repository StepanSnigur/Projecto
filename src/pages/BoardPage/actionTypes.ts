import {
  INIT_SET_NEW_BOARD,
  SET_NEW_BOARD,
  SET_BOARD_PAGE_LOADING,
  SET_BOARD_PAGE_ERROR,
  INIT_ADD_NEW_BOARD_CARD,
  ADD_NEW_BOARD_CARD,
  SET_BOARD_CARD_LOADING
} from './actions'
import { IBoardPage, IBoardTask } from './reducer'

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
