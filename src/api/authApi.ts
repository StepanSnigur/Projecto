import app from 'firebase/app'
import { IUserData } from '../common/user/reducer'

const authApi = {
  async registerNewUser(email: string, password: string): Promise<IUserData> {
    const initialUserData = {
      nickName: email || '',
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
  async getUser(userId: string) {
    const response = await app.firestore().collection('users').doc(userId).get()
    const userData = await response.data()
    return userData
  }
}

export default authApi
