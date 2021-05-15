import http from './http'

// 获取文章分类
export function getCategory() {
  return http.get('category/')
}
