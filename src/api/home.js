import http from './http'
// 获取轮播图
export function getCarousel(){
  return http.get('carousel/')
}
// 获取文章列表
export function getArticle(){
  return http.get('article/')
}
