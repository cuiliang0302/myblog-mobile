import index from './index'

// 用户登录
export function postLogin(params) {
  return index.post('/account/login/', params)
}
// 获取第三方登录ID
export function getOAuthID(platform) {
  return index.get('/account/OAuthID/' + '?platform=' + platform + '&kind=M')
}
// 第三方授权登录后回调
export function postOAuthCallback(params) {
  return index.post('/account/OAuthCallback/', params)
}
// 用户注册查询是否可用
export function getRegister(username, contact) {
  console.log(username, contact)
  if (username) {
    return index.get('/account/register/' + '?username=' + username)
  } else {
    return index.get('/account/register/' + '?contact=' + contact)
  }
}

// 用户注册
export function postRegister(params) {
  console.log(params)
  return index.post('/account/register/', params)
}

// 获取验证码
export function postCode(params) {
  console.log(params)
  return index.post('/account/code/', params)
}

// 重置密码
export function postSetPassword(params) {
  console.log(params)
  return index.post('/account/setPassword/', params)
}

// 修改密码
export function putChangePassword(userId, params) {
  const url = '/account/changePassword/' + userId + '/'
  return index.put(url, params)
}

// 查询指定用户信息
export function getUserinfoId(userId) {
  return index.get('/account/userinfo/' + userId + '/')
}

// 修改用户信息
export function putUserinfoId(userId, params) {
  const url = '/account/userinfo/' + userId + '/'
  return index.put(url, params)
}

// 修改用户邮箱
export function putChangeEmail(userId, params) {
  const url = '/account/changeEmail/' + userId + '/'
  return index.put(url, params)
}

// 修改用户手机
export function putChangePhone(userId, params) {
  const url = '/account/changePhone/' + userId + '/'
  return index.put(url, params)
}
