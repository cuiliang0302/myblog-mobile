import {defineStore} from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user_id: '',
    token: '',
    username: '',
    keep_login: true,
    is_login: false,
  }),
  // 计算属性
  getters: {
    isLoggedIn(state) {
      // 添加 Token 有效性验证
      console.log(state.token)
      if (!state.token) {
        return false
      } else {
        return true
      }
    },
  },
  // 修改数据
  actions: {
    // 更改用户信息
    login(user_id, token, username) {
      this.user_id = user_id
      this.token = token
      this.username = username
      // 根据用户选择存储数据
      const storage = this.keep_login ? localStorage : sessionStorage
      console.log(storage)
      storage.setItem('user_id', user_id)
      storage.setItem('token', token)
      storage.setItem('username', username)
      // 清除另一个存储旧数据
      const oldStorage = this.keep_login ? sessionStorage : localStorage
      oldStorage.removeItem('user_id')
      oldStorage.removeItem('token')
      oldStorage.removeItem('username')
    },
    logout() {
      this.user_id = null
      this.token = null
      this.username = null
      // 清除所有存储
      localStorage.removeItem('user_id')
      localStorage.removeItem('token')
      localStorage.removeItem('username')
      sessionStorage.removeItem('user_id')
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('username')
    },
    // 初始化时加载数据
    initialize() {
      const storage = this.keep_login ? localStorage : sessionStorage
      const user_id = storage.getItem('user_id')
      const token = storage.getItem('token')
      const username = storage.getItem('username')
      if (user_id && token && username) {
        this.user_id = user_id
        this.token = token
        this.username = username
      }
    }
  },
  // 持久化存储插件其他配置
  persist: {
    // 修改存储中使用的键名称，默认为当前 Store的 id
    key: 'useStore',
    // 修改为 localStorage，默认为 sessionStorage
    storage: localStorage,
    // 部分持久化状态的点符号路径数组，[]意味着没有状态被持久化(默认为undefined，持久化整个状态)
    pick: ['keep_login']
  }
})