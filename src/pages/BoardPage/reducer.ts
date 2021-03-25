import {
  SET_NEW_BOARD,
  SET_BOARD_PAGE_LOADING,
  SET_BOARD_PAGE_ERROR,
  SET_BOARD_CARD_LOADING,
  ADD_NEW_BOARD_CARD,
  ADD_NEW_BOARD_LIST
} from './actions'
import {
  ISetNewBoard,
  ISetBoardPageLoading,
  ISetBoardPageError,
  ISetBoardCardLoading,
  IAddNewBoardCard,
  IAddNewBoardList
} from './actionTypes'

export interface IBoardTask {
  name: string,
  createdAt: string,
  id: string
}
export interface IBoardList {
  name: string,
  id: string,
  tasks: IBoardTask[]
}
export interface IBoardAction {
  cardText: string,
  operatorId: string,
  producedAt: string
}
export interface IBoardPage {
  name: string,
  assignedUsers: string[],
  backgroundImage: string | null,
  lists: IBoardList[],
  actions: IBoardAction[]
}
interface IBoardPageState extends IBoardPage {
  isLoading: boolean,
  isCardLoading: boolean,
  error: string | null
}
type boardPageReducerActionType = ISetNewBoard | ISetBoardPageLoading | ISetBoardPageError |
  ISetBoardCardLoading | IAddNewBoardCard | IAddNewBoardList

const initialState: IBoardPageState = {
  isLoading: false,
  isCardLoading: false,
  error: null,
  name: '',
  backgroundImage: null,
  assignedUsers: [],
  lists: [],
  actions: []
}

const boardPageReducer = (state = initialState, action: boardPageReducerActionType): IBoardPageState => {
  switch(action.type) {
    case SET_BOARD_PAGE_LOADING:
      return {
        ...state,
        isLoading: action.payload
      }
    case SET_BOARD_PAGE_ERROR:
      return {
        ...state,
        error: action.payload
      }
    case SET_BOARD_CARD_LOADING:
      return {
        ...state,
        isCardLoading: action.payload
      }
    case ADD_NEW_BOARD_CARD:
      const updatedLists = [...state.lists]
      const listToUpdate = updatedLists.findIndex((list) => list.id === action.payload.columnId)
      updatedLists[listToUpdate] = {
        ...updatedLists[listToUpdate],
        tasks: [...updatedLists[listToUpdate].tasks, action.payload.newCard]
      }
      return {
        ...state,
        lists: updatedLists
      }
    case ADD_NEW_BOARD_LIST:
      return {
        ...state,
        lists: [
          ...state.lists,
          action.payload
        ]
      }
    case SET_NEW_BOARD:
      const {
        name,
        backgroundImage,
        assignedUsers,
        lists,
        actions
      } = action.payload
      return {
        ...state,
        name,
        backgroundImage,
        assignedUsers,
        lists,
        actions
      }
    default:
      return state
  }
}

export default boardPageReducer
