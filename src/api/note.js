import index from './index'

// 获取笔记名称列表
export function getNote() {
  return index.get('note/')
}

// 获取笔记内容详情
export function getSectionDetail(id) {
  return index.get('section/' + id)
}

// 获取笔记目录列表
export function getCatalogue(id) {
  return index.get('catalogue/' + id)
}

// 获取笔记上下篇
export function getContext(id) {
  return index.get('context/' + id)
}
