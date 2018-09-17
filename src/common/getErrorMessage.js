// 模块功能
// 实现对错误输入的处理。解析出统一的输出内容和statuscode
import {has, ifElse, isNil} from 'ramda';

const getErrorMessage = (err) => {
  console.log('err:', has('response')(err))
  console.log('err.response:', err.response)
  const _showNetworkError = () => '网络中断';
  const _showError = (err) => {
    console.log('res:', err.response)
    return has('data')(err.response) ? err.response.data.message : '未知错误，操作未能执行成功!'
  }
  return ifElse(has('response'), _showError, _showNetworkError)(err)
  // return isNil('response', err) ? _showNetworkError() : _showError(err)
}

export default getErrorMessage
