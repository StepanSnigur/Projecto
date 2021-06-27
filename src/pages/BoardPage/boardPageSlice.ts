import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  IAddNewBoardCardActionPayload,
  IChangeBoardCardActionPayload,
  IChangeTaskStatusActionPayload,
  IMoveBoardTaskActionPayload
} from './actionTypes'
import { ITableMember } from '../../features/AddNewTable/AddNewTable'
import { moveToPosition } from './utils'
import { IUserDataWithRole } from './saga'

export interface IBoardTask {
  name: string,
  description?: string,
  createdAt: string,
  completed: boolean,
  _id: string
}
export interface IBoardList {
  name: string,
  _id: string,
  tasks: IBoardTask[]
}
export interface IBoardAction {
  _id: string,
  action: string,
  producedBy: string,
  producedAt: string
}
export interface IBoardSettings {
  comments: string,
  isPrivate: string
}
export interface IBoardPage {
  name: string,
  assignedUsers: ITableMember[],
  backgroundImage: string | null,
  lists: IBoardList[],
  actions: IBoardAction[],
  _id: string,
  settings: IBoardSettings
}
interface IBoardPageState extends IBoardPage {
  isLoading: boolean,
  isCardLoading: boolean,
  error: string | null
}

const boardPageSlice = createSlice({
  name: 'boardPageSlice',
  initialState: {
    isLoading: false,
    isCardLoading: false,
    error: null,
    name: '',
    backgroundImage: null,
    assignedUsers: [],
    lists: [],
    actions: [],
    _id: '',
    settings: {
      comments: 'disabled',
      isPrivate: 'false'
    }
  } as IBoardPageState,
  reducers: {
    initCreateBoardPage(state, action) {},
    initSetNewBoard(state, action) {},
    setNewBoardAction(state, action: PayloadAction<IBoardPage>) {
      const {
        name,
        backgroundImage,
        assignedUsers,
        lists,
        actions,
        _id,
        settings
      } = action.payload
      return {
        ...state,
        name,
        backgroundImage,
        assignedUsers,
        lists,
        actions,
        _id,
        settings
      }
    },
    setBoardPageLoading(state, action: PayloadAction<boolean>) {
      return {
        ...state,
        isLoading: action.payload
      }
    },
    setBoardPageError(state, action: PayloadAction<string | null>) {
      return {
        ...state,
        error: action.payload
      }
    },
    initAddNewBoardCard(state, action) {},
    addNewBoardCardAction(state, action: PayloadAction<IAddNewBoardCardActionPayload>) {
      const updatedLists = [...state.lists]
      const listToUpdate = updatedLists.findIndex((list) => list._id === action.payload.columnId)
      updatedLists[listToUpdate] = {
        ...updatedLists[listToUpdate],
        tasks: [...updatedLists[listToUpdate].tasks, action.payload.newCard]
      }
      return {
        ...state,
        lists: updatedLists
      }
    },
    setBoardCardLoading(state, action: PayloadAction<boolean>) {
      return {
        ...state,
        isCardLoading: action.payload
      }
    },
    initChangeBoardCard(state, action) {},
    changeBoardCard(state, action: PayloadAction<IChangeBoardCardActionPayload>) {
      const newLists = [...state.lists]
      const listToChange = newLists.findIndex(list => list._id === action.payload.listId)
      const taskToChange = newLists[listToChange].tasks.findIndex(task => task._id === action.payload.taskId)
      const newTasks = [...newLists[listToChange].tasks]
      newTasks[taskToChange] = {
        ...newTasks[taskToChange],
        name: action.payload.newTitle,
        description: action.payload.newDescription
      }
      newLists[listToChange] = {
        ...newLists[listToChange],
        tasks: newTasks
      }
      return {
        ...state,
        lists: newLists
      }
    },
    initAddNewBoardList(state, action) {},
    addNewBoardListAction(state, action: PayloadAction<IBoardList>) {
      return {
        ...state,
        lists: [
          ...state.lists,
          action.payload
        ]
      }
    },
    initDeleteBoardList(state, action) {},
    deleteBoardListAction(state, action: PayloadAction<string>) {
      return {
        ...state,
        lists: state.lists.filter(list => list._id !== action.payload)
      }
    },
    initMoveBoardTask(state, action) {},
    moveBoardTask(state, action: PayloadAction<IMoveBoardTaskActionPayload>) {
      const { source, destination } = action.payload
      const listsToChange = [...state.lists]

      const dragFromListIndex = state.lists.findIndex(list => list._id === source.droppableId)
      const dragToListIndex = state.lists.findIndex(list => list._id === destination.droppableId)
      const taskToMove = { ...listsToChange[dragFromListIndex].tasks[source.index] }
      state.lists[dragFromListIndex].tasks = state.lists[dragFromListIndex].tasks.filter((_, i) => i !== source.index)
      state.lists[dragToListIndex].tasks.splice(destination.index, 0, taskToMove)
    },
    initMoveBoardColumn(state, action) {},
    moveBoardColumn(state, action: PayloadAction<IMoveBoardTaskActionPayload>) {
      const sourceId = action.payload.source.index
      const destinationId = action.payload.destination.index
      return {
        ...state,
        lists: moveToPosition([...state.lists], sourceId, destinationId)
      }
    },
    initChangeBoardTitle(state, action) {},
    changeBoardTitle(state, action: PayloadAction<string>) {
      return {
        ...state,
        name: action.payload
      }
    },
    changeBoardBackground(state, action: PayloadAction<string>) {
      return {
        ...state,
        backgroundImage: action.payload
      }
    },
    changeIsPrivateState(state, action: PayloadAction<string>) {
      return {
        ...state,
        settings: {
          ...state.settings,
          isPrivate: action.payload
        }
      }
    },
    saveBoardPageSettings() {},
    initAddUserToBoard(state, action) {},
    addUserToBoard(state, action: PayloadAction<IUserDataWithRole>) {
      return {
        ...state,
        assignedUsers: [
          ...state.assignedUsers,
          {
            _id: action.payload._id,
            userId: action.payload._id,
            name: action.payload.email,
            role: action.payload.role
          }
        ]
      }
    },
    initDeleteBoardMember(state, action) {},
    deleteBoardMember(state, action) {
      return {
        ...state,
        assignedUsers: state.assignedUsers.filter(user => user.userId !== action.payload)
      }
    },
    initAddBoardAction(state, action) {},
    addBoardAction(state, action: PayloadAction<IBoardAction>) {
      return {
        ...state,
        actions: [action.payload, ...state.actions]
      }
    },
    initChangeTaskStatus(state, action) {},
    changeTaskStatus(state, action: PayloadAction<IChangeTaskStatusActionPayload>) {
      const { listId, taskId, isCompleted } = action.payload
      const list = state.lists.find(list => list._id === listId)
      const task = list!.tasks.find(task => task._id === taskId)
      task!.completed = isCompleted

      return state
    }
  }
})

export const {
  initCreateBoardPage,
  initSetNewBoard,
  setNewBoardAction,
  setBoardPageLoading,
  setBoardPageError,
  initAddNewBoardCard,
  addNewBoardCardAction,
  setBoardCardLoading,
  initChangeBoardCard,
  changeBoardCard,
  initAddNewBoardList,
  addNewBoardListAction,
  initDeleteBoardList,
  deleteBoardListAction,
  initMoveBoardTask,
  moveBoardTask,
  initMoveBoardColumn,
  moveBoardColumn,
  initChangeBoardTitle,
  changeBoardTitle,
  changeBoardBackground,
  changeIsPrivateState,
  saveBoardPageSettings,
  initAddUserToBoard,
  addUserToBoard,
  initDeleteBoardMember,
  deleteBoardMember,
  initAddBoardAction,
  addBoardAction,
  initChangeTaskStatus,
  changeTaskStatus
} = boardPageSlice.actions
export default boardPageSlice.reducer
