export const FIRE_SET_ERROR = 'FIRE_SET_ERROR'
export const fireSetError = (error: string) => ({
  type: FIRE_SET_ERROR,
  payload: error
})

export const SET_ERROR = 'SET_ERROR'
export const setErrorCreator = (error: string) => ({
  type: SET_ERROR,
  payload: error
})
