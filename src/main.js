import {createApp} from 'vue';
import App from './App.vue';
import router from './router';
import mitt from 'mitt'
import '@/style/index.less';
import "amfe-flexible/index.js";
import 'animate.css'
import {Lazyload} from 'vant';
import store from '@/store/index.js'

const app = createApp(App)
app.use(store).use(router).use(Lazyload).mount('#app');
//绑定事件总线
app.config.globalProperties.$bus = new mitt();
// 自定义指令-动态title
app.directive('title', {
  updated(el, binding) {
    document.title = binding.value
  }
})