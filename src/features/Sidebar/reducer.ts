import { IBoardLink } from '../../common/user/reducer'
import {
  ISetSidebarLinks,
  IUpdateSidebarLink,
  ISetBoardLinkLoading,
  IAddSidebarLink
} from './actionTypes'
import {
  SET_SIDEBAR_LINKS,
  UPDATE_SIDEBAR_LINK,
  SET_BOARD_LINK_LOADING,
  ADD_SIDEBAR_LINK
} from './actions'

export interface IExtendedBoardLink extends IBoardLink {
  name?: string,
  background?: string,
  isLoading: boolean
}
export interface ISidebarReducer {
  boards: IExtendedBoardLink[]
}
const initialState: ISidebarReducer = {
  boards: []
}
type sidebarReducerActionType = ISetSidebarLinks | IUpdateSidebarLink | ISetBoardLinkLoading | IAddSidebarLink

const sidebarReducer = (state = initialState, action: sidebarReducerActionType): ISidebarReducer => {
  switch (action.type) {
    case SET_SIDEBAR_LINKS:
      return {
        ...state,
        boards: action.payload
      }
    case ADD_SIDEBAR_LINK:
      return {
        ...state,
        boards: [...state.boards, action.payload]
      }
    case UPDATE_SIDEBAR_LINK:
      const updatedBoards = [...state.boards]
      updatedBoards[action.payload.idx] = {
        ...updatedBoards[action.payload.idx],
        ...action.payload.updates
      }
      return {
        ...state,
        boards: updatedBoards
      }
    case SET_BOARD_LINK_LOADING:
      const newBoards = [...state.boards]
      newBoards[action.payload.idx] = {
        ...newBoards[action.payload.idx],
        isLoading: action.payload.isLoading
      }
      return {
        ...state,
        boards: newBoards
      }
    default:
      return state
  }
}

export default sidebarReducer
