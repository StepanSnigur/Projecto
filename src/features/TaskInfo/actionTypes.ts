import {
  INIT_TASK_INFO_OPEN,
  SET_TASK_INFO_OPEN,
  SET_TASK_INFO_LOADING
} from './actions'

export interface IInitTaskInfoOpen {
  type: typeof INIT_TASK_INFO_OPEN,
  payload: {
    isOpen: boolean,
    title: string,
    id: string
  }
}

export interface ISetTaskInfoOpen {
  type: typeof SET_TASK_INFO_OPEN,
  payload: {
    isOpen: boolean,
    title: string,
    id: string,
    canEdit: boolean
  }
}

export interface ISetTaskInfoLoading {
  type: typeof SET_TASK_INFO_LOADING,
  payload: boolean
}
