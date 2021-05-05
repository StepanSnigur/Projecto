import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const progressBarSlice = createSlice({
  name: 'progressBarSlice',
  initialState: {
    isLoading: false
  },
  reducers: {
    setProgressBarLoading(state, action: PayloadAction<boolean>) {
      return {
        ...state,
        isLoading: action.payload
      }
    }
  }
})

export const {
  setProgressBarLoading
} = progressBarSlice.actions
export default progressBarSlice.reducer
