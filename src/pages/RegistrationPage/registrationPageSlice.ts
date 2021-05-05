import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface IRegistrationPage {
  isLoading: boolean,
  errors: string[] | null
}

const registrationPageSlice = createSlice({
  name: 'registrationPageSlice',
  initialState: {
    isLoading: false,
    errors: null
  } as IRegistrationPage,
  reducers: {
    initAddNewUser(state, action) {},
    setRegistrationPageLoading(state, action: PayloadAction<boolean>) {
      return {
        ...state,
        isLoading: action.payload
      }
    },
    setRegistrationInputErrors(state, action: PayloadAction<string[] | null>) {
      return {
        ...state,
        errors: action.payload
      }
    }
  }
})

export const {
  initAddNewUser,
  setRegistrationPageLoading,
  setRegistrationInputErrors
} = registrationPageSlice.actions
export default registrationPageSlice.reducer
