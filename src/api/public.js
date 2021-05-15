import http from './http'

// 获取文章详情
export function getArticleDetail(id) {
  return http.get('article/' + id + '/')
}
