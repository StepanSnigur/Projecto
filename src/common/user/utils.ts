import { IBoardLink } from './userSlice'

export const isAdminOfBoard = (boardId: string | undefined, userBoards: IBoardLink[]) => {
  return userBoards.find(board => boardId === board.id)?.isAdmin
}
