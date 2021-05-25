import { ROLES } from '../constants'
import { IBoardLink } from './userSlice'

export const isAdminOfBoard = (boardId: string | undefined, userBoards: IBoardLink[]) => {
  return userBoards.find(board => boardId === board.boardId)?.role === ROLES.ADMIN
}
