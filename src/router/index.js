import { createRouter, createWebHistory } from 'vue-router';
import {showFailToast} from "vant";
import {useUserStore} from '@/store';
// console.log(useUserStore);

const files = import.meta.glob('./modules/*.js', {
  eager: true,
});

// 路由暂存
const routeModuleList = [];

// 遍历路由模块
Object.keys(files).forEach((key) => {
  const module = files[key].default || {};
  const moduleList = Array.isArray(module) ? [...module] : [module];
  routeModuleList.push(...moduleList);
});

// 存放动态路由
const asyncRouterList = [...routeModuleList];

// 存放固定路由
const defaultRouterList = [];

const routes = [...defaultRouterList, ...asyncRouterList];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return {
      el: '#app',
      top: 0,
      behavior: 'smooth',
    };
  },
});
// 路由导航守卫
router.beforeEach((to, from, next) => {
  // to 访问的路径 from 从哪来 next 响应路径
  // 百度统计API跳转
  if (to.path) {
    if (window._hmt) {
      window._hmt.push(['_trackPageview', '/#' + to.fullPath])
    }
  }
  const user = useUserStore();
  if (to.meta.isAuth === true && !user.isLoggedIn) {
    showFailToast('还未登录，即将跳转至登录页')
    return next('/loginRegister')
  } else {
    next()
  }
  document.title = to.meta.title
})
export default router;
