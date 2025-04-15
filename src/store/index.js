// 使用数据持久化存储插件
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { createPinia } from 'pinia';

const store = createPinia();
store.use(piniaPluginPersistedstate);
export default store;

export * from './modules/common';
export * from './modules/theme';
export * from './modules/user';
