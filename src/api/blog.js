import {get, post} from '@/utils/request';

export default class Blog {
  // 获取文章列表
  static async getArticle(params) {
    return get('/blog/article/', params);
  }

  // 获取文章分类列表
  static async getCategory() {
    return get('/blog/category/');
  }

  // 获取文章标签列表
  static async getTag() {
    return get('/blog/tag/');
  }

  // 获取文章详情
  static async getArticleDetail(id) {
    return get('/blog/article/' + id + '/');
  }

  // 获取猜你喜欢列表
  static async getGuessLike(id) {
    return get('/blog/guessLike/' + id + '/')
  }

// 获取归档全部列表
  static async getClassify() {
    return get('/blog/classify/')
  }

// 查询指定归档文章列表
  static async getClassifyArticle(month) {
    return get('/blog/classify/?month=' + month)
  }

// 获取笔记名称列表
  static async getNote() {
    return get('/blog/note/')
  }

// 获取笔记名称详情
  static async getNoteDetail(id) {
    return get('/blog/note/' + id + '/')
  }

// 获取笔记内容详情
  static async getSectionDetail(id) {
    return get('/blog/section/' + id + '/')
  }

// 文章或笔记点赞
  static async postLike(params) {
    return post('/blog/like/', params)
  }

// 获取笔记目录列表
  static async getCatalogueList(id) {
    return get('/blog/catalogueList/' + id + '/')
  }

// 获取笔记上下篇
  static async getContext(id) {
    return get('/blog/context/' + id + '/?kind=section')
  }
}