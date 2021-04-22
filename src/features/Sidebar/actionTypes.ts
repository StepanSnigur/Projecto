import {
  SET_SIDEBAR_LINKS,
  UPDATE_SIDEBAR_LINK,
  INIT_UPDATE_SIDEBAR_LINK,
  SET_BOARD_LINK_LOADING,
  ADD_SIDEBAR_LINK
} from './actions'
import { IExtendedBoardLink } from './reducer'
import { IUserLinkUpdates } from './actions'

export interface ISetSidebarLinks {
  type: typeof SET_SIDEBAR_LINKS,
  payload: IExtendedBoardLink[]
}
export interface IAddSidebarLink {
  type: typeof ADD_SIDEBAR_LINK,
  payload: IExtendedBoardLink
}
export interface ISetBoardLinkLoading {
  type: typeof SET_BOARD_LINK_LOADING,
  payload: {
    idx: number,
    isLoading: boolean
  }
}
export interface IInitUpdateSidebarLink {
  type: typeof INIT_UPDATE_SIDEBAR_LINK,
  payload: {
    id: string,
    position: number
  }
}
export interface IUpdateSidebarLink {
  type: typeof UPDATE_SIDEBAR_LINK,
  payload: {
    idx: number,
    updates: IUserLinkUpdates
  }
}
