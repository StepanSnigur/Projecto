import { IBoardPage, IBoardTask, IBoardList } from './reducer'

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

export const INIT_ADD_NEW_BOARD_CARD = 'BOARD_PAGE/INIT_ADD_NEW_CARD'
export const initAddNewBoardCard = (cardName: string, columnId: string, boardId: string) => ({
  type: INIT_ADD_NEW_BOARD_CARD,
  payload: {
    cardName,
    columnId,
    boardId
  }
})
export const ADD_NEW_BOARD_CARD = 'BOARD_PAGE/ADD_NEW_CARD'
export const addNewBoardCardAction = (columnId: string, newCard: IBoardTask) => ({
  type: ADD_NEW_BOARD_CARD,
  payload: {
    columnId,
    newCard
  }
})
export const SET_BOARD_CARD_LOADING = 'BOARD_PAGE/SET_CARD_LOADING'
export const setBoardCardLoading = (isLoading: boolean) => ({
  type: SET_BOARD_CARD_LOADING,
  payload: isLoading
})

export const INIT_ADD_NEW_BOARD_LIST = 'BOARD_PAGE/INIT_ADD_NEW_LIST'
export const initAddNewBoardList = (listName: string, boardId: string) => ({
  type: INIT_ADD_NEW_BOARD_LIST,
  payload: {
    name: listName,
    boardId
  }
})
export const ADD_NEW_BOARD_LIST = 'BOARD_PAGE/ADD_NEW_LIST'
export const addNewBoardListAction = (newBoardList: IBoardList) => ({
  type: ADD_NEW_BOARD_LIST,
  payload: newBoardList
})
