import {
  SET_TASK_INFO_OPEN
} from './actions'
import {
  ISetTaskInfoOpen
} from './actionTypes'

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
const initialState: ITaskInfoReducer = {
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
}

type taskInfoReducerActionType = ISetTaskInfoOpen
const taskInfoReducer = (state = initialState, action: taskInfoReducerActionType): ITaskInfoReducer => {
  switch (action.type) {
    case SET_TASK_INFO_OPEN:
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
    default:
      return state
  }
}

export default taskInfoReducer
