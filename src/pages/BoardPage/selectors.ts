import { AppStateType } from '../../App/store'

export const getBoardPageState = (state: AppStateType) => state.boardPage
export const getBoardId = (state: AppStateType) => state.boardPage.id
