import { AppStateType } from '../../App/store'

export const getUserState = (state: AppStateType) => state.user
export const getUserId = (state: AppStateType) => state.user._id
export const getToken = () => localStorage.getItem('token')
