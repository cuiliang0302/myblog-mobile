import http from './http'

// 获取文章分类
export function getCategory() {
  return http.get('category/')
}

// 获取文章详情
export function getArticleInfo(id) {
  return http.get('article/' + id + '/')
}
