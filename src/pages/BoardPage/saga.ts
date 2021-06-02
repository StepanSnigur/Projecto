import { takeEvery, call, put, select } from 'redux-saga/effects'
import { PayloadAction } from '@reduxjs/toolkit'
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
import { IBoardPage, IBoardList, IBoardSettings, IBoardTask } from './boardPageSlice'
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
  saveBoardPageSettings,
  initAddUserToBoard,
  addUserToBoard,
  initDeleteBoardMember,
  deleteBoardMember
} from './boardPageSlice'
import { checkIsLogged } from '../../common/saga'
import { fireSetError } from '../../features/ErrorManager/errorManagerSlice'
import { setProgressBarLoading } from '../../features/ProgressBar/progressBarSlice'
import { IUserData, IBoardLink, addBoardLinkToCurrentUser } from '../../common/user/userSlice'
import { addSidebarLink, changeSidebarLinkName, IExtendedBoardLink } from '../../features/Sidebar/sidebarSlice'
import { getToken, getUserId, getUserState } from '../../common/user/selectors'
import history from '../../App/history'
import { getBoardId, getBoardPageSettings } from './selectors'
import { setSidebarSpinnerLoading } from '../../features/SidebarSpinner/sidebarSpinnerSlice'
import { setBoardSettingsOpen } from '../../features/BoardSettings/boardSettingsSlice'
import authApi from '../../api/authApi'
import { ROLES, RoleType } from '../../common/constants'
import { ITableMember } from '../../features/AddNewTable/AddNewTable'

export interface IUserDataWithRole extends IUserData {
  role: RoleType
}

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
    const backgroundImage = '#525252' // TODO
    const user: IUserData = yield select(getUserState)
    members.push({
      _id: user._id,
      userId: user._id,
      name: user.email,
      role: ROLES.ADMIN
    } as ITableMember)
    const token: string = yield select(getToken)

    const newBoard: IBoardPage = yield call(
      boardApi.createBoard,
      name,
      members,
      backgroundImage,
      token
    )

    const userLink: IBoardLink = {
      _id: newBoard._id,
      boardId: newBoard._id,
      role: ROLES.ADMIN,
      isPinned: false
    }
    const sidebarLink: IExtendedBoardLink = {
      ...userLink,
      name,
      background: newBoard.backgroundImage || backgroundImage,
      isLoading: false,
    }
    yield put(addSidebarLink(sidebarLink))
    yield put(addBoardLinkToCurrentUser(userLink))
    history.push(`/board/${newBoard._id}`)
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
    const token: string = yield select(getToken)
    const board: IBoardPage = yield call(boardApi.getBoard, action.payload, token)
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
    const { boardId, columnId, cardName } = action.payload
    const token: string = yield select(getToken)

    const newCard: IBoardTask = yield call(
      boardApi.addNewCard,
      boardId,
      columnId,
      new Date().toLocaleDateString(),
      cardName,
      token
    )
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
    const { taskId, listId, newTitle, newDescription } = action.payload
    const token: string = yield select(getToken)
    yield call(boardApi.changeTaskData, boardId, listId, taskId, newTitle, newDescription, token)
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
    const { boardId, name } = action.payload
    const token: string = yield select(getToken)

    const newBoardList: IBoardList = yield call(boardApi.addNewList, boardId, name, token)
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
    const { source, destination } = action.payload
    yield put(moveBoardTask({
      source,
      destination
    }))
    const boardId: string = yield select(getBoardId)
    const token: string = yield select(getToken)
    yield call(boardApi.moveBoardTask, boardId, source, destination, token)
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
    const { source, destination } = action.payload
    yield put(moveBoardColumn({
      source,
      destination
    }))
    const boardId: string = yield select(getBoardId)
    const token: string = yield select(getToken)
    yield call(boardApi.moveBoardColumn, boardId, source, destination, token)
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
    const token: string = yield select(getToken)
    yield call(boardApi.changeBoardTitle, boardId, newTitle, token)
    yield put(changeBoardTitle(newTitle))
    yield put(changeSidebarLinkName({ id: boardId, name: newTitle }))
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
    const token: string = yield select(getToken)
    const boardId: string = yield select(getBoardId)
    yield call(boardApi.saveBoardSettings, boardId, newSettings, token)
    yield put(setBoardSettingsOpen(false))
  } catch (e) {
    yield put(fireSetError(e.message || 'Не удалось сохранить настройки'))
  } finally {
    yield put(setSidebarSpinnerLoading(false))
  }
}

export function* watchAddUserToBoard() {
  yield takeEvery(initAddUserToBoard.type, addUserToBardSaga)
}
function* addUserToBardSaga(action: PayloadAction<IUserDataWithRole>) {
  try {
    yield put(setProgressBarLoading(true))
    const { _id, email } = action.payload
    if (!action.payload || !_id) throw new Error('Что-то пошло не так')
    const boardId: string = yield select(getBoardId)
    const token: string = yield select(getToken)

    action.payload.role = ROLES.USER
    yield call(authApi.addTableToUser, _id, email, boardId, action.payload.role, token)
    yield put(addUserToBoard(action.payload))
  } catch (e) {
    yield put(fireSetError(e.message))
  } finally {
    yield put(setProgressBarLoading(false))
  }
}

export function* watchDeleteBoardMember() {
  yield takeEvery(initDeleteBoardMember.type, deleteBoardMemberSaga)
}
function* deleteBoardMemberSaga(action: PayloadAction<{ boardId: string, userId: string }>) {
  try {
    yield put(setProgressBarLoading(true))
    const { boardId, userId } = action.payload
    const currentUserId: string = yield select(getUserId)
    if (currentUserId === userId) throw new Error('Вы не можете удалить самого себя')

    yield call(boardApi.deleteBoardMember, boardId, userId)
    yield put(deleteBoardMember(userId))
  } catch (e) {
    yield put(fireSetError(e.message))
  } finally {
    yield put(setProgressBarLoading(false))
  }
}
