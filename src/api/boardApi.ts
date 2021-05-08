import app from 'firebase/app'
import { IBoardTask, IBoardList, IBoardPage, IBoardSettings } from '../pages/BoardPage/boardPageSlice'
import { ITableMember } from '../features/AddNewTable/AddNewTable'
import { IBoardLink } from '../common/user/userSlice'
import authApi from './authApi'
import { getArrayIds } from './utils'
import { DEFAULT_BOARD_SETTINGS } from '../features/AddNewTable/constants'


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
      name,
      settings: {
        ...DEFAULT_BOARD_SETTINGS
      }
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
  },
  async changeTaskData(
    boardId: string,
    listId: string,
    taskId: string,
    newTitle: string,
    newDescription: string,
    oldLists: IBoardList[]
  ) {
    const newLists = [...oldLists]
    const listToChange = newLists.findIndex(list => list.id === listId)
    const taskToChange = newLists[listToChange].tasks.findIndex(task => task.id === taskId)
    const newTasks = [...newLists[listToChange].tasks]
    newTasks[taskToChange] = {
      ...newTasks[taskToChange],
      name: newTitle,
      description: newDescription
    }
    newLists[listToChange] = {
      ...newLists[listToChange],
      tasks: newTasks
    }
    await app.firestore().collection('boards').doc(boardId).update({
      lists: newLists
    })
  },
  async saveBoardSettings(boardId: string, newSettings: IBoardSettings) {
    return await app.firestore().collection('boards').doc(boardId).update({
      settings: newSettings
    })
  },
  async addBoardToUser(boardId: string, userId: string) {
    const user = await app.firestore().collection('users').doc(userId).get()
    const userData = user.data()
    if (!userData?.email) throw new Error('Пользователь не найден')
    if (userData
      .registeredInBoards
      .some((board: IBoardPage) => board.id === boardId)
    ) throw new Error('Этот человек уже добавлен')

    return await app.firestore().collection('users')
      .doc(userId)
      .update({
        registeredInBoards: [
          ...userData?.registeredInBoards,
          { id: boardId, isAdmin: false }
        ]
      })
  },
  async addNewMember(boardId: string, userId: string, userEmail: string) {
    const board = await app.firestore().collection('boards').doc(boardId).get()
    const boardData = board.data()
    if (!boardData?.name) throw new Error('Что-то пошло не так')
    if (boardData
      .assignedUsers
      .some((user: ITableMember) => user.id === userId)
    ) throw new Error('Этот человек уже добавлен')

    return await app.firestore().collection('boards').doc(boardId).update({
      assignedUsers: [
        ...boardData?.assignedUsers,
        { id: userId, name: userEmail }
      ]
    })
  }
}

export default boardApi
