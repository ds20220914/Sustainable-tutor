import axios from 'axios'

const baseUrl = '/api/generate'

export const generate = async (payload) => {
  const response = await axios.post(baseUrl, payload)
  return response.data
}

export default { generate }
