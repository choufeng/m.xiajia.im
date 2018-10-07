import validator from 'validator';
import * as R from 'ramda';

class verifyForm {
  verify(value, rules) {
    const _item = (a, item) => {
      // 判断是否复核条件，给a加入提示内容
      const result = this.verifyItem(value, item)
      return R.isNil(result) ? a : R.append(result, a)
    }
    return R.reduce(_item, [], R.toPairs(rules))
  }
  isError(value, rules) {
    return R.complement(R.isEmpty)(this.verify(value, rules))
  }
  getMessage(value, rules) {
    return this.verify(value, rules)
  }
  verifyItem(value, rule) {
    // switch (rule[0]) {
    //   case 'isRequired':
    //     return validator.isEmpty(value)
    //   case 'isEmail':
    //     return this.isEmail(value)
    //   default:
    //     break;
    // }
    // const testit = (a, b) => {
    //   console.log('test', a, b)
    //   return 'hhhhhh'
    // }
    // const isEmail = (value, isTrue) => {
    //   console.log('test -isemail')
    //   return validator.isEmail(value) ? '' : 'Email有误'
    // }
    // const isRequired = (value) => {
    //   console.log('test -isrequ')
    //   // return validator.isEmpty(value) ? '必须填写' : ''
    // }
    // const max = (value, maxValue) => {
    //   console.log('test -max')
    //   return R.gt(value, maxValue) ? '超过最大值' : ''
    // }
    // const goo = R.invoker(2, rule[0])
    // const result = goo(value, rule[1])
    // console.log('result invoker', result)
    // return result('1','3')
    // return goo(rule[1], value)
    return null
  }
}

export default new verifyForm()
