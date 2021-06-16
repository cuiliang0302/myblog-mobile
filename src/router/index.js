import {createRouter, createWebHistory} from 'vue-router'

const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/home/Home'),
        meta: {
            title: '崔亮的博客',
            keepAlive: true,
            transitionClass: 'gradually',//渐入
            index: 1
        }
    },
    {
        path: '/article',
        name: 'Article',
        component: () => import('@/views/article/Article'),
        meta: {
            title: '文章列表',
            keepAlive: true,
            transitionClass: 'gradually',//渐入
            index: 1
        }
    },
    {
        path: '/note',
        name: 'Note',
        component: () => import('@/views/note/Note'),
        meta: {
            title: '笔记列表',
            keepAlive: true,
            transitionClass: 'gradually',//渐入
            index: 1
        }
    },
    {
        path: '/personal',
        name: 'Personal',
        component: () => import('@/views/personal/Personal'),
        meta: {
            title: '个人中心',
            keepAlive: true,
            transitionClass: 'gradually',//渐入
            index: 1
        }
    },
    {
        path: '/catalog/:id',
        name: 'Catalog',
        component: () => import('@/views/note/Catalog'),
        meta: {
            title: '笔记目录',
            keepAlive: false,
            transitionClass: 'back',//前进后退
            index: 2
        }
    },
    {
        path: '/detail/:id',
        name: 'Detail',
        component: () => import('@/views/public/Detail'),
        meta: {
            title: '文章正文',
            keepAlive: false,
            transitionClass: 'back',//前进后退
            index: 2
        }
    },
    {
        path: '/tag',
        name: 'Tag',
        component: () => import('@/views/public/Tag'),
        meta: {
            title: '标签',
            keepAlive: true,
            transitionClass: 'jump',//跳跃
            index: 1
        }
    },
    {
        path: '/classify',
        name: 'Classify',
        component: () => import('@/views/public/Classify'),
        meta: {
            title: '归档',
            keepAlive: true,
            transitionClass: 'jump',//跳跃
            index: 1
        }
    },
    {
        path: '/message',
        name: 'Message',
        component: () => import('@/views/public/Message'),
        meta: {
            title: '留言板',
            keepAlive: true,
            transitionClass: 'gradually',//跳跃
            index: 1
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
            index: 1
        }
    },
    {
        path: '/link',
        name: 'Link',
        component: () => import('@/views/public/Link'),
        meta: {
            title: '友情链接',
            keepAlive: true,
            transitionClass: 'jump',//跳跃
            index: 1
        }
    },
    {
        path: '/search',
        name: 'Search',
        component: () => import('@/views/public/Search'),
        meta: {
            title: '搜索',
            keepAlive: true,
            transitionClass: 'gradually',//渐入
            index: 1
        }
    },
    {
        path: '/my-history',
        name: 'MyHistory',
        component: () => import('@/views/personal/MyHistory'),
        meta: {
            title: '浏览记录',
            keepAlive: true,
            transitionClass: 'gradually',//渐入
            index: 1
        }
    },
    {
        path: '/my-collect',
        name: 'MyCollect',
        component: () => import('@/views/personal/MyCollect'),
        meta: {
            title: '我的收藏',
            keepAlive: true,
            transitionClass: 'gradually',//渐入
            index: 1
        }
    },
    {
        path: '/my-comments',
        name: 'MyComments',
        component: () => import('@/views/personal/MyComments'),
        meta: {
            title: '我的评论',
            keepAlive: true,
            transitionClass: 'gradually',//渐入
            index: 1
        }
    },
    {
        path: '/statistics',
        name: 'Statistics',
        component: () => import('@/views/personal/Statistics'),
        meta: {
            title: '数据统计',
            keepAlive: true,
            transitionClass: 'gradually',//渐入
            index: 1
        },
    },
    {
        path: '/my-info',
        name: 'MyInfo',
        component: () => import('@/views/personal/MyInfo'),
        meta: {
            title: '我的信息',
            keepAlive: true,
            transitionClass: 'back',//前进后退
            index: 2
        },
    },
    {
        path: '/change-password',
        name: 'ChangePassword',
        component: () => import('@/views/personal/ChangePassword'),
        meta: {
            title: '修改密码',
            keepAlive: true,
            transitionClass: 'back',//前进后退
            index: 2
        },
    },
    {
        path: '/change-email',
        name: 'ChangeEmail',
        component: () => import('@/views/personal/ChangeEmail'),
        meta: {
            title: '更换邮箱',
            keepAlive: true,
            transitionClass: 'back',//前进后退
            index: 3
        },
    },
    {
        path: '/change-phone',
        name: 'ChangePhone',
        component: () => import('@/views/personal/ChangePhone'),
        meta: {
            title: '更换手机',
            keepAlive: true,
            transitionClass: 'back',//前进后退
            index: 3
        },
    },
    {
        path: '/binding',
        name: 'Binding',
        component: () => import('@/views/personal/Binding'),
        meta: {
            title: '绑定第三方账号',
            keepAlive: true,
            transitionClass: 'back',//前进后退
            index: 2
        },
    },
    {
        path: '/pay',
        name: 'Pay',
        component: () => import('@/views/personal/Pay'),
        meta: {
            title: '赞赏支持',
            keepAlive: true,
            transitionClass: 'back',//前进后退
            index: 2
        },
    },
    {
        path: '/apply-link',
        name: 'ApplyLink',
        component: () => import('@/views/personal/ApplyLink'),
        meta: {
            title: '申请友链',
            keepAlive: true,
            transitionClass: 'back',//前进后退
            index: 2
        },
    },
    {
        path: '/contact',
        name: 'Contact',
        component: () => import('@/views/personal/Contact'),
        meta: {
            title: '联系博主',
            keepAlive: true,
            transitionClass: 'back',//前进后退
            index: 2
        },
    },
    {
        path: '/fontsize',
        name: 'FontSize',
        component: () => import('@/views/personal/FontSize'),
        meta: {
            title: '字体设置',
            keepAlive: true,
            transitionClass: 'back',//前进后退
            index: 2
        },
    },
    {
        path: '/login_register',
        name: 'LoginRegister',
        component: () => import('@/views/personal/LoginRegister'),
        meta: {
            title: '登录&注册',
            keepAlive: false,
            transitionClass: 'gradually'
        }
    },
    {
        path: '/set-password',
        name: 'SetPassword',
        component: () => import('@/views/personal/SetPassword'),
        meta: {
            title: '重置密码',
            keepAlive: true,
            transitionClass: 'back',//前进后退
            index: 2
        }
    },
    {
        path: '/test',
        name: 'Test',
        component: () => import('@/views/Test'),
        meta: {
            title: '测试页',
            keepAlive: true,
            transitionClass: 'back',//前进后退
            index: 2
        }
    },
    {
        path: '/test1',
        name: 'Test1',
        component: () => import('@/views/Test1'),
        meta: {
            title: '测试页1',
            keepAlive: true,
            transitionClass: 'back',//前进后退
            index: 2
        }
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})
// 路由导航守卫
router.beforeEach((to, from, next) => {
    // to 访问的路径 from 从哪来 next 响应路径

    // if (to.meta.isAuth && store.state.user.isLogin === false) {
    //   Toast.fail('还未登录，跳转到登录页')
    //   return next('/login')
    // } else {
    //   next()
    // }
    next()
    document.title = to.meta.title
})
export default router
