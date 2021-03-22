import { IBoardPage } from './reducer'

export const INIT_SET_NEW_BOARD = 'BOARD_PAGE/INIT_SET_NEW_BOARD'
export const initSetNewBoard = (boardId: string) => ({
  type: INIT_SET_NEW_BOARD,
  payload: boardId
})

export const SET_NEW_BOARD = 'BOARD_PAGE/SET_NEW_BOARD'
export const setNewBoardAction = (board: IBoardPage) => ({
  type: SET_NEW_BOARD,
  payload: board
})

export const SET_BOARD_PAGE_LOADING = 'BOARD_PAGE/SET_LOADING'
export const setBoardPageLoading = (isLoading: boolean) => ({
  type: SET_BOARD_PAGE_LOADING,
  payload: isLoading
})

export const SET_BOARD_PAGE_ERROR = 'BOARD_PAGE/SET_ERROR'
export const setBoardPageError = (error: string | null) => ({
  type: SET_BOARD_PAGE_ERROR,
  payload: error
})
