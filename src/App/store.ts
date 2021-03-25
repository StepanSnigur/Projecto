import { createStore, combineReducers, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import { watchAddNewUser } from '../pages/RegistrationPage/saga'
import userReducer from '../common/user/reducer'

import { watchSetError } from '../features/ErrorManager/saga'
import { errorManagerReducer } from '../features/ErrorManager'

import { registrationPageReducer } from '../pages/RegistrationPage'

import { watchSetNewBoard, watchAddNewBoardCard } from '../pages/BoardPage/saga'
import { boardPageReducer } from '../pages/BoardPage'

export const sagaMiddleware = createSagaMiddleware()
const rootReducer = combineReducers({
  user: userReducer,
  errorManager: errorManagerReducer,
  registrationPage: registrationPageReducer,
  boardPage: boardPageReducer
})
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))
export type AppStateType = ReturnType<typeof rootReducer>

sagaMiddleware.run(watchAddNewUser)
sagaMiddleware.run(watchSetError)
sagaMiddleware.run(watchSetNewBoard)
sagaMiddleware.run(watchAddNewBoardCard)

export default store
