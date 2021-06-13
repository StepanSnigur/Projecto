import {
  initCreateBoardPage,
  initSetNewBoard,
  setBoardPageLoading,
  setBoardPageError,
  initAddNewBoardCard,
  addNewBoardCardAction,
  setBoardCardLoading,
  initAddNewBoardList,
  initDeleteBoardList,
  initMoveBoardColumn,
  initChangeBoardTitle,
  initChangeBoardCard,
  changeBoardCard
} from './boardPageSlice'
import { IBoardTask } from './boardPageSlice'
import { IDropResult } from './BoardPage'
import { ITableMember } from '../../features/AddNewTable/AddNewTable'

export interface IInitCreateBoardPage {
  type: typeof initCreateBoardPage.type,
  payload: {
    name: string,
    members: ITableMember[]
  }
}
export interface IInitSetNewBoard {
  type: typeof initSetNewBoard.type,
  payload: string
}
export interface ISetBoardPageLoading {
  type: typeof setBoardPageLoading.type,
  payload: boolean
}
export interface ISetBoardPageError {
  type: typeof setBoardPageError.type,
  payload: string | null
}
export interface IInitAddNewBoardCard {
  type: typeof initAddNewBoardCard.type,
  payload: {
    cardName: string,
    boardId: string,
    columnId: string
  }
}
export interface IAddNewBoardCard {
  type: typeof addNewBoardCardAction.type,
  payload: {
    columnId: string,
    newCard: IBoardTask
  }
}
export interface ISetBoardCardLoading {
  type: typeof setBoardCardLoading.type,
  payload: boolean
}
export interface IInitChangeBoardCard {
  type: typeof initChangeBoardCard.type,
  payload: {
    taskId: string,
    listId: string,
    newTitle: string,
    newDescription: string
  }
}
export interface IChangeBoardCard {
  type: typeof changeBoardCard.type,
  payload: {
    listId: string,
    taskId: string,
    newTitle: string,
    newDescription: string
  }
}

export interface IInitAddNewBoardList {
  type: typeof initAddNewBoardList.type,
  payload: {
    boardId: string,
    name: string
  }
}
export interface IInitDeleteBoardList {
  type: typeof initDeleteBoardList.type,
  payload: {
    boardId: string,
    listId: string
  }
}

export interface IInitMoveBoardColumn {
  type: typeof initMoveBoardColumn.type,
  payload: {
    source: IDropResult,
    destination: IDropResult
  }
}

export interface IInitChangeBoardTitle {
  type: typeof initChangeBoardTitle.type,
  payload: {
    boardId: string,
    newTitle: string
  }
}


export interface IAddNewBoardCardActionPayload {
  columnId: string,
  newCard: IBoardTask
}
export interface IChangeBoardCardActionPayload {
  listId: string,
  taskId: string,
  newTitle: string,
  newDescription: string
}
export interface IMoveBoardTaskActionPayload {
  source: IDropResult,
  destination: IDropResult
}

export interface IChangeTaskStatusActionPayload {
  listId: string,
  taskId: string,
  isCompleted: boolean
}
