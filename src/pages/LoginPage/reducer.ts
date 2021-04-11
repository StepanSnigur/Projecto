export interface ILoginPageReducer {
  isLoading: boolean
}
const initialState: ILoginPageReducer = {
  isLoading: false
}

const loginPageReducer = (state = initialState, action: any) => {
  switch (action.type) {
    default:
      return state
  }
}

export default loginPageReducer
