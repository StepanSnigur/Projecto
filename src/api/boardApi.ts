import Api from './apiConfig'
import { IBoardAction, IBoardSettings } from '../pages/BoardPage/boardPageSlice'
import { ITableMember } from '../features/AddNewTable/AddNewTable'
import { IDropResult } from '../pages/BoardPage/BoardPage'
import { IChatMessage } from '../features/BoardChat/boardChatSlice'

class BoardApi extends Api {
  chatSocket: WebSocket | null
  constructor() {
    super()
    this.chatSocket = null
  }
  connectToChat = (id: string, boardId: string) => {
    this.chatSocket && this.disconnectFromChat()
    this.chatSocket = new WebSocket(`${this.baseSocketUrl}?id=${id}&boardId=${boardId}`)
    return this.chatSocket
  }
  sendChatMessage = (msg: Partial<IChatMessage>) => {
    this.chatSocket && this.chatSocket.send(JSON.stringify(msg))
  }
  disconnectFromChat = () => {
    this.chatSocket && this.chatSocket.close()
    this.chatSocket = null
  }


  getBoard = async (boardId: string, token: string) => {
    return await this.makeRequest(
      `${this.baseDBUrl}/board/`,
      {
        boardId
      },
      'POST',
      token
    )
  }

  searchUsers = async (term: string, token: string) => {
    return await this.makeRequest(`${this.baseDBUrl}/board/searchUsers`, { term }, 'POST', token)
  }

  addNewCard = async (
    boardId: string,
    listId: string,
    createdAt: string,
    cardName: string,
    token: string
  ) => {
    return await this.makeRequest(`${this.baseDBUrl}/board/createTask`, {
      boardId,
      listId,
      createdAt,
      taskName: cardName
    }, 'POST', token)
  }

  addNewList = async (boardId: string, listName: string, token: string) => {
    return await this.makeRequest(`${this.baseDBUrl}/board/createList`, {
      boardId,
      listName
    }, 'POST', token)
  }

  createBoard = async (
    name: string,
    members: ITableMember[],
    backgroundImage: string,
    token: string
  ) => {
    return await this.makeRequest(`${this.baseDBUrl}/board/create`, {
      name,
      members,
      backgroundImage
    }, 'POST', token)
  }

  changeBoardTitle = async (boardId: string, newTitle: string, token: string) => {
    return await this.makeRequest(`${this.baseDBUrl}/board/changeName`, {
      boardId,
      newBoardName: newTitle
    }, 'POST', token)
  }

  changeTaskData = async (
    boardId: string,
    listId: string,
    taskId: string,
    newTitle: string,
    newDescription: string,
    token: string
  ) => {
    return await this.makeRequest(`${this.baseDBUrl}/board/changeTaskData`, {
      boardId,
      listId,
      taskId,
      newTitle,
      newDescription
    }, 'POST', token)
  }

  saveBoardSettings = async (boardId: string, newSettings: IBoardSettings, token: string) => {
    return await this.makeRequest(`${this.baseDBUrl}/board/setBoardSettings`, {
      boardId,
      newSettings
    }, 'POST', token)
  }

  addNewMember = async (boardId: string, userId: string, userName: string) => {
    return await this.makeRequest(`${this.baseDBUrl}/board/addUser`, {
      boardId,
      userId,
      name: userName
    }, 'POST')
  }

  deleteBoardMember = async (boardId: string, userId: string) => {}

  pinBoard = async (userId: string, boardId: string, isPinned: boolean, token: string) => {
    return await this.makeRequest(`${this.baseDBUrl}/board/pin`, {
      userId,
      boardId,
      isPinned
    }, 'POST', token)
  }

  deleteBoard = async (boardId: string, token: string) => {
    return await this.makeRequest(`${this.baseDBUrl}/board/delete`, {
      boardId
    }, 'POST', token)
  }
  deleteBoardFromUser = async (userId: string, boardId: string, token: string) => {
    const deleteMemberRes = await this.makeRequest(`${this.baseDBUrl}/board/deleteMember`, {
      boardId,
      memberId: userId
    }, 'POST', token)
    const removeBoardRes = await this.makeRequest(`${this.baseDBUrl}/auth/removeBoard`, {
      boardId,
      memberId: userId
    }, 'POST', token)
    return {
      ...deleteMemberRes,
      ...removeBoardRes
    }
  }

  moveBoardTask = async (boardId: string, source: IDropResult, destination: IDropResult, token: string) => {
    return await this.makeRequest(`${this.baseDBUrl}/board/move/task`, {
      boardId,
      source,
      destination
    }, 'POST', token)
  }
  moveBoardColumn = async (boardId: string, source: IDropResult, destination: IDropResult, token: string) => {
    return await this.makeRequest(`${this.baseDBUrl}/board/move/column`, {
      boardId,
      source,
      destination
    }, 'POST', token)
  }

  addBoardAction = async (boardId: string, action: IBoardAction, token: string) => {
    return await this.makeRequest(
      `${this.baseDBUrl}/board/addAction`,
      {
        boardId,
        action
      },
      'POST',
      token
    )
  }

  changeTaskStatus = async (
    boardId: string,
    listId: string,
    taskId: string,
    isCompleted: boolean,
    token: string
  ) => {
    return await this.makeRequest(`${this.baseDBUrl}/board/changeTaskStatus`, {
      boardId,
      listId,
      taskId,
      isCompleted
    }, 'POST', token)
  }

  getChatMessages = async (boardId: string, token: string) => {
    return await this.makeRequest(`${this.baseDBUrl}/board/getChatMessages`, {
      boardId
    }, 'POST', token)
  }

  // sendChatMessage = async (boardId: string, message: Partial<IChatMessage>, token: string) => {
  //   return await this.makeRequest(`${this.baseDBUrl}/board/sendChatMessage`, {
  //     boardId,
  //     message
  //   }, 'POST', token)
  // }
}

export default new BoardApi()
