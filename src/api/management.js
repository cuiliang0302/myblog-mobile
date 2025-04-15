import {get, post} from '@/utils/request';

export default class Management {
  // 获取网站配置信息
  static async getSiteConfig() {
    return get('/management/siteConfig/1/', {});
  }

  // 获取轮播图
  static async getCarousel() {
    return get('/management/carousel/', {});
  }

  // 获取友情链接内容
  static async getLink() {
    return get('/management/link/')
  }

// 申请友情链接
  static async postLink(params) {
    return post('/management/link/', params)
  }

// 获取博主信息
  static async getInfo() {
    return get('/management/info/1/')
  }

  // 获取关于页内容
  static async getAbout() {
    return get('/management/about/')
  }
}