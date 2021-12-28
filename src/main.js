import {createApp} from 'vue'
import {Lazyload, Toast} from 'vant';
import App from './App.vue'
import router from '@/router/index'
import store from '@/store/index'
import mitt from 'mitt'
import '@/assets/style/index.scss'
import 'lib-flexible'
const app = createApp(App)
//绑定事件总线
app.config.globalProperties.$bus = new mitt();
app.use(Lazyload);
app.use(Toast)
app.use(store)
app.use(router)
app.mount('#app')
// 自定义指令-动态title
app.directive('title', {
	updated(el, binding) {
		document.title = binding.value
	}
})
