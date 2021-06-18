import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface IChatMessage {
  sender: string,
  sendedAt: string,
  content: string,
  _id: string
}
export interface IBoardPageChatReducer {
  isOpen: boolean,
  error: string | null,
  isLoading: boolean,
  messages: IChatMessage[]
}

const boardChatSlice = createSlice({
  name: 'boardChat',
  initialState: {
    isOpen: false,
    error: null,
    isLoading: false,
    messages: []
  } as IBoardPageChatReducer,
  reducers: {
    setBoardChatLoading(state, action: PayloadAction<boolean>) {
      return {
        ...state,
        isLoading: action.payload
      }
    },
    initSetBoardChatOpen() {},
    setBoardChatOpen(state, action: PayloadAction<boolean>) {
      return {
        ...state,
        isOpen: action.payload
      }
    },
    setBoardChatData(state, action: PayloadAction<IChatMessage[]>) {
      return {
        ...state,
        messages: action.payload,
        isOpen: true,
        error: null
      }
    },
    initSendMessage(state, action) {},
    sendMessage(state, action: PayloadAction<IChatMessage>) {
      return {
        ...state,
        messages: [...state.messages, action.payload]
      }
    }
  }
})

export const {
  setBoardChatLoading,
  initSetBoardChatOpen,
  setBoardChatOpen,
  initSendMessage,
  sendMessage,
  setBoardChatData
} = boardChatSlice.actions
export default boardChatSlice.reducer
