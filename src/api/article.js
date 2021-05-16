import http from './http'

// 获取文章分类
export function getCategory() {
  return http.get('category/')
}

// 获取文章详情
export function getArticleDetail(id) {
  return http.get('article/' + id + '/')
}
// 获取猜你喜欢列表
export function getGuessLike(id) {
  return http.get('guessLike?article_id=' + id)
}
