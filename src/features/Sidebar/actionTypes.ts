import {
  setSidebarLinks,
  setBoardLinkLoading,
  initUpdateSidebarLink
} from './sidebarSlice'
import { IExtendedBoardLink } from './sidebarSlice'

export interface ISetSidebarLinks {
  type: typeof setSidebarLinks.type,
  payload: IExtendedBoardLink[]
}
export interface ISetBoardLinkLoading {
  type: typeof setBoardLinkLoading.type,
  payload: {
    idx: number,
    isLoading: boolean
  }
}
export interface IInitUpdateSidebarLink {
  type: typeof initUpdateSidebarLink.type,
  payload: {
    id: string,
    position: number
  }
}

export interface IUserLinkUpdates {
  name: string,
  background: string
}
export interface ISetBoardLinksLoadingPayload {
  idx: number,
  isLoading: boolean
}
export interface IUpdateSidebarLinkPayload {
  idx: number,
  updates: IUserLinkUpdates
}
