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
    return index.get('record/articleComment/?article=' + articleId)
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

// 获取笔记评论数据
export function getSectionComment(sectionId) {
    return index.get('record/sectionComment/?section=' + sectionId)
}

// 笔记评论
export function postSectionComment(params) {
    return index.post('record/sectionComment/', params)
}

// 删除笔记评论
export function deleteSectionComment(messageId) {
    return index.delete('record/sectionComment/' + messageId + '/')
}

// 点赞笔记评论
export function putSectionComment(messageId) {
    const url = 'record/sectionComment/' + messageId + '/'
    return index.put(url, NaN)
}

// 回复笔记评论
export function postReplySectionComment(params) {
    return index.post('record/sectionComment/', params)
}

// 获取文章浏览记录
export function getArticleHistory(article, user) {
    if (article){
        return index.get('record/articleHistory/?article=' + article + '&user=' + user)
    }else {
        return index.get('record/articleHistory/?user=' + user)
    }
}

// 添加文章浏览记录
export function postArticleHistory(params) {
    return index.post('record/articleHistory/', params)
}

// 修改文章收藏
export function putArticleHistory(params) {
    const url = 'record/articleHistory/'
    return index.put(url, params)
}

// 获取笔记浏览记录
export function getSectionHistory(section, user) {
    if (section){
        return index.get('record/sectionHistory/?section=' + section + '&user=' + user)
    }else {
        return index.get('record/sectionHistory/?user=' + user)
    }

}

// 添加笔记浏览记录
export function postSectionHistory(params) {
    return index.post('record/sectionHistory/', params)
}

// 修改笔记收藏
export function putSectionHistory(params) {
    const url = 'record/sectionHistory/'
    return index.put(url, params)
}

// 获取用户文章评论数据
export function getUserArticleComment(userId) {
    return index.get('/record/articleComment/?user=' + userId)
}
// 获取用户笔记评论数据
export function getUserSectionComment(userId) {
    return index.get('/record/sectionComment/?user=' + userId)
}