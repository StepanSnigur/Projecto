import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const sidebarSpinnerSlice = createSlice({
  name: 'sidebarSpinnerSlice',
  initialState: false,
  reducers: {
    setSidebarSpinnerLoading(state, action: PayloadAction<boolean>) {
      return action.payload
    }
  }
})

export const {
  setSidebarSpinnerLoading
} = sidebarSpinnerSlice.actions
export default sidebarSpinnerSlice.reducer
