export default [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/home/Home.vue'),
    meta: {
      title: '崔亮的博客',
      transitionClass: 'gradually',//渐入
      transitionIndex: 1,
    }
  },
  {
    path: '/category/:id(\\d*)',
    name: 'Category',
    component: () => import('@/views/article/Category.vue'),
    meta: {
      title: '文章分类',
      transitionClass: 'gradually',//渐入
      transitionIndex: 1,
    }
  },
  {
    path: '/detail/article/:id(\\d*)',
    name: 'ArticleDetail',
    component: () => import('@/views/article/ArticleDetail.vue'),
    meta: {
      title: '文章正文',
      transitionClass: 'back',//前进后退
      transitionIndex: 2,
    }
  },
  {
    path: '/note',
    name: 'Note',
    component: () => import('@/views/note/Note.vue'),
    meta: {
      title: '笔记列表',
      transitionClass: 'gradually',//渐入
      transitionIndex: 1,
    }
  },
  {
    path: '/catalog/:id(\\d*)',
    name: 'Catalog',
    component: () => import('@/views/note/Catalog.vue'),
    meta: {
      title: '笔记目录',
      transitionClass: 'back',//前进后退
      transitionIndex: 2,
    }
  },
  {
    path: '/detail/section/:id(\\d*)',
    name: 'SectionDetail',
    component: () => import('@/views/note/SectionDetail.vue'),
    meta: {
      title: '笔记正文',
      transitionClass: 'back',//前进后退
      transitionIndex: 2,
    }
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('@/views/public/Search.vue'),
    meta: {
      title: '搜索',
      transitionClass: 'gradually',//渐入
      transitionIndex: 1,
    }
  },
  {
    path: '/result',
    name: 'Result',
    component: () => import('@/views/public/Result.vue'),
    meta: {
      title: '搜索结果',
      transitionClass: 'back',//渐入
      transitionIndex: 2,
    }
  },
  {
    path: '/tag/:id(\\d*)',
    name: 'Tag',
    component: () => import('@/views/public/Tag.vue'),
    meta: {
      title: '标签',
      transitionClass: 'jump',//跳跃
      transitionIndex: 1,
    }
  },
  {
    path: '/classify',
    name: 'Classify',
    component: () => import('@/views/public/Classify.vue'),
    meta: {
      title: '归档',
      transitionClass: 'jump',//跳跃
      transitionIndex: 1,
    }
  },
  {
    path: '/message',
    name: 'Message',
    component: () => import('@/views/public/Message.vue'),
    meta: {
      title: '留言板',
      transitionClass: 'gradually',//跳跃
      transitionIndex: 1,
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/public/About.vue'),
    meta: {
      title: '关于',
      transitionClass: 'jump',//跳跃
      transitionIndex: 1,
    }
  },
  {
    path: '/link',
    name: 'Link',
    component: () => import('@/views/public/Link.vue'),
    meta: {
      title: '友情链接',
      transitionClass: 'jump',//跳跃
      transitionIndex: 1,
    }
  },
  {
    path: '/demo',
    name: 'demo',
    component: () => import('@/views/Demo.vue'),
    meta: {
      title: 'demo',
    }
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('@/views/Test.vue'),
    meta: {
      title: 'test',
    }
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404.vue'),
    meta: {
      title: '404-页面找不到',
      transitionClass: 'back',//前进后退
      transitionIndex: 2,
    }
  },
  // {
  //   path: '/:pathMatch(.*)',
  //   redirect: '/404'
  // },
];
