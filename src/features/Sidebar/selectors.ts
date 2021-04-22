import { AppStateType } from '../../App/store'

export const getUserBoards = (state: AppStateType) => state.sidebar.boards
export const getPinnedBoards = (state: AppStateType) => state.sidebar.boards.filter(board => board.isPinned)
