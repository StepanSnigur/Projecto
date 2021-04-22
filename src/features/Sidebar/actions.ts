import { IExtendedBoardLink } from './reducer'

export interface IUserLinkUpdates {
  name: string,
  background: string
}

export const SET_BOARD_LINK_LOADING = 'SIDEBAR/SET_LINK_LOADING'
export const setBoardLinkLoading = (idx: number, isLoading: boolean) => ({
  type: SET_BOARD_LINK_LOADING,
  payload: {
    idx,
    isLoading
  }
})
export const SET_SIDEBAR_LINKS = 'SIDEBAR/SET_LINKS'
export const setSidebarLinks = (links: IExtendedBoardLink[]) => ({
  type: SET_SIDEBAR_LINKS,
  payload: links
})
export const ADD_SIDEBAR_LINK = 'SIDEBAR/ADD_LINK'
export const addSidebarLink = (link: IExtendedBoardLink) => ({
  type: ADD_SIDEBAR_LINK,
  payload: link
})
export const INIT_UPDATE_SIDEBAR_LINK = 'SIDEBAR/INIT_UPDATE_LINK'
export const initUpdateSidebarLink = (id: string, position: number) => ({
  type: INIT_UPDATE_SIDEBAR_LINK,
  payload: {
    id,
    position
  }
})
export const UPDATE_SIDEBAR_LINK = 'SIDEBAR/UPDATE_LINK'
export const updateSidebarLink = (idx: number, updates: IUserLinkUpdates) => ({
  type: UPDATE_SIDEBAR_LINK,
  payload: {
    idx,
    updates
  }
})
