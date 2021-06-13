import index from './index'

// 获取搜索热词
export function getSearchHot() {
    return index.get('record/searchHot/')
}

// 获取搜索词记录
export function getSearchHistory(user_id) {
    return index.get('record/searchHistory/' + user_id + '/')
}

// 搜索文章
export function getSearch(key, user_id) {
    if (user_id) {
        return index.get('record/search/?key=' + key + '&user_id=' + user_id)
    } else {
        return index.get('record/search/?key=' + key)
    }
}

// 获取留言数据
export function getLeaveMessage() {
    return index.get('record/leaveMessage/')
}

// 发表留言
export function postLeaveMessage(params) {
    return index.post('record/leaveMessage/', params)
}

// 点赞留言
export function putLeaveMessage(messageId) {
    const url = 'record/leaveMessage/' + messageId + '/'
    return index.put(url, NaN)
}

// 删除留言
export function deleteLeaveMessage(messageId) {
    return index.delete('record/leaveMessage/' + messageId + '/')
}

// 回复留言
export function postReplyLeaveMessage(params) {
    return index.post('record/leaveMessage/', params)
}

// 获取文章评论数据
export function getArticleComment(articleId) {
    return index.get('record/articleComment/?article='+articleId)
}
// 文章评论
export function postArticleComment(params) {
    return index.post('record/articleComment/', params)
}
// 删除文章评论
export function deleteArticleComment(messageId) {
    return index.delete('record/articleComment/' + messageId + '/')
}
// 点赞文章评论
export function putArticleComment(messageId) {
    const url = 'record/articleComment/' + messageId + '/'
    return index.put(url, NaN)
}
// 回复文章评论
export function postReplyArticleComment(params) {
    return index.post('record/articleComment/', params)
}