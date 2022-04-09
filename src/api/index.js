import {request} from './request'

const index = {
	get(url, params) {
		const config = {
			method: 'get',
			url: url
		}
		if (params) config.params = params
		return request(config)
	},
	getFile(url, params) {
		const config = {
			method: 'get',
			url: url,
			responseType: 'blob'
		}
		if (params) config.params = params
		return request(config)
	},
	post(url, params) {
		const config = {
			method: 'post',
			url: url
		}
		if (params) config.data = params
		return request(config)
	},
	put(url, params) {
		const config = {
			method: 'put',
			url: url
		}
		if (params) config.data = params
		return request(config)
	},
	patch(url, params) {
		const config = {
			method: 'patch',
			url: url
		}
		if (params) config.data = params
		return request(config)
	},
	delete(url, params) {
		const config = {
			method: 'delete',
			url: url
		}
		if (params) config.params = params
		return request(config)
	}
}
export default index
