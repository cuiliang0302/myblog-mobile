import http from './http'
// 获取轮播图
export function getCarousel(){
  return http.get('carousel/')
}
