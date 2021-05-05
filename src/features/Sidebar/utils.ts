import { IBoardLink } from '../../common/user/userSlice'
import { IExtendedBoardLink } from './sidebarSlice'

export const addLoadingField = (arr: IBoardLink[]): IExtendedBoardLink[] => arr.map(el => ({
  ...el,
  isLoading: false
}))
