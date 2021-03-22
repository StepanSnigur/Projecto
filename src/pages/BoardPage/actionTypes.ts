import {
  INIT_SET_NEW_BOARD,
  SET_NEW_BOARD,
  SET_BOARD_PAGE_LOADING,
  SET_BOARD_PAGE_ERROR
} from './actions'
import { IBoardPage } from './reducer'

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
