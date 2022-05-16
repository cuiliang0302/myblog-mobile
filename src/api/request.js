import axios from 'axios'
import {Toast} from "vant";
import store from "@/store/index";

export function request(config) {
    const token = store.state.userLocal.token || store.state.userSession.token
    // 创建axios的实例
    const instance = axios.create({
        baseURL: import.meta.env.VITE_APP_BASE_URL,
        timeout: 50000
    })
    // 请求拦截器配置
    instance.interceptors.request.use(config => {
            if (token) {
                config.headers.Authorization = 'Bearer ' + token
            }
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
                    Toast.fail('对不起，您暂无权限访问此接口，请登录重试！')
                    localStorage.clear()
                    sessionStorage.clear()
                    window.location.href = "https://m.cuiliangblog.cn/loginRegister?component=Login";
                    break
                case 403:
                    Toast.fail('对不起，您的身份信息已过期，请重新登录！')
                    localStorage.clear()
                    sessionStorage.clear()
                    window.location.href = "https://m.cuiliangblog.cn/loginRegister?component=Login";
                    break
                case 404:
                    console.log("404啦")
                    break
                case 500:
                    console.log("500啦")
                    Toast.fail('后端接口异常，请稍候重试！')
                    break
                default:
                    return Promise.reject(error)
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
