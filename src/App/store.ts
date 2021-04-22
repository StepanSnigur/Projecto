import { createStore, combineReducers, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import { watchAddNewUser } from '../pages/RegistrationPage/saga'
import { watchSetUser } from '../common/user/saga'
import userReducer from '../common/user/reducer'

import { watchSetError } from '../features/ErrorManager/saga'
import { errorManagerReducer } from '../features/ErrorManager'

import { registrationPageReducer } from '../pages/RegistrationPage'
import { addNewTableReducer } from '../features/AddNewTable'

import {
  watchCreateBoard,
  watchSetNewBoard,
  watchAddNewBoardCard,
  watchAddNewBoardList,
  watchDeleteBoardList,
  watchMoveBoardTask,
  watchMoveBoardColumn,
  watchChangeBoardTitle
} from '../pages/BoardPage/saga'
import { boardPageReducer } from '../pages/BoardPage'

import { progressBarReducer } from '../features/ProgressBar'
import sidebarReducer from '../features/Sidebar/reducer'
import { watchUpdateUserLink } from '../features/Sidebar/saga'

export const sagaMiddleware = createSagaMiddleware()
const rootReducer = combineReducers({
  user: userReducer,
  errorManager: errorManagerReducer,
  registrationPage: registrationPageReducer,
  boardPage: boardPageReducer,
  progressBar: progressBarReducer,
  addNewTable: addNewTableReducer,
  sidebar: sidebarReducer
})
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))
export type AppStateType = ReturnType<typeof rootReducer>

sagaMiddleware.run(watchCreateBoard)
sagaMiddleware.run(watchAddNewUser)
sagaMiddleware.run(watchSetUser)
sagaMiddleware.run(watchSetError)
sagaMiddleware.run(watchSetNewBoard)
sagaMiddleware.run(watchAddNewBoardCard)
sagaMiddleware.run(watchAddNewBoardList)
sagaMiddleware.run(watchDeleteBoardList)
sagaMiddleware.run(watchMoveBoardTask)
sagaMiddleware.run(watchMoveBoardColumn)
sagaMiddleware.run(watchChangeBoardTitle)
sagaMiddleware.run(watchUpdateUserLink)

export default store
