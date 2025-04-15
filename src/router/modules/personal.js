export default [
    {
        path: '/loginRegister',
        name: 'LoginRegister',
        component: () => import('@/views/personal/LoginRegister.vue'),
        meta: {
            title: '登录&注册',
            transitionClass: 'gradually',//渐入
            transitionIndex: 1,
        }
    },
    {
        path: '/OAuth/:platform',
        name: 'OAuth',
        component: () => import('@/views/personal/OAuth.vue'),
        meta: {
            title: '第三方登录授权页',
            transitionClass: 'gradually',//渐入
            transitionIndex: 2,
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
            transitionIndex: 2,
        }
    },
    {
        path: '/personal/myIndex',
        name: 'Personal',
        component: () => import('@/views/personal/MyIndex.vue'),
        meta: {
            title: '个人中心',
            transitionClass: 'gradually',//渐入
            transitionIndex: 1,
        }
    },
    {
        path: '/personal/myHistory',
        name: 'MyHistory',
        component: () => import('@/views/personal/MyHistory.vue'),
        meta: {
            title: '浏览记录',
            transitionClass: 'back',//前进后退
            transitionIndex: 2,
            isAuth: true
        }
    },
    {
        path: '/personal/myCollect',
        name: 'MyCollect',
        component: () => import('@/views/personal/MyCollect.vue'),
        meta: {
            title: '我的收藏',
            transitionClass: 'back',//前进后退
            transitionIndex: 2,
            isAuth: true
        }
    },
    {
        path: '/personal/myComments',
        name: 'MyComments',
        component: () => import('@/views/personal/MyComments.vue'),
        meta: {
            title: '我的评论',
            transitionClass: 'back',//前进后退
            transitionIndex: 2,
            isAuth: true
        }
    },
    {
        path: '/personal/statistics',
        name: 'Statistics',
        component: () => import('@/views/personal/Statistics.vue'),
        meta: {
            title: '数据统计',
            transitionClass: 'back',//前进后退
            transitionIndex: 2,
            isAuth: true
        },
    },
    {
        path: '/personal/myInfo',
        name: 'MyInfo',
        component: () => import('@/views/personal/MyInfo.vue'),
        meta: {
            title: '修改信息',
            transitionClass: 'back',//前进后退
            transitionIndex: 2,
            isAuth: true
        },
    },
    {
        path: '/personal/changePassword',
        name: 'ChangePassword',
        component: () => import('@/views/personal/ChangePassword.vue'),
        meta: {
            title: '修改密码',
            transitionClass: 'back',//前进后退
            transitionIndex: 2,
            isAuth: true
        },
    },
    {
        path: '/personal/changeEmail',
        name: 'ChangeEmail',
        component: () => import('@/views/personal/ChangeEmail.vue'),
        meta: {
            title: '更换邮箱',
            transitionClass: 'back',//前进后退
            transitionIndex: 2,
            isAuth: true
        },
    },
    {
        path: '/pay',
        name: 'Pay',
        component: () => import('@/views/personal/Pay.vue'),
        meta: {
            title: '赞赏支持',
            transitionClass: 'back',//前进后退
            transitionIndex: 2,
        },
    },
    {
        path: '/applyLink',
        name: 'ApplyLink',
        component: () => import('@/views/personal/ApplyLink.vue'),
        meta: {
            title: '申请友链',
            transitionClass: 'back',//前进后退
            transitionIndex: 2,
        },
    },
    {
        path: '/contact',
        name: 'Contact',
        component: () => import('@/views/personal/Contact.vue'),
        meta: {
            title: '联系博主',
            transitionClass: 'back',//前进后退
            transitionIndex: 2,
        },
    },
    {
        path: '/fontSize',
        name: 'FontSize',
        component: () => import('@/views/personal/FontSize.vue'),
        meta: {
            title: '字体设置',
            transitionClass: 'back',//前进后退
            transitionIndex: 2,
        },
    },
];
