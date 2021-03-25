import { createStore, combineReducers, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import { watchAddNewUser } from '../pages/RegistrationPage/saga'
import userReducer from '../common/user/reducer'

import { watchSetError } from '../features/ErrorManager/saga'
import { errorManagerReducer } from '../features/ErrorManager'

import { registrationPageReducer } from '../pages/RegistrationPage'

import { watchSetNewBoard, watchAddNewBoardCard, watchAddNewBoardList } from '../pages/BoardPage/saga'
import { boardPageReducer } from '../pages/BoardPage'

import { progressBarReducer } from '../features/ProgressBar'

export const sagaMiddleware = createSagaMiddleware()
const rootReducer = combineReducers({
  user: userReducer,
  errorManager: errorManagerReducer,
  registrationPage: registrationPageReducer,
  boardPage: boardPageReducer,
  progressBar: progressBarReducer
})
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))
export type AppStateType = ReturnType<typeof rootReducer>

sagaMiddleware.run(watchAddNewUser)
sagaMiddleware.run(watchSetError)
sagaMiddleware.run(watchSetNewBoard)
sagaMiddleware.run(watchAddNewBoardCard)
sagaMiddleware.run(watchAddNewBoardList)

export default store
