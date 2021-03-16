export interface IUserData {
  email: string,
  nickName: string,
  registeredInBoards: any[],
  id: string,
  icon: string | null,
}
const initialState: IUserData = {
  email: '',
  nickName: '',
  registeredInBoards: [],
  id: '',
  icon: null
}

const userReducer = (state = initialState, action: any): IUserData => {
  switch(action.type) {
    default:
      return state
  }
}

export default userReducer
