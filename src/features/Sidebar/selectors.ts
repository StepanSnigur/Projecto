import { AppStateType } from '../../App/store'

export const getUserBoards = (state: AppStateType) => state.sidebar.boards
