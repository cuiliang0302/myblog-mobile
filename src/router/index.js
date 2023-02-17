import {createRouter, createWebHistory} from 'vue-router';
import store from "@/store/index";

const router = createRouter({
	// history: createWebHashHistory(),  // hash模式，
	history: createWebHistory(),  //h5模式createWebHistory
	routes: [
		{
			path: '/',
			name: 'Home',
			component: () => import('@/views/home/Home.vue'),
			meta: {
				title: '崔亮的博客',
				keepAlive: true,
				transitionClass: 'gradually',//渐入
				index: 1,
				isAuth: false
			}
		},
		{
			path: '/category/:id',
			name: 'Category',
			component: () => import('@/views/article/Category.vue'),
			meta: {
				title: '文章分类',
				keepAlive: true,
				transitionClass: 'gradually',//渐入
				index: 1,
				isAuth: false
			}
		},
		{
			path: '/detail/article/:id',
			name: 'ArticleDetail',
			component: () => import('@/views/article/ArticleDetail.vue'),
			meta: {
				title: '文章正文',
				keepAlive: false,
				transitionClass: 'back',//前进后退
				index: 2,
				isAuth: false
			}
		},
		{
			path: '/note',
			name: 'Note',
			component: () => import('@/views/note/Note.vue'),
			meta: {
				title: '笔记列表',
				keepAlive: true,
				transitionClass: 'gradually',//渐入
				index: 1,
				isAuth: false
			}
		},
		{
			path: '/catalog/:id',
			name: 'Catalog',
			component: () => import('@/views/note/Catalog.vue'),
			meta: {
				title: '笔记目录',
				keepAlive: false,
				transitionClass: 'back',//前进后退
				index: 2,
				isAuth: false
			}
		},
		{
			path: '/detail/section/:id',
			name: 'SectionDetail',
			component: () => import('@/views/note/SectionDetail.vue'),
			meta: {
				title: '笔记正文',
				keepAlive: false,
				transitionClass: 'back',//前进后退
				index: 2,
				isAuth: false
			}
		},
		{
			path: '/tag/:id',
			name: 'Tag',
			component: () => import('@/views/public/Tag.vue'),
			meta: {
				title: '标签',
				keepAlive: true,
				transitionClass: 'jump',//跳跃
				index: 1,
				isAuth: false
			}
		},
		{
			path: '/classify',
			name: 'Classify',
			component: () => import('@/views/public/Classify.vue'),
			meta: {
				title: '归档',
				keepAlive: true,
				transitionClass: 'jump',//跳跃
				index: 1,
				isAuth: false
			}
		},
		{
			path: '/message',
			name: 'Message',
			component: () => import('@/views/public/Message.vue'),
			meta: {
				title: '留言板',
				keepAlive: true,
				transitionClass: 'gradually',//跳跃
				index: 1,
				isAuth: false
			}
		},
		{
			path: '/about',
			name: 'About',
			component: () => import('@/views/public/About.vue'),
			meta: {
				title: '关于',
				keepAlive: true,
				transitionClass: 'jump',//跳跃
				index: 1,
				isAuth: false
			}
		},
		{
			path: '/link',
			name: 'Link',
			component: () => import('@/views/public/Link.vue'),
			meta: {
				title: '友情链接',
				keepAlive: true,
				transitionClass: 'jump',//跳跃
				index: 1,
				isAuth: false
			}
		},
		{
			path: '/search',
			name: 'Search',
			component: () => import('@/views/public/Search.vue'),
			meta: {
				title: '搜索',
				keepAlive: true,
				transitionClass: 'gradually',//渐入
				index: 1,
				isAuth: false
			}
		},
		{
			path: '/result',
			name: 'Result',
			component: () => import('@/views/public/Result.vue'),
			meta: {
				title: '搜索结果',
				keepAlive: true,
				transitionClass: 'gradually',//渐入
				index: 1,
				isAuth: false
			}
		},
		{
			path: '/personal/myIndex',
			name: 'Personal',
			component: () => import('@/views/personal/MyIndex.vue'),
			meta: {
				title: '个人中心',
				keepAlive: true,
				transitionClass: 'gradually',//渐入
				index: 1,
				isAuth: false
			}
		},
		{
			path: '/personal/myHistory',
			name: 'MyHistory',
			component: () => import('@/views/personal/MyHistory.vue'),
			meta: {
				title: '浏览记录',
				keepAlive: true,
				transitionClass: 'gradually',//渐入
				index: 1,
				isAuth: true
			}
		},
		{
			path: '/personal/myCollect',
			name: 'MyCollect',
			component: () => import('@/views/personal/MyCollect.vue'),
			meta: {
				title: '我的收藏',
				keepAlive: true,
				transitionClass: 'gradually',//渐入
				index: 1,
				isAuth: true
			}
		},
		{
			path: '/personal/myComments',
			name: 'MyComments',
			component: () => import('@/views/personal/MyComments.vue'),
			meta: {
				title: '我的评论',
				keepAlive: true,
				transitionClass: 'gradually',//渐入
				index: 1,
				isAuth: true
			}
		},
		{
			path: '/personal/statistics',
			name: 'Statistics',
			component: () => import('@/views/personal/Statistics.vue'),
			meta: {
				title: '数据统计',
				keepAlive: true,
				transitionClass: 'gradually',//渐入
				index: 1,
				isAuth: true
			},
		},
		{
			path: '/personal/myInfo',
			name: 'MyInfo',
			component: () => import('@/views/personal/MyInfo.vue'),
			meta: {
				title: '修改信息',
				keepAlive: true,
				transitionClass: 'back',//前进后退
				index: 2,
				isAuth: true
			},
		},
		{
			path: '/personal/changePassword',
			name: 'ChangePassword',
			component: () => import('@/views/personal/ChangePassword.vue'),
			meta: {
				title: '修改密码',
				keepAlive: true,
				transitionClass: 'back',//前进后退
				index: 2,
				isAuth: true
			},
		},
		{
			path: '/personal/changeEmail',
			name: 'ChangeEmail',
			component: () => import('@/views/personal/ChangeEmail.vue'),
			meta: {
				title: '更换邮箱',
				keepAlive: true,
				transitionClass: 'back',//前进后退
				index: 3,
				isAuth: true
			},
		},
		{
			path: '/personal/changePhone',
			name: 'ChangePhone',
			component: () => import('@/views/personal/ChangePhone.vue'),
			meta: {
				title: '更换手机',
				keepAlive: true,
				transitionClass: 'back',//前进后退
				index: 3,
				isAuth: true
			},
		},
		{
			path: '/pay',
			name: 'Pay',
			component: () => import('@/views/personal/Pay.vue'),
			meta: {
				title: '赞赏支持',
				keepAlive: true,
				transitionClass: 'back',//前进后退
				index: 2,
				isAuth: false
			},
		},
		{
			path: '/applyLink',
			name: 'ApplyLink',
			component: () => import('@/views/personal/ApplyLink.vue'),
			meta: {
				title: '申请友链',
				keepAlive: true,
				transitionClass: 'back',//前进后退
				index: 2,
				isAuth: false
			},
		},
		{
			path: '/contact',
			name: 'Contact',
			component: () => import('@/views/personal/Contact.vue'),
			meta: {
				title: '联系博主',
				keepAlive: true,
				transitionClass: 'back',//前进后退
				index: 2,
				isAuth: false
			},
		},
		{
			path: '/fontSize',
			name: 'FontSize',
			component: () => import('@/views/personal/FontSize.vue'),
			meta: {
				title: '字体设置',
				keepAlive: true,
				transitionClass: 'back',//前进后退
				index: 2,
				isAuth: false
			},
		},
		{
			path: '/loginRegister',
			name: 'LoginRegister',
			component: () => import('@/views/personal/LoginRegister.vue'),
			meta: {
				title: '登录&注册',
				keepAlive: false,
				transitionClass: 'gradually',
				isAuth: false
			}
		},
		{
			path: '/OAuth/:platform',
			name: 'OAuth',
			component: () => import('@/views/personal/OAuth.vue'),
			meta: {
				title: '第三方登录授权页',
				keepAlive: true,
				transitionClass: 'gradually',//渐入
				index: 1,
				isAuth: false
			}
		},
		{
			path: '/setPassword',
			name: 'SetPassword',
			component: () => import('@/views/personal/SetPassword.vue'),
			meta: {
				title: '重置密码',
				keepAlive: true,
				transitionClass: 'back',//前进后退
				index: 2,
				isAuth: false
			}
		},
		{
			path: '/test',
			name: 'Test',
			component: () => import('@/views/Test.vue'),
			meta: {
				title: '测试页',
				keepAlive: true,
				transitionClass: 'back',//前进后退
				index: 2,
				isAuth: false
			}
		},
		{
			path: '/test1',
			name: 'Test1',
			component: () => import('@/views/Test1.vue'),
			meta: {
				title: '测试页1',
				keepAlive: true,
				transitionClass: 'back',//前进后退
				index: 2,
				isAuth: false
			}
		},
		{
			path: '/404',
			name: '404',
			component: () => import('@/views/404.vue'),
			meta: {
				title: '404-页面找不到',
				keepAlive: true,
				transitionClass: 'back',//前进后退
				index: 2,
				isAuth: false
			}
		},
		{
			path: '/:pathMatch(.*)',
			redirect: '/404'
		},
	]
})
// 路由导航守卫
router.beforeEach((to, from, next) => {
	// to 访问的路径 from 从哪来 next 响应路径
	// 百度统计API跳转
	if (to.path) {
		if (window._hmt) {
			window._hmt.push(['_trackPageview', '/#' + to.fullPath])
		}
	}
	if (to.meta.isAuth === true && JSON.stringify(store.state.userSession) === '{}') {
		Toast.fail('还未登录，即将跳转至登录页')
		return next('/loginRegister')
	} else {
		next()
	}
	document.title = to.meta.title
})
export default router;
