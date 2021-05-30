import index from './index'

// 获取文章分类
export function getCategory() {
  return index.get('category/')
}

// 获取文章详情
export function getArticleDetail(id) {
  return index.get('article/' + id + '/')
}

// 获取猜你喜欢列表
export function getGuessLike(id) {
  return index.get('guessLike/' + id + '/')
}
