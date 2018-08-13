import Http from './http'
import config from '../config.json'

const options = {
  baseURL: config.apiURL,
  timeout: config.timeout
}
const api = new Http(options)
export default api
