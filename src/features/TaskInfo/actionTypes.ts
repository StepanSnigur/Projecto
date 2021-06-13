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
    listId: string,
    completed: boolean
  }
}
export interface ISetTaskInfoOpen {
  isOpen: boolean,
  title: string,
  description: string,
  id: string,
  listId: string,
  completed: boolean
}
