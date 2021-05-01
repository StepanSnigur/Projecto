export const INIT_TASK_INFO_OPEN = 'TASK_INFO/INIT_OPEN'
export const initTaskInfoOpen = (isOpen: boolean, title: string, id: string) => ({
  type: INIT_TASK_INFO_OPEN,
  payload: {
    isOpen,
    title,
    id
  }
})
export const SET_TASK_INFO_OPEN = 'TASK_INFO/SET_OPEN'
export const setTaskInfoOpen = (
  isOpen: boolean,
  title: string = '',
  id: string = '',
  canEdit: boolean = false
) => ({
  type: SET_TASK_INFO_OPEN,
  payload: {
    isOpen,
    title,
    id,
    canEdit
  }
})
export const SET_TASK_INFO_LOADING = 'TASK_INFO/SET_LOADING'
export const setTaskInfoLoading = (isLoading: boolean) => ({
  type: typeof SET_TASK_INFO_LOADING,
  payload: isLoading
})
