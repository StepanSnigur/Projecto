class Api {
  baseDBUrl: string
  baseSocketUrl: string

  constructor() {
    this.baseDBUrl = 'https://projecto-backend.herokuapp.com'
    this.baseSocketUrl = 'wss://projecto-backend.herokuapp.com/boardChat'
  }

  async makeRequest(url: string, params?: any, method = 'GET', token = '') {
    const query = {
      method,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(params)
    }
    const data = await fetch(url, query)
    const parsedData = await data.json()
    if (parsedData.message) throw new Error(parsedData.message)

    return parsedData
  }
}

export default Api
