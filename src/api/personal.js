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

// 用户注册
export function postRegister(params) {
  console.log(params)
  return index.post('register/', params)
}

// 获取验证码
export function postCode(params) {
  console.log(params)
  return index.post('code/', params)
}

// 查询指定用户信息
export function getUserinfoId(userId) {
  return index.get('userinfo/' + userId)
}

// 修改用户信息
export function putUserinfoId(userId, params) {
  const url = 'userinfo/' + userId + '/'
  return index.put(url, params)
}
