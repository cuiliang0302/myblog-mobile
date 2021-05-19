import http from './http'

// 获取笔记名称列表
export function getNote() {
  return http.get('note/')
}

// 获取笔记内容详情
export function getSectionDetail(id) {
  return http.get('section/' + id)
}

// 获取笔记目录列表
export function getCatalogue(id) {
  return http.get('catalogue/' + id)
}

// 获取笔记上下篇
export function getContext(id) {
  return http.get('context/' + id)
}
