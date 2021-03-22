import {
  SET_NEW_BOARD,
  SET_BOARD_PAGE_LOADING,
  SET_BOARD_PAGE_ERROR
} from './actions'
import {
  ISetNewBoard,
  ISetBoardPageLoading,
  ISetBoardPageError
} from './actionTypes'

export interface IBoardTask {
  name: string,
  createdAt: string
}
export interface IBoardList {
  name: string,
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
  error: string | null
}
type boardPageReducerActionType = ISetNewBoard | ISetBoardPageLoading | ISetBoardPageError

const initialState: IBoardPageState = {
  isLoading: false,
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
