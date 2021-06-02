import index from './index'
// 获取七牛图片上传token
export function getQiNiuToken() {
  return index.get('public/qiniuToken/')
}
// 获取七牛图片上传token
export function getImgProxy(url) {
  return 'https://api.cuiliangblog.cn/v1/public/imgProxy/?url='+url
}
