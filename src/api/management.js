import index from './index'

// 获取轮播图
export function getCarousel() {
  return index.get('management/carousel/')
}

// 获取关于页内容
export function getAbout() {
  return index.get('management/about/')
}

// 获取友情链接内容
export function getLink() {
  return index.get('management/link/')
}

