import index from './index'

// 获取七牛图片上传token
export function getQiNiuToken() {
	return index.get('/public/qiniuToken/')
}

// 图片防盗链代理
export function getImgProxy(url) {
	return import.meta.env.VITE_APP_BASE_URL + '/public/imgProxy/?url=' + url
}

// 获取省市代码
export function getAreaData() {
	return index.get('/public/areaData/')
}
