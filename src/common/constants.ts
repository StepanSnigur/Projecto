import { PayloadAction } from '@reduxjs/toolkit'
import { IBoardList, initMoveBoardColumn, initMoveBoardTask } from '../pages/BoardPage/boardPageSlice'

export const ENTER_KEY_CODE = 13

export const ROLES = {
  USER: 'USER',
  ADMIN: 'ADMIN'
}
export type RoleType = typeof ROLES.USER | typeof ROLES.ADMIN

export const trackedActions = [
  {
    type: initMoveBoardTask.type,
    getDescription(action: PayloadAction<any>, store: any) {
      const { source, destination } = action.payload
      const cardTask = store.getState().boardPage.lists
        .find((list: IBoardList) => list._id === source.droppableId)
        .tasks[source.index]
        .name
      const sourceListName = store.getState().boardPage.lists
        .find((list: IBoardList) => list._id === source.droppableId)
        .name
      const destinationListName = store.getState().boardPage.lists
        .find((list: IBoardList) => list._id === destination.droppableId)
        .name
      return `Карточка с задачей "${cardTask}" была перемещена из списка "${sourceListName}" в список "${destinationListName}"`
    }
  },
  {
    type: initMoveBoardColumn.type,
    getDescription(action: PayloadAction<any>, store: any) {
      const { source, destination } = action.payload
      const listName = store.getState().boardPage.lists[source.index].name
      return `Список с названием "${listName}" был перемещен с позиции №${source.index} на позицию №${destination.index}`
    }
  }
]
