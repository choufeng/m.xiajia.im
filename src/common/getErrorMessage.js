// 模块功能
// 实现对错误输入的处理。解析出统一的输出内容和statuscode
import {isNil} from 'ramda';

const getErrorMessage = (err) => {
  const _showNetworkError = () => '网络中断';
  const _showError = (err) => {
    return isNil(err.response.data) ? '未知错误，操作未能执行成功!' : err.response.data.message
  }
  return isNil(err.response) ? _showNetworkError() : _showError(err)
}

export default getErrorMessage
