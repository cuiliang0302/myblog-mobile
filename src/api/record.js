import {get, post, put, _delete, patch} from '@/utils/request';

export default class Record {
  // 获取搜索热词
  static async getSearchHot() {
    return get('/record/searchHot/', {});
  }

  // 获取搜索词记录
  static async getSearchHistory() {
    return get('/record/searchHistory/')
  }

  // 搜索文章
  static async getSearch(params) {
    const url = '/record/search/'
    return get(url, params)
  }

  // 获取留言数据
  static async getLeaveMessage(params) {
    const url = '/record/leaveMessage/'
    return get(url, params)
  }

  // 获取单个留言数据
  static async getLeaveMessageDetail(id) {
    return get('/record/leaveMessage/' + id + '/')
  }

  // 发表留言
  static async postLeaveMessage(params) {
    return post('/record/leaveMessage/', params)
  }

  // 点赞留言
  static async patchLeaveMessage(id, data) {
    const url = '/record/leaveMessage/' + id + '/'
    return patch(url, data)
  }

  // 删除留言
  static async deleteLeaveMessage(messageId) {
    return _delete('/record/leaveMessage/' + messageId + '/')
  }

  // 回复留言
  static async postReplyLeaveMessage(params) {
    return post('/record/leaveMessage/', params)
  }

  // 获取文章评论数据
  static async getArticleComment(articleId) {
    return get('/record/articleComment/?article=' + articleId)
  }

  // 文章评论
  static async postArticleComment(params) {
    return post('/record/articleComment/', params)
  }

  // 删除文章评论
  static async deleteArticleComment(messageId) {
    return _delete('/record/articleComment/' + messageId + '/')
  }

  // 点赞文章评论
  static async patchArticleComment(id, data) {
    const url = '/record/articleComment/' + id + '/'
    return patch(url, data)
  }

  // 回复文章评论
  static async postReplyArticleComment(params) {
    return post('/record/articleComment/', params)
  }

  // 获取笔记评论数据
  static async getSectionComment(sectionId) {
    return get('/record/sectionComment/?section=' + sectionId)
  }

  // 笔记评论
  static async postSectionComment(params) {
    return post('/record/sectionComment/', params)
  }

  // 删除笔记评论
  static async deleteSectionComment(messageId) {
    return _delete('/record/sectionComment/' + messageId + '/')
  }

  // 点赞笔记评论
  static async patchSectionComment(id, data) {
    const url = '/record/sectionComment/' + id + '/'
    return patch(url, data)
  }

  // 回复笔记评论
  static async postReplySectionComment(params) {
    return post('/record/sectionComment/', params)
  }

  // 获取文章浏览记录
  static async getArticleHistory(article) {
    if (article) {
      return get('/record/articleHistory/?article=' + article)
    } else {
      return get('/record/articleHistory/')
    }
  }

  // 添加文章浏览记录
  static async postArticleHistory(params) {
    return post('/record/articleHistory/', params)
  }

  // 修改文章收藏
  static async putArticleHistory(params) {
    const url = '/record/articleHistory/'
    return put(url, params)
  }

  // 获取笔记浏览记录
  static async getSectionHistory(section, user) {
    if (section) {
      return get('/record/sectionHistory/?section=' + section)
    } else {
      return get('/record/sectionHistory/')
    }

  }

  // 添加笔记浏览记录
  static async postSectionHistory(params) {
    return post('/record/sectionHistory/', params)
  }

  // 修改笔记收藏
  static async putSectionHistory(params) {
    const url = '/record/sectionHistory/'
    return put(url, params)
  }

  // 获取用户文章评论数据
  static async getUserArticleComment() {
    return get('/record/articleComment/')
  }

  // 获取用户笔记评论数据
  static async getUserSectionComment() {
    return get('/record/sectionComment/')
  }

  // 获取用户统计数据
  static async getStatistics() {
    return get('/record/statistics/')
  }

  // 查询指定用户echarts数据统计
  static async getUserEcharts(params) {
    const url = '/record/userEcharts/'
    return get(url, params)
  }
}