import { takeEvery, call, put, select } from 'redux-saga/effects'
import { v4 as uuidv4 } from 'uuid'
import {
  IInitCreateBoardPage,
  IInitAddNewBoardCard,
  IInitSetNewBoard,
  IInitAddNewBoardList,
  IInitDeleteBoardList,
  IInitMoveBoardColumn,
  IInitChangeBoardTitle,
  IInitChangeBoardCard
} from './actionTypes'
import boardApi from '../../api/boardApi'
import { IBoardPage, IBoardList, IBoardSettings } from './boardPageSlice'
import {
  initCreateBoardPage,
  initSetNewBoard,
  initAddNewBoardCard,
  initAddNewBoardList,
  initDeleteBoardList,
  initMoveBoardTask,
  initMoveBoardColumn,
  initChangeBoardTitle,
  initChangeBoardCard,
  setNewBoardAction,
  setBoardPageLoading,
  setBoardPageError,
  setBoardCardLoading,
  addNewBoardCardAction,
  addNewBoardListAction,
  deleteBoardListAction,
  moveBoardTask,
  moveBoardColumn,
  changeBoardTitle,
  changeBoardCard,
  saveBoardPageSettings
} from './boardPageSlice'
import { checkIsLogged } from '../../common/saga'
import { fireSetError } from '../../features/ErrorManager/errorManagerSlice'
import { setProgressBarLoading } from '../../features/ProgressBar/progressBarSlice'
import { IUserData, IBoardLink } from '../../common/user/userSlice'
import { setSidebarLinks, addSidebarLink } from '../../features/Sidebar/sidebarSlice'
import { addLoadingField } from '../../features/Sidebar/utils'
import { getUserState } from '../../common/user/selectors'
import history from '../../App/history'
import { getBoardId, getBoardPageState, getBoardPageSettings } from './selectors'
import { setSidebarSpinnerLoading } from '../../features/SidebarSpinner/sidebarSpinnerSlice'
import { setBoardSettingsOpen } from '../../features/BoardSettings/boardSettingsSlice'

interface INewBoardWithId extends IBoardPage {
  id: string
}
export interface INewBoardData {
  updatedUserTables: IBoardLink[],
  newBoard: INewBoardWithId
}
export function* watchCreateBoard() {
  yield takeEvery(initCreateBoardPage.type, createBoardSaga)
}
export function* createBoardSaga(action: IInitCreateBoardPage) {
  try {
    yield put(setBoardCardLoading(true))
    yield put(setProgressBarLoading(true))
    const { name, members } = action.payload
    const userState: IUserData = yield select(getUserState)
    const newTableData: INewBoardData = yield call(
      boardApi.createBoard,
      name,
      members,
      userState.registeredInBoards,
      userState.email,
      userState.id
    )
    const extendedSidebarLinks = addLoadingField(newTableData.updatedUserTables)
    yield put(setSidebarLinks(extendedSidebarLinks))
    const newBoardSidebarLink = {
      name: name,
      background: newTableData.newBoard.backgroundImage || '#fff',
      isLoading: false,
      id: newTableData.newBoard.id,
      isAdmin: true,
      isPinned: false
    }
    yield put(addSidebarLink(newBoardSidebarLink))
    history.push(`/board/${newTableData.newBoard.id}`)
  } catch (e) {
    yield put(fireSetError(e.message || 'Непредвиденная ошибка'))
  } finally {
    yield put(setBoardCardLoading(false))
    yield put(setProgressBarLoading(false))
  }
}

export function* watchSetNewBoard() {
  yield takeEvery(initSetNewBoard.type, setNewBoard)
}
export function* setNewBoard(action: IInitSetNewBoard) {
  try {
    yield put(setBoardPageError(null))
    yield put(setBoardPageLoading(true))
    const board: IBoardPage = yield call(boardApi.getBoard, action.payload)
    yield put(setNewBoardAction(board))
  } catch (err) {
    yield put(setBoardPageError(err.message))
  } finally {
    yield put(setBoardPageLoading(false))
  }
}

export function* watchAddNewBoardCard() {
  yield takeEvery(initAddNewBoardCard.type, addNewBoardCard)
}
export function* addNewBoardCard(action: IInitAddNewBoardCard) {
  try {
    if (!action.payload.columnId) throw new Error('Не удалось добавить задачу')
    yield put(setProgressBarLoading(true))
    yield put(setBoardCardLoading(true))
    const boardId = action.payload.boardId
    const newCard = {
      id: uuidv4(),
      name: action.payload.cardName,
      createdAt: new Date().toLocaleDateString()
    }
    yield call(boardApi.addNewCard, boardId, action.payload.columnId, newCard)
    yield put(addNewBoardCardAction({
      columnId: action.payload.columnId,
      newCard
    }))
  } catch (e) {
    yield put(fireSetError(e.message || 'Непредвиденная ошибка'))
  } finally {
    yield put(setBoardCardLoading(false))
    yield put(setProgressBarLoading(false))
  }
}

export function* watchChangeBoardCard() {
  yield takeEvery(initChangeBoardCard.type, changeBoardCardSaga)
}
export function* changeBoardCardSaga(action: IInitChangeBoardCard) {
  try {
    if (!action.payload.taskId) throw new Error('Не обновить добавить задачу')
    yield put(setProgressBarLoading(true))
    yield put(setBoardCardLoading(true))

    const boardId: string = yield select(getBoardId)
    const boardPageState: IBoardPage = yield select(getBoardPageState)
    const { taskId, listId, newTitle, newDescription } = action.payload
    yield call(boardApi.changeTaskData, boardId, listId, taskId, newTitle, newDescription, boardPageState.lists)
    yield put(changeBoardCard({ listId, taskId, newTitle, newDescription }))
  } catch (e) {
    yield put(fireSetError(e.message || 'Непредвиденная ошибка'))
  } finally {
    yield put(setBoardCardLoading(false))
    yield put(setProgressBarLoading(false))
  }
}

export function* watchAddNewBoardList() {
  yield takeEvery(initAddNewBoardList.type, addNewBoardList)
}
export function* addNewBoardList(action: IInitAddNewBoardList) {
  try {
    if (!action.payload) throw new Error('Список должен иметь корректное название')
    yield put(setProgressBarLoading(true))
    yield put(setBoardCardLoading(true))
    const newBoardList: IBoardList = {
      name: action.payload.name,
      id: uuidv4(),
      tasks: []
    }
    yield call(boardApi.addNewList, newBoardList, action.payload.boardId)
    yield put(addNewBoardListAction(newBoardList))
  } catch (e) {
    yield put(fireSetError(e.message || 'Непредвиденная ошибка'))
  } finally {
    yield put(setBoardCardLoading(false))
    yield put(setProgressBarLoading(false))
  }
}

export function* watchDeleteBoardList() {
  yield takeEvery(initDeleteBoardList.type, deleteBoardList)
}
export function* deleteBoardList(action: IInitDeleteBoardList) {
  try {
    if (!action.payload.listId) throw new Error('Ошибка при удалении списка')
    yield put(setProgressBarLoading(true))
    yield put(setBoardCardLoading(true))
    yield put(deleteBoardListAction(action.payload.listId))
  } catch (e) {
    yield put(fireSetError(e.message || 'Непредвиденная ошибка'))
  } finally {
    yield put(setBoardCardLoading(false))
    yield put(setProgressBarLoading(false))
  }
}

export function* watchMoveBoardTask() {
  yield takeEvery(initMoveBoardTask.type, moveBoardTaskSaga)
}
export function* moveBoardTaskSaga(action: IInitMoveBoardColumn) {
  try {
    yield put(setProgressBarLoading(true))
    yield put(setBoardCardLoading(true))
    yield put(moveBoardTask({
      source: action.payload.source,
      destination: action.payload.destination
    }))
  } catch (e) {
    yield put(fireSetError(e.message || 'Непредвиденная ошибка'))
  } finally {
    yield put(setBoardCardLoading(false))
    yield put(setProgressBarLoading(false))
  }
}
export function* watchMoveBoardColumn() {
  yield takeEvery(initMoveBoardColumn.type, moveBoardColumnSaga)
}
export function* moveBoardColumnSaga(action: IInitMoveBoardColumn) {
  try {
    yield put(setProgressBarLoading(true))
    yield put(setBoardCardLoading(true))
    yield put(moveBoardColumn({
      source: action.payload.source,
      destination: action.payload.destination
    }))
  } catch (e) {
    yield put(fireSetError(e.message || 'Непредвиденная ошибка'))
  } finally {
    yield put(setBoardCardLoading(false))
    yield put(setProgressBarLoading(false))
  }
}

export function* watchChangeBoardTitle() {
  yield takeEvery(initChangeBoardTitle.type, changeBoardTitleSaga)
}
export function* changeBoardTitleSaga(action: IInitChangeBoardTitle) {
  try {
    yield call(checkIsLogged)
    yield put(setProgressBarLoading(true))
    const { boardId, newTitle } = action.payload
    yield call(boardApi.changeBoardTitle, boardId, newTitle)
    yield put(changeBoardTitle(newTitle))
  } catch (e) {
    yield put(fireSetError(e.message || 'Непредвиденная ошибка'))
  } finally {
    yield put(setProgressBarLoading(false))
  }
}

export function* watchSaveBoardPageSettings() {
  yield takeEvery(saveBoardPageSettings.type, saveBoardPageSettingsSaga)
}
function* saveBoardPageSettingsSaga() {
  try {
    yield put(setSidebarSpinnerLoading(true))
    const newSettings: IBoardSettings = yield select(getBoardPageSettings)
    const boardId: string = yield select(getBoardId)
    yield call(boardApi.saveBoardSettings, boardId, newSettings)
    yield put(setBoardSettingsOpen(false))
  } catch (e) {
    yield put(fireSetError('Не удалось сохранить настройки'))
  } finally {
    yield put(setSidebarSpinnerLoading(false))
  }
}
