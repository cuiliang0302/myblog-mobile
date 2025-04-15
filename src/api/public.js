import {get, post} from '@/utils/request';

export default class Public {
  /**
   * 登录
   * @param {String} username 用户名
   * @param {String} password 密码
   * @returns
   */
  static async login(username, password) {
    return post('/account/login/', {
      username,
      password,
    });
  }

  // 获取七牛图片上传token
  static async getQiNiuToken() {
    return get('/public/qiniuToken/')
  }

// 获取省市代码
  static async getAreaData() {
    return get('/public/areaData/')
  }
}
