export const SET_ADD_NEW_TABLE_WINDOW = 'ADD_NEW_TABLE/SET_IS_OPEN'
export const openAddNewTableWindow = (isOpen: boolean) => ({
  type: SET_ADD_NEW_TABLE_WINDOW,
  payload: isOpen
})
