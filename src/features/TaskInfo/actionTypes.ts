import {
  initSetTaskInfoOpen
} from './taskInfoSlice'

export interface IInitTaskInfoOpen {
  type: typeof initSetTaskInfoOpen.type,
  payload: {
    isOpen: boolean,
    title: string,
    description: string,
    id: string,
    listId: string
  }
}
export interface ISetTaskInfoOpen {
  isOpen: boolean,
  title: string,
  description: string,
  id: string,
  listId: string,
  canEdit: boolean
}
export interface ISetTaskInfoLoading {
  isLoading: boolean
}
