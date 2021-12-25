import index from './index'

// 获取七牛图片上传token
export function getQiNiuToken() {
	return index.get('/public/qiniuToken/')
}

// 图片防盗链代理
export function getImgProxy(url) {
	return import.meta.env.VITE_APP_BASE_URL + '/public/imgProxy/?url=' + url
}

// 获取echarts数据
export function getEcharts(user, chart) {
	return index.get('/public/echarts/?user=' + user + '&chart=' + chart)
}

// 获取省市代码
export function getAreaData() {
	return index.getFile('/static/area-data.json')
}
