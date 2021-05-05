import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const errorManagerSlice = createSlice({
  name: 'errorManagerSlice',
  initialState: {
    error: ''
  },
  reducers: {
    fireSetError(state, action) {},
    setError(state, action: PayloadAction<string>) {
      return {
        ...state,
        error: action.payload
      }
    }
  }
})

export const {
  fireSetError,
  setError
} = errorManagerSlice.actions
export default errorManagerSlice.reducer
