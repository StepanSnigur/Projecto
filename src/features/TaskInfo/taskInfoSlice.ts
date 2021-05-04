import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ISetTaskInfoOpen, ISetTaskInfoLoading } from './actionTypes'

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
  canEdit: boolean,
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
    canEdit: false,
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
        canEdit: action.payload.canEdit,
        id: action.payload.id,
        listId: action.payload.listId,
        taskData: {
          ...state.taskData,
          title: action.payload.title,
          description: action.payload.description
        }
      }
    },
    setTaskInfoLoading(state, action: PayloadAction<ISetTaskInfoLoading>) {
      return {
        ...state,
        isLoading: action.payload.isLoading
      }
    },
  }
})

export const {
  initSetTaskInfoOpen,
  setTaskInfoOpen,
  setTaskInfoLoading
} = taskInfoSlice.actions
export default taskInfoSlice.reducer