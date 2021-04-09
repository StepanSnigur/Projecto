import {
  SET_NEW_BOARD,
  SET_BOARD_PAGE_LOADING,
  SET_BOARD_PAGE_ERROR,
  SET_BOARD_CARD_LOADING,
  ADD_NEW_BOARD_CARD,
  ADD_NEW_BOARD_LIST,
  DELETE_BOARD_LIST,
  MOVE_BOARD_TASK,
  MOVE_BOARD_COLUMN
} from './actions'
import {
  ISetNewBoard,
  ISetBoardPageLoading,
  ISetBoardPageError,
  ISetBoardCardLoading,
  IAddNewBoardCard,
  IAddNewBoardList,
  IDeleteBoardList,
  IMoveBoardTask,
  IMoveBoardColumn
} from './actionTypes'
import { moveToPosition } from './utils'

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
  ISetBoardCardLoading | IAddNewBoardCard | IAddNewBoardList | IDeleteBoardList | IMoveBoardTask |
  IMoveBoardColumn

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
    case MOVE_BOARD_TASK:
      const { source, destination } = action.payload
      const listsToChange = [...state.lists]

      const dragFromListIndex = state.lists.findIndex(list => list.id === source.droppableId)
      const dragToListIndex = state.lists.findIndex(list => list.id === destination.droppableId)
      const taskToMove = { ...listsToChange[dragFromListIndex].tasks[source.index] }
      console.log(taskToMove, 'move')
      listsToChange[dragFromListIndex].tasks = listsToChange[dragFromListIndex].tasks
        .filter((_, i) => i !== source.index)
      listsToChange[dragToListIndex].tasks = [
        ...listsToChange[dragToListIndex].tasks.slice(0, destination.index),
        taskToMove,
        ...listsToChange[dragToListIndex].tasks.slice(destination.index),
      ]

      return {
        ...state,
        lists: listsToChange
      }
    case MOVE_BOARD_COLUMN:
      const sourceId = action.payload.source.index
      const destinationId = action.payload.destination.index
      return {
        ...state,
        lists: moveToPosition([...state.lists], sourceId, destinationId)
      }
    case ADD_NEW_BOARD_LIST:
      return {
        ...state,
        lists: [
          ...state.lists,
          action.payload
        ]
      }
    case DELETE_BOARD_LIST:
      return {
        ...state,
        lists: state.lists.filter(list => list.id !== action.payload)
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
