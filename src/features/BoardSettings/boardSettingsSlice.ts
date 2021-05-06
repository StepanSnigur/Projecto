import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface IBoardSettingsSlice {
  isOpen: boolean
}

const boardSettingsSlice = createSlice({
  name: 'boardSettingsSlice',
  initialState: {
    isOpen: false
  } as IBoardSettingsSlice,
  reducers: {
    setBoardSettingsOpen(state, action: PayloadAction<boolean>) {
      return {
        ...state,
        isOpen: action.payload
      }
    }
  }
})

export const {
  setBoardSettingsOpen
} = boardSettingsSlice.actions
export default boardSettingsSlice.reducer
