import { configureStore, combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'

import { watchAddNewUser } from '../pages/RegistrationPage/saga'
import { watchSetUser } from '../common/user/saga'
import userReducer from '../common/user/userSlice'

import errorManagerReducer from '../features/ErrorManager/errorManagerSlice'
import { watchSetError } from '../features/ErrorManager/saga'

import { registrationPageReducer } from '../pages/RegistrationPage'
import addNewTableReducer from '../features/AddNewTable/addNewTableSlice'

import {
  watchCreateBoard,
  watchSetNewBoard,
  watchAddNewBoardCard,
  watchAddNewBoardList,
  watchDeleteBoardList,
  watchMoveBoardTask,
  watchMoveBoardColumn,
  watchChangeBoardTitle,
  watchChangeBoardCard
} from '../pages/BoardPage/saga'
import boardPageReducer from '../pages/BoardPage/boardPageSlice'

import progressBarReducer from '../features/ProgressBar/progressBarSlice'
import sidebarReducer from '../features/Sidebar/sidebarSlice'
import { watchUpdateUserLink } from '../features/Sidebar/saga'

import taskInfoReducer from '../features/TaskInfo/taskInfoSlice'
import { watchOpenTaskInfo } from '../features/TaskInfo/saga'

export const sagaMiddleware = createSagaMiddleware()
const rootReducer = combineReducers({
  user: userReducer,
  errorManager: errorManagerReducer,
  registrationPage: registrationPageReducer,
  boardPage: boardPageReducer,
  progressBar: progressBarReducer,
  addNewTable: addNewTableReducer,
  sidebar: sidebarReducer,
  taskInfo: taskInfoReducer
})
const store = configureStore({
  reducer: rootReducer,
  middleware: [...getDefaultMiddleware({ thunk: false }), sagaMiddleware]
})
export type AppStateType = ReturnType<typeof rootReducer>

sagaMiddleware.run(watchCreateBoard)
sagaMiddleware.run(watchAddNewUser)
sagaMiddleware.run(watchSetUser)
sagaMiddleware.run(watchSetError)
sagaMiddleware.run(watchSetNewBoard)
sagaMiddleware.run(watchAddNewBoardCard)
sagaMiddleware.run(watchChangeBoardCard)
sagaMiddleware.run(watchAddNewBoardList)
sagaMiddleware.run(watchDeleteBoardList)
sagaMiddleware.run(watchMoveBoardTask)
sagaMiddleware.run(watchMoveBoardColumn)
sagaMiddleware.run(watchChangeBoardTitle)
sagaMiddleware.run(watchUpdateUserLink)
sagaMiddleware.run(watchOpenTaskInfo)

export default store
