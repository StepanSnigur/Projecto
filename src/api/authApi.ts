import app from 'firebase/app'
import { IUserData, IBoardLink } from '../common/user/userSlice'
import { ITableMember } from '../features/AddNewTable/AddNewTable'

const authApi = {
  async registerNewUser(email: string, password: string): Promise<IUserData> {
    const initialUserData = {
      nickName: email || '',
      email,
      registeredInBoards: [],
      icon: null
    }

    const userData = await app.auth().createUserWithEmailAndPassword(email, password)
    const userId = userData.user!.uid
    await app.firestore().collection('users').doc(userId).set(initialUserData)

    return {
      ...initialUserData,
      id: userId,
      email
    }
  },
  async getUserId(email: string, password: string) {
    const { user } = await app.auth().signInWithEmailAndPassword(email, password)
    return user?.uid
  },
  async getUser(userId: string) {
    const response = await app.firestore().collection('users').doc(userId).get()
    const userData = await response.data()
    return userData
  },
  async addTableToUser(userId: string, userBoards: IBoardLink[], tableId: string, tableName: string) {
    const newUserTable = {
      isAdmin: true,
      id: tableId,
      isPinned: false
    }
    const updatedUserBoards: IBoardLink[] = [...userBoards, newUserTable]
    await app.firestore().collection('users').doc(userId).update({
      registeredInBoards: updatedUserBoards
    })
    return updatedUserBoards
  },
  async addTableToUsers(users: ITableMember[], tableId: string, tableName: string) {
    const promisesStack: Promise<any>[] = []
    users.forEach(user => {
      promisesStack.push(app.firestore().collection('users').doc(user.id).update({
        registeredInBoards: app.firestore.FieldValue.arrayUnion({
          id: tableId,
          isAdmin: false
        })
      }))
    })
    return await Promise.all(promisesStack)
  }
}

export default authApi
