import { SET_ADD_NEW_TABLE_WINDOW } from './actions'
import { IOpenAddNewTableWindow } from './actionTypes'

export interface IAddNewTableReducer {
  isOpen: boolean
}
const initialState: IAddNewTableReducer = {
  isOpen: false
}
type addNewTableReducerActionType = IOpenAddNewTableWindow

const addNewTableReducer = (state = initialState, action: addNewTableReducerActionType): IAddNewTableReducer => {
  switch (action.type) {
    case SET_ADD_NEW_TABLE_WINDOW:
      return {
        ...state,
        isOpen: action.payload
      }
    default:
      return state
  }
}

export default addNewTableReducer
