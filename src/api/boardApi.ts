import Api from './apiConfig'
import { IBoardSettings } from '../pages/BoardPage/boardPageSlice'
import { ITableMember } from '../features/AddNewTable/AddNewTable'

class BoardApi extends Api {
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
    console.log(userId, boardId, 'delete')
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
}

export default new BoardApi()
