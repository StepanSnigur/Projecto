import { AppStateType } from '../../App/store'

export const getBoardPageState = (state: AppStateType) => state.boardPage
export const getBoardId = (state: AppStateType) => state.boardPage._id
export const getBoardPageSettings = (state: AppStateType) => state.boardPage.settings
export const getBoardActions = (state: AppStateType) => state.boardPage.actions
