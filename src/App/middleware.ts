import { Middleware } from 'redux'
import { initAddBoardAction } from '../pages/BoardPage/boardPageSlice'
import { getActionDescription } from '../common/utils/saveMiddlewareUtils'


export const saveActionsMiddleware = (actionsToTrack: string[]): Middleware => {
  return (store) => (next) => (action) => {
    if (actionsToTrack.includes(action.type)) {
      const userEmail = store.getState().user.email
      store.dispatch(initAddBoardAction({
        producedAt: new Date().toLocaleDateString(),
        producedBy: userEmail,
        action: getActionDescription(store, action)
      }))
    }
    return next(action)
  }
}
