import {createApp} from 'vue'
import {Lazyload, Toast} from 'vant';
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/style/index.scss'
import 'lib-flexible'

const app = createApp(App)
app.use(Lazyload);
app.use(Toast)
app.use(store)
app.use(router)
app.mount('#app')
