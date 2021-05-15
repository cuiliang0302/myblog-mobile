import http from './http'

// 获取轮播图
export function getCarousel() {
  return http.get('carousel/')
}

// 获取文章列表
export function getArticle(page = 1, order = '-created_time') {
  console.log(page, order)
  return http.get('article/' + '?size=5&page=' + page + '&ordering=' + order)
}
