import index from './index'
// 获取文章列表
export function getArticle(page = 1, order = '-created_time', category) {
  if (category) {
    return index.get('blog/article/' + '?size=5&page=' + page + '&ordering=' + order + '&category=' + category)
  } else {
    return index.get('blog/article/' + '?size=5&page=' + page + '&ordering=' + order)
  }
}

// 获取文章分类
export function getCategory() {
  return index.get('blog/category/')
}

// 获取文章详情
export function getArticleDetail(id) {
  return index.get('blog/article/' + id + '/')
}

// 获取猜你喜欢列表
export function getGuessLike(id) {
  return index.get('blog/guessLike/' + id + '/')
}

// 获取笔记名称列表
export function getNote() {
  return index.get('blog/note/')
}

// 获取笔记内容详情
export function getSectionDetail(id) {
  return index.get('blog/section/' + id + '/')
}

// 获取笔记目录列表
export function getCatalogue(id) {
  return index.get('blog/catalogue/' + id + '/')
}

// 获取笔记上下篇
export function getContext(id) {
  return index.get('blog/context/' + id + '/')
}
