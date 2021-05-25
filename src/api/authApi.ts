import Api from './apiConfig'
import { IUserData } from '../common/user/userSlice'
import { ITableMember } from '../features/AddNewTable/AddNewTable'

class AuthApi extends Api {
  registerNewUser = async (email: string, password: string): Promise<IUserData> => {
    const userData = await this.makeRequest(`${this.baseDBUrl}/auth/registration`, {
      email,
      password
    }, 'POST')

    return userData
  }

  async addTableToUsers(users: ITableMember[], tableId: string, tableName: string) {}

  addTableToUser = async (
    userId: string,
    userName: string,
    boardId: string,
    role: string,
    token: string
  ) => {
    return await this.makeRequest(`${this.baseDBUrl}/board/addUser`, {
      boardId,
      userId,
      role,
      name: userName
    }, 'POST', token)
  }

  getUser = async (email: string, password: string) => {
    return await this.makeRequest(`${this.baseDBUrl}/auth/login`, {
      email,
      password
    }, 'POST')
  }
}

export default new AuthApi()
