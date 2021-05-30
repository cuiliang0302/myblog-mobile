import index from './index'
// 获取七牛图片上传token
export function getQiNiuToken() {
  return index.get('qiniuToken/')
}
