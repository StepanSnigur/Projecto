import app from 'firebase/app'

const boardApi = {
  async getBoard(boardId: string) {
    const board = await app.firestore().collection('boards').doc(boardId).get()
    const boardData = board.data()
    return boardData
  }
}

export default boardApi
