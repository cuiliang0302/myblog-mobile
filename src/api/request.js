import axios from 'axios'
import {Toast} from "vant";

export function request(config) {
	// 创建axios的实例
	const instance = axios.create({
		baseURL: import.meta.env.VITE_APP_BASE_URL,
		timeout: 20000
	})
	// 请求拦截器配置
	instance.interceptors.request.use(config => {
			// config.headers.Authorization = window.sessionStorage.getItem('token')
			return config
		}, error => {
			console.log(error)
			return Promise.error(error)
		}
	)
	// 响应拦截器配置
	instance.interceptors.response.use(response => {
		return response.data
	}, error => {
		console.log(error)
		if (error.response) {
			switch (error.response.status) {
				case 400:
					return Promise.reject(error.response.data)
				case 401:
					console.log("无权访问")
					Toast.fail('无权访问此接口')
					break
				case 403:
					break
				case 404:
					console.log("404啦")
					Toast.fail('接口请求地址错误')
					break
				case 500:
					console.log("500啦")
					Toast.fail('接口请求处理异常')
					break
				default:
					console.log(error.response)
			}
		} else {
			Toast.fail('请求超时，请稍候重试或联系管理员！')
		}
		return Promise.reject(error)
	})
	// 发送真正的网络请求
	return instance(config);
}

export default request
