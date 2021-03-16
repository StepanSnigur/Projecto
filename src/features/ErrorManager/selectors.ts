import { AppStateType } from '../../App/store'

export const getError = (state: AppStateType) => {
  return state.errorManager.error
}