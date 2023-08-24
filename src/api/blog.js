import index from './index'

// 获取文章列表
export function getArticle(params) {
	const url = '/blog/article/'
	return index.get(url,params)
}

// 获取文章分类列表
export function getCategory() {
	return index.get('/blog/category/')
}

// 获取文章标签列表
export function getTag() {
	return index.get('/blog/tag/')
}

// 获取文章详情
export function getArticleDetail(id) {
	return index.get('/blog/article/' + id + '/')
}

// 获取猜你喜欢列表
export function getGuessLike(id) {
	return index.get('/blog/guessLike/' + id + '/')
}

// 获取归档全部列表
export function getClassify() {
	return index.get('/blog/classify/')
}

// 查询指定归档文章列表
export function getClassifyArticle(month) {
	return index.get('/blog/classify/?month=' + month)
}

// 获取笔记名称列表
export function getNote() {
	return index.get('/blog/note/')
}

// 获取笔记名称详情
export function getNoteDetail(id) {
	return index.get('/blog/note/' + id + '/')
}

// 获取笔记内容详情
export function getSectionDetail(id) {
	return index.get('/blog/section/' + id + '/')
}

// 文章或笔记点赞
export function postLike(params) {
	return index.post('/blog/like/', params)
}

// 获取笔记目录列表
export function getCatalogueList(id) {
	return index.get('/blog/catalogueList/' + id + '/')
}

// 获取笔记上下篇
export function getContext(id) {
	return index.get('/blog/context/' + id + '/?kind=section')
}

// 获取文章笔记二维码
export function getQRcode(url) {
	return index.get('/blog/QRcode/?url=' + url)
}
