import {defineStore} from 'pinia';

export const useCommonStore = defineStore('common', {
  state: () => ({
    next_path: '/personal/myIndex', // 登录后跳转路径
  }),
  actions: {
    // 修改登录后跳转页面
    setNextPath(value) {
      this.next_path = value
    },
  },
  // 开启数据持久化
  persist: {
    // 修改存储中使用的键名称，默认为当前 Store的 id
    key: 'common',
    // 修改为 sessionStorage，默认为 localStorage
    storage: sessionStorage,
  }
});
