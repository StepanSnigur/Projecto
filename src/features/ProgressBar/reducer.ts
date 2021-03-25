import { SET_PROGRESS_BAR_LOADING } from './actions'
import { ISetProgressBarLoading } from './actionTypes'

const initialState = {
  isLoading: false
}
type progressBarReducerActionType = ISetProgressBarLoading

const progressBarReducer = (state = initialState, action: progressBarReducerActionType) => {
  switch (action.type) {
    case SET_PROGRESS_BAR_LOADING:
      return {
        ...state,
        isLoading: action.payload
      }
    default:
      return state
  }
}

export default progressBarReducer
