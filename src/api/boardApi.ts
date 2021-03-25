import app from 'firebase/app'
import { IBoardTask } from '../pages/BoardPage/reducer'

const boardApi = {
  async getBoard(boardId: string) {
    const board = await app.firestore().collection('boards').doc(boardId).get()
    return board.data()
  },
  async addNewCard(boardId: string, columnId: string, newCard: IBoardTask) {
    const board = await app.firestore().collection('boards').doc(boardId).get()
    const boardData = await board.data()
    const updatedLists = [...boardData!.lists]
    const listToUpdateId = updatedLists.findIndex((list) => list.id === columnId)
    updatedLists[listToUpdateId] = {
      tasks: [
        ...updatedLists[listToUpdateId].tasks,
        newCard
      ]
    }
    console.log(updatedLists, 'lists')
    await app.firestore().collection('boards').doc(boardId).update({
      lists: updatedLists
    })
  }
}

export default boardApi
