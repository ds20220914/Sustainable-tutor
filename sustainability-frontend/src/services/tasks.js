import axios from 'axios'
const baseUrl = '/api/tasks'

let token = null

const setToken = (newToken) => {
  token = newToken ? `Bearer ${newToken}` : null
}



const create = async (newObject) => {
  const config = token ? { headers: { Authorization: token } } : {}
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

export default { create, setToken }
