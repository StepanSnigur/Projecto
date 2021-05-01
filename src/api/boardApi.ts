import app from 'firebase/app'
import { IBoardTask, IBoardList, IBoardPage } from '../pages/BoardPage/reducer'
import { ITableMember } from '../features/AddNewTable/AddNewTable'
import { IBoardLink } from '../common/user/reducer'
import authApi from './authApi'
import { getArrayIds } from './utils'

const boardApi = {
  async getBoard(boardId: string) {
    const board = await app.firestore().collection('boards').doc(boardId).get()
    const boardData = board.data()
    boardData!.id = board.id
    return boardData
  },
  async addNewCard(boardId: string, columnId: string, newCard: IBoardTask) {
    const board = await app.firestore().collection('boards').doc(boardId).get()
    const boardData = await board.data()
    const updatedLists = [...boardData!.lists]
    const listToUpdateId = updatedLists.findIndex((list) => list.id === columnId)
    updatedLists[listToUpdateId] = {
      ...updatedLists[listToUpdateId],
      tasks: [
        ...updatedLists[listToUpdateId].tasks,
        newCard
      ]
    }
    await app.firestore().collection('boards').doc(boardId).update({
      lists: updatedLists
    })
  },
  async addNewList(list: IBoardList, boardId: string) {
    const board = await app.firestore().collection('boards').doc(boardId).get()
    const boardData = await board.data()
    const lists = [...boardData!.lists]
    await app.firestore().collection('boards').doc(boardId).update('lists', [...lists, list])
  },
  async searchUsers(term: string) {
    const searchedUsers: ITableMember[] = []
    const snapshot = await app.firestore().collection('users').where('email', '==', term).get()
    snapshot.forEach(doc => {
      const user: ITableMember = {
        name: doc.data().email,
        id: doc.id
      }
      searchedUsers.push(user)
    })
    return searchedUsers
  },
  async createBoard(
    name: string,
    members: ITableMember[],
    userBoards: IBoardLink[],
    userEmail: string,
    userId: string
  ) {
    if (!userId) throw new Error('Вы не в сети')
    const tableCreator = {
      name: userEmail,
      id: userId
    }
    const assignedUsers = [tableCreator, ...members]

    const newBoard: IBoardPage = {
      backgroundImage: '#fff',
      lists: [],
      actions: [],
      assignedUsers,
      name
    }
    const table = await app.firestore().collection('boards').add(newBoard)

    const updatedUserTables = await authApi.addTableToUser(userId, userBoards, table.id, name)
    await authApi.addTableToUsers(members, table.id, name)

    return {
      newBoard: Object.assign(newBoard, {
        id: table.id
      }),
      updatedUserTables
    }
  },
  async changeBoardTitle(boardId: string, newTitle: string) {
    return await app.firestore().collection('boards').doc(boardId).update({
      name: newTitle
    })
  },
  async checkCanEdit(userId: string, boardId: string) {
    const board = await app.firestore().collection('boards').doc(boardId).get()
    const boardData = board.data()
    return boardData!.assignedUsers.map(getArrayIds).includes(userId)
  }
}

export default boardApi
