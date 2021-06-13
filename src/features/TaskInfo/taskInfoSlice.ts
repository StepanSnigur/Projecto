import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ISetTaskInfoOpen } from './actionTypes'

export interface ITaskData {
  priority: string,
  type: string,
  date: string,
  title: string,
  description: string,
  // TODO
  comments: any[]
}
export interface ITaskInfoReducer {
  isOpen: boolean,
  error: string | null,
  isLoading: boolean,
  completed: boolean,
  id: string,
  listId: string,
  taskData: ITaskData
}

const taskInfoSlice = createSlice({
  name: 'taskInfo',
  initialState: {
    isOpen: false,
    error: null,
    isLoading: false,
    completed: false,
    id: '',
    listId: '',
    taskData: {
      priority: '',
      type: '',
      date: '',
      title: '',
      description: '',
      comments: []
    }
  } as ITaskInfoReducer,
  reducers: {
    initSetTaskInfoOpen(state, action) {},
    setTaskInfoOpen(state, action: PayloadAction<ISetTaskInfoOpen>) {
      return {
        ...state,
        isOpen: action.payload.isOpen,
        id: action.payload.id,
        listId: action.payload.listId,
        completed: action.payload.completed,
        taskData: {
          ...state.taskData,
          title: action.payload.title,
          description: action.payload.description
        }
      }
    },
    setTaskInfoLoading(state, action: PayloadAction<boolean>) {
      return {
        ...state,
        isLoading: action.payload
      }
    },
    changeTaskInfoStatus(state, action: PayloadAction<boolean>) {
      return {
        ...state,
        completed: action.payload
      }
    }
  }
})

export const {
  initSetTaskInfoOpen,
  setTaskInfoOpen,
  setTaskInfoLoading,
  changeTaskInfoStatus
} = taskInfoSlice.actions
export default taskInfoSlice.reducer
