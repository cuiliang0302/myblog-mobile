import index from './index'

// 获取轮播图
export function getCarousel() {
  return index.get('carousel/')
}

// 获取文章列表
export function getArticle(page = 1, order = '-created_time', category) {
  if (category) {
    return index.get('article/' + '?size=5&page=' + page + '&ordering=' + order + '&category=' + category)
  } else {
    return index.get('article/' + '?size=5&page=' + page + '&ordering=' + order)
  }
}
