import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const addNewTableSlice = createSlice({
  name: 'addNewTableSlice',
  initialState: {
    isOpen: false
  },
  reducers: {
    openAddNewTableWindow(state, action: PayloadAction<boolean>) {
      return {
        ...state,
        isOpen: action.payload
      }
    }
  }
})

export const {
  openAddNewTableWindow
} = addNewTableSlice.actions
export default addNewTableSlice.reducer
