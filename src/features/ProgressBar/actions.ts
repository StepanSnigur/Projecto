export const SET_PROGRESS_BAR_LOADING = 'PROGRESS_BAR/SET_LOADING'
export const setProgressBarLoading = (isLoading: boolean) => ({
  type: SET_PROGRESS_BAR_LOADING,
  payload: isLoading
})
