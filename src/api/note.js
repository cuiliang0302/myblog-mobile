import http from './http'

// 获取笔记名称列表
export function getNote() {
  return http.get('note/')
}
