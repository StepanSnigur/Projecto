import { PayloadAction } from '@reduxjs/toolkit'
import { trackedActions } from '../constants'

export const getActionDescription = (store: any, action: PayloadAction<any>) => {
  return trackedActions
    .find(actionDescription => actionDescription.type === action.type)!
    .getDescription(action, store)
}
