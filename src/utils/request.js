import axios from 'axios';
import {useUserStore} from '@/store';
import {showFailToast, showLoadingToast} from "vant";

const user = useUserStore();
// 创建请求实例
const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  // 指定请求超时的毫秒数
  timeout: 5000,
  // 表示跨域请求时是否需要使用凭证
  // withCredentials: false,
});

// 前置拦截器（发起请求之前的拦截）
instance.interceptors.request.use(
  (config) => {
    // console.log(config)
    //  * 在这里一般会携带前台的参数发送给后台，比如下面这段代码：
    const token = user.token
    if (token) {
      config.headers.Authorization = 'Bearer ' + token
    }
    // console.log(config)
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 后置拦截器（获取到响应时的拦截）
instance.interceptors.response.use(
  (response) => {
    // console.log('Response:', response);
    /**
     * 根据你的项目实际情况来对 response 和 error 做处理
     * 这里对 response 和 error 不做任何处理，直接返回
     */
    return response.data;
  },
  async (error) => {
    const {response} = error;
    console.log(response);

    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    if (response && response.data) {
      switch (error.response.status) {
        case 400:
          return Promise.reject(error.response.data)
        case 401:
          // showFailToast('对不起，您暂无权限访问此接口，即将跳转至登录页！')
          showLoadingToast({
            message: '对不起，您暂无权限访问此接口，即将跳转至登录页！',
            forbidClick: true,
            loadingType: 'spinner',
          });
          await sleep(1500);
          localStorage.clear()
          sessionStorage.clear()
          window.location.href = "/loginRegister?component=Login";
          break
        case 403:
          showLoadingToast({
            message: '对不起，您的身份信息已过期，即将跳转至登录页！',
            forbidClick: true,
            loadingType: 'spinner',
          });
          await sleep(1500);
          localStorage.clear()
          sessionStorage.clear()
          window.location.href = "/loginRegister?component=Login";
          break
        case 404:
          showFailToast("404啦")
          showFailToast('请求地址不存在，请刷新页面重试！')
          await sleep(1500);
          break
        case 500:
          console.log("500啦")
          showFailToast('后端接口异常，请稍候重试！')
          await sleep(1500);
          break
        default:
          return Promise.reject(error)
      }
      return Promise.reject(error);
    }
    const {message} = error;
    console.log(message);
    return Promise.reject(error);
  },
);

// 导出常用函数

/**
 * @param {string} url
 * @param {object} data
 * @param {object} params
 */
export const post = (url, data = {}, params = {}) => {
  return instance({
    method: 'post',
    url,
    data,
    params,
  });
};

/**
 * @param {string} url
 * @param {object} params
 */
export const get = (url, params = {}) => {
  return instance({
    method: 'get',
    url,
    params,
  });
};

/**
 * @param {string} url
 * @param {object} data
 * @param {object} params
 */
export const put = (url, data = {}, params = {}) => {
  return instance({
    method: 'put',
    url,
    params,
    data,
  });
};

/**
 * @param {string} url
 * @param {object} params
 */
export const _delete = (url, params = {}) => {
  return instance({
    method: 'delete',
    url,
    params,
  });
};
export const patch = (url, data = {}, params = {}) => {
  return instance({
    method: 'patch',
    url,
    data,
    params,
  });
};
export default instance;
