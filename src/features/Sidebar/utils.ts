import { IBoardLink } from '../../common/user/reducer'
import { IExtendedBoardLink } from './reducer'

export const addLoadingField = (arr: IBoardLink[]): IExtendedBoardLink[] => arr.map(el => ({
  ...el,
  isLoading: false
}))
