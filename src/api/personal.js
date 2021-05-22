import index from './index'

// 用户登录
export function postLogin(params) {
  return index.post('login/', params)
}
