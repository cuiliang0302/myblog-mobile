import index from './index'

// 获取轮播图
export function getCarousel() {
  return index.get('/management/carousel/')
}

// 获取关于页内容
export function getAbout() {
  return index.get('/management/about/')
}

// 获取友情链接内容
export function getLink() {
  return index.get('/management/link/')
}
// 申请友情链接
export function postLink(params) {
  return index.post('/management/link/',params)
}

// 获取博主信息
export function getInfo() {
  return index.get('/management/info/1/')
}

// 获取网站配置信息
export function getSiteConfig() {
  return index.get('/management/siteConfig/1/')
}

