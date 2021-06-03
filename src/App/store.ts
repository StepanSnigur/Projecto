import { configureStore, combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import { saveActionsMiddleware } from './middleware'

import { watchAddNewUser } from '../pages/RegistrationPage/saga'
import { watchSetUser } from '../common/user/saga'
import userReducer from '../common/user/userSlice'

import errorManagerReducer from '../features/ErrorManager/errorManagerSlice'
import { watchSetError } from '../features/ErrorManager/saga'

import registrationPageReducer from '../pages/RegistrationPage/registrationPageSlice'
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
  watchChangeBoardCard,
  watchSaveBoardPageSettings,
  watchAddUserToBoard,
  watchDeleteBoardMember,
  watchAddBoardAction
} from '../pages/BoardPage/saga'
import boardPageReducer from '../pages/BoardPage/boardPageSlice'

import progressBarReducer from '../features/ProgressBar/progressBarSlice'
import sidebarReducer from '../features/Sidebar/sidebarSlice'
import {
  watchUpdateUserLink,
  watchPinBoard,
  watchDeleteBoard,
  watchDeleteBoardFromUser
} from '../features/Sidebar/saga'

import taskInfoReducer from '../features/TaskInfo/taskInfoSlice'
import { watchOpenTaskInfo } from '../features/TaskInfo/saga'
import sidebarSpinnerReducer from '../features/SidebarSpinner/sidebarSpinnerSlice'
import boardSettingsReducer from '../features/BoardSettings/boardSettingsSlice'
import { trackedActions } from '../common/constants'

export const sagaMiddleware = createSagaMiddleware()
const rootReducer = combineReducers({
  user: userReducer,
  errorManager: errorManagerReducer,
  registrationPage: registrationPageReducer,
  boardPage: boardPageReducer,
  progressBar: progressBarReducer,
  addNewTable: addNewTableReducer,
  sidebar: sidebarReducer,
  taskInfo: taskInfoReducer,
  sidebarSpinner: sidebarSpinnerReducer,
  boardSettings: boardSettingsReducer
})
const store = configureStore({
  reducer: rootReducer,
  middleware: [
    ...getDefaultMiddleware({ thunk: false }),
    sagaMiddleware,
    saveActionsMiddleware(trackedActions.map(action => action.type))
  ]
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
sagaMiddleware.run(watchSaveBoardPageSettings)
sagaMiddleware.run(watchAddUserToBoard)
sagaMiddleware.run(watchDeleteBoardMember)
sagaMiddleware.run(watchPinBoard)
sagaMiddleware.run(watchDeleteBoard)
sagaMiddleware.run(watchDeleteBoardFromUser)
sagaMiddleware.run(watchAddBoardAction)

export default store
