import axios from 'axios'
import {has} from 'ramda'
class Http {
  constructor (op) {
    has('baseURL', op) ? this.setBaseURL(op.baseURL) : alert('错误的Http初始数据配置: baseURL')
    has('timeout', op) ? this.setDefaultTimeout(op.timeout) : alert('错误的Http初始数据配置: timeout')
    this.token = ''
  }
  setBaseURL (url) {
    this.baseUrl = url
  }
  setDefaultTimeout (t) {
    axios.defaults.timeout = t * 1000
  }
  setToken (t) {
    this.token = t
  }
  getHeader (isPOST = false, isUpload = false) {
    let headers = {}
    headers['Content-Type'] = (isPOST && isUpload) ? 'application/x-www-form-urlencoded' : 'application/json'
    headers['Accept'] = 'application/json'
    headers['Authorization'] = this.token
    return headers
  }
  getFullURL (path) {
    return `${this.baseUrl}${path}`
  }
  get (path, data = '') {
    return axios.request({
      url: this.getFullURL(path),
      method: 'GET',
      headers: this.getHeader(),
      params: data
    })
  }
  post (path, data, isUpload = false) {
    return axios.request({
      url: this.getFullURL(path),
      method: 'POST',
      headers: this.getHeader(true, isUpload),
      data: data
    })
  }
  put (path, data) {
    return axios.request({
      url: this.getFullURL(path),
      method: 'PUT',
      data: data,
      headers: this.getHeader()
    })
  }
  patch (path, data) {
    return axios.request({
      url: this.getFullURL(path),
      method: 'PATCH',
      data: data,
      headers: this.getHeader()
    })
  }
  delete (path, data) {
    return axios.request({
      url: this.getFullURL(path),
      method: 'DELETE',
      data: data,
      headers: this.getHeader()
    })
  }
}

export default Http
