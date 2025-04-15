import {get, post, put} from '@/utils/request';

export default class Account {
  // // 获取文章列表
  // static async getArticle(params) {
  //   return get('/blog/article/', params);
  // }
  // 用户登录
  static async postLogin(params) {
    return post('/account/login/', params)
  }

// 获取第三方登录ID
  static async getOAuthID(platform) {
    return get('/account/OAuthID/' + '?platform=' + platform + '&kind=M')
  }

// 第三方授权登录后回调
  static async postOAuthCallback(params) {
    return post('/account/OAuthCallback/', params)
  }

// 用户注册查询是否可用
  static async getRegister(username, contact) {
    console.log(username, contact)
    if (username) {
      return get('/account/register/' + '?username=' + username)
    } else {
      return get('/account/register/' + '?contact=' + contact)
    }
  }

// 用户注册
  static async postRegister(params) {
    console.log(params)
    return post('/account/register/', params)
  }

// 获取验证码
  static async postCode(params) {
    console.log(params)
    return post('/account/code/', params)
  }

// 重置密码
  static async postSetPassword(params) {
    console.log(params)
    return post('/account/setPassword/', params)
  }

// 修改密码
  static async putChangePassword(userId, params) {
    const url = '/account/changePassword/' + userId + '/'
    return put(url, params)
  }

// 查询指定用户信息
  static async getUserinfoId(userId) {
    return get('/account/userinfo/' + userId + '/')
  }

// 修改用户信息
  static async putUserinfoId(userId, params) {
    const url = '/account/userinfo/' + userId + '/'
    return put(url, params)
  }

// 修改用户邮箱
  static async putChangeEmail(userId, params) {
    const url = '/account/changeEmail/' + userId + '/'
    return put(url, params)
  }

// 修改用户手机
  static async putChangePhone(userId, params) {
    const url = '/account/changePhone/' + userId + '/'
    return put(url, params)
  }

}