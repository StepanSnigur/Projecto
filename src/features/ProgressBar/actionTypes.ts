import { SET_PROGRESS_BAR_LOADING } from './actions'

export interface ISetProgressBarLoading {
  type: typeof SET_PROGRESS_BAR_LOADING,
  payload: boolean
}
