class Api {
  baseDBUrl: string

  constructor() {
    this.baseDBUrl = 'https://projecto-backend.herokuapp.com'
  }

  async makeRequest(url: string, params?: any, method = 'GET', token = '') {
    const data = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(params)
    })
    const parsedData = await data.json()
    if (parsedData.message) throw new Error(parsedData.message)

    return parsedData
  }
}

export default Api
