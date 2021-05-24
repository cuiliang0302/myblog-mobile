import index from './index'

// 用户登录
export function postLogin(params) {
  return index.post('login/', params)
}

// 用户注册查询是否可用
export function getRegister(username, contact) {
  console.log(username, contact)
  if (username) {
    return index.get('register/' + '?username=' + username)
  } else {
    return index.get('register/' + '?contact=' + contact)
  }
}
