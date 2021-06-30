<template>
  <van-tabbar v-model="active" safe-area-inset-bottom>
    <van-tabbar-item>
      <span>目录</span>
      <template #icon="props">
        <img :src="props.active ? directory.active : directory.inactive" @click="directoryClick"/>
      </template>
    </van-tabbar-item>
    <van-tabbar-item>
      <span>评论</span>
      <template #icon="props">
        <img :src="props.active ? comment.active : comment.inactive" @click="commentClick"/>
      </template>
    </van-tabbar-item>
    <van-tabbar-item>
      <span>{{ isLike === true ? '已点赞' : '点赞' }}</span>
      <template #icon="props">
        <img :src="props.active ? like.active : like.inactive" @click="likeClick"/>
      </template>
    </van-tabbar-item>
    <van-tabbar-item>
      <span>{{ is_collect === true ? '已收藏' : '收藏' }}</span>
      <template #icon="props">
        <img :src="props.active ? collection.active : collection.inactive" @click="collectionClick"/>
      </template>
    </van-tabbar-item>
    <van-tabbar-item>
      <span>分享</span>
      <template #icon="props">
        <img :src="props.active ? share.active : share.inactive" @click="showShare = true"/>
      </template>
    </van-tabbar-item>
  </van-tabbar>
  <van-share-sheet
      v-model:show="showShare"
      title="立即分享给好友"
      :options="options"
      @select="onSelect"
  />
  <van-popup v-model:show="showDir"
             position="bottom"
             :style="{ height: '75%' }"
             closeable
             close-icon="close"
             close-on-popstate
             safe-area-inset-bottom
             overlay-class="my-overlay"
  >
    <div class="directory">
      <van-tabs v-model:active="activeDir" color="#409EFF" @change="tabChange">
        <van-tab title="大纲">
          <div class="content">
            <div v-if="titleList.length !== 0">
              <p v-for="(anchor,index) in titleList" :key="anchor.lineIndex"
                 :style="{ padding: `0px 0 0px ${anchor.indent * 15}px` }"
                 @click="rollTo(anchor)"
              >
                {{ anchor.title }}
              </p>
            </div>
            <div v-else>
              <van-empty description="本篇文章暂无大纲"/>
            </div>
          </div>
        </van-tab>
        <van-tab v-if="componentName==='note'" title="目录">
          <div v-if="catalogList.length === 0">
            <van-loading size="0.8rem" text-color="#409EFF" vertical>
              玩命加载中...
            </van-loading>
          </div>
          <div v-else class="catalog">
            <span v-for="(item,index) in catalogList" :key="item.id">
              第{{ index + 1 }}章：{{ item.name }}
                <p v-if="item && item.child" v-for="(title,index) in item.child" :key="title.id"
                   @click="toDetail(title.section_id)">
                  {{ index + 1 }}. {{ title.name }}
                </p>
            </span>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </van-popup>
  <LoginPopup ref="refLoginPopup"></LoginPopup>
</template>

<script>
import {Tabbar, TabbarItem, ShareSheet, Toast, Popup, Tab, Tabs, Empty, Loading} from 'vant';
import {ref} from "vue";
import {useRouter, onBeforeRouteUpdate} from "vue-router";
import user from "@/utils/user";
import LoginPopup from "@/components/common/LoginPopup";

export default {
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [ShareSheet.name]: ShareSheet,
    [Popup.name]: Popup,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Empty.name]: Empty,
    [Loading.name]: Loading,
    LoginPopup
  },
  props: {
    // markdown标题
    titleList: {
      type: Array,
      default() {
        return []
      }
    },
    // 笔记目录
    catalogList: {
      type: Array,
      default() {
        return []
      }
    },
    // 当前显示的组件
    componentName: {
      type: String,
      default() {
        return 'article'
      }
    },
    // 是否已收藏
    is_collect: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  name: "Tabbar",
  emits: ['rollTo', 'dirTab', 'toNoteDetail', 'likeClick', 'collectClick', 'onShare'],
  setup(props, {emit}) {
    // 调用图标切换模块
    let {directory, comment, like, collection, share} = fnIcon()
    // 调用大纲模块
    let {directoryClick, showDir, activeDir, rollTo, tabChange, toDetail} = fnDirectory(props, {emit})
    // 调用分享模块
    let {options, onSelect, showShare} = fnShare(props, {emit})
    // 调用点赞模块
    let {isLike, likeClick} = fnLike(props, {emit})
    // 调用收藏模块
    let {collectionClick, refLoginPopup} = fnCollection(props, {emit})
    // 调用评论模块
    let {commentClick} = fnComment()
    // 调用公共模块
    let {active} = fnPublic(isLike)
    return {
      active,
      directory,
      comment,
      like,
      collection,
      share,
      options,
      onSelect,
      showShare,
      likeClick,
      isLike,
      collectionClick,
      commentClick,
      directoryClick,
      showDir,
      activeDir,
      rollTo,
      tabChange,
      toDetail,
      refLoginPopup
    };
  },
}

// 公共模块
function fnPublic(isLike) {
  // 当前选中的tabbar
  const active = ref('');
  // 切换页面，可重新点赞
  onBeforeRouteUpdate(() => {
    isLike.value = false
    active.value = ''
  });
  return {
    active
  }
}

// 图标切换功能模块
function fnIcon() {
  // 目录图标切换效果
  const directory = {
    active: require('@/assets/icon/directory-active.png'),
    inactive: require('@/assets/icon/directory.png'),
  }
  // 评论图标切换效果
  const comment = {
    active: require('@/assets/icon/comment-active.png'),
    inactive: require('@/assets/icon/comment.png'),
  }
  // 点赞图标切换效果
  const like = {
    active: require('@/assets/icon/like-active.png'),
    inactive: require('@/assets/icon/like.png'),
  }
  // 收藏图标切换效果
  const collection = {
    active: require('@/assets/icon/collection-active.png'),
    inactive: require('@/assets/icon/collection.png'),
  }
  // 分享图标切换效果
  const share = {
    active: require('@/assets/icon/share-active.png'),
    inactive: require('@/assets/icon/share.png'),
  }
  return {
    directory, comment, like, collection, share
  }
}

// 大纲功能模块
function fnDirectory(props, {emit}) {
  const activeDir = ref(0)
  const showDir = ref(false);
  // 大纲菜单打开
  const directoryClick = () => {
    showDir.value = true;
  };
  // title跳转事件
  const rollTo = (height) => {
    console.log("点击title了")
    emit('rollTo', height)
    showDir.value = false
  }
  // 大纲目录Tab切换
  const tabChange = (index) => {
    emit('dirTab', index)
  }
  // 点击获取其他笔记内容
  const toDetail = (detailID) => {
    console.log(detailID)
    emit('toNoteDetail', detailID)
    showDir.value = false
  }
  return {
    activeDir,
    showDir,
    directoryClick,
    rollTo,
    tabChange,
    toDetail,
  };
}

//分享功能模块
function fnShare(props, {emit}) {
  const showShare = ref(false);
  const options = [
    [
      {name: '微信', icon: 'wechat'},
      {name: '朋友圈', icon: 'wechat-moments'},
      {name: '微博', icon: 'weibo'},
      {name: 'QQ', icon: 'qq'},
      {name: 'QQ空间', icon: require('@/assets/icon/qq-zone.png')},
    ],
    [
      {name: '复制链接', icon: 'link'},
      {name: '系统分享', icon: require('@/assets/icon/share-system.png')},
      {name: '二维码', icon: 'qrcode'},
      {name: '分享海报', icon: 'poster'},
      {name: '小程序码', icon: 'weapp-qrcode'},
    ],
  ];
  const onSelect = (option) => {
    Toast(option.name + '分享功能正在开发中');
    showShare.value = false;
    emit('onShare', option.name)
  };

  return {
    options,
    onSelect,
    showShare,
  };
}

// 点赞功能模块
function fnLike(props, {emit}) {
  // 是否已点赞
  const isLike = ref(false)
  const likeClick = () => {
    if (isLike.value === false) {
      console.log("要点赞了")
      console.log(isLike.value)
      isLike.value = true
      emit('likeClick')
    }
  };
  return {
    isLike,
    likeClick,
  };
}

// 收藏功能模块
function fnCollection(props, {emit}) {
  // 提示登录组件对象
  const refLoginPopup = ref()
  let {userId, isLogin} = user();
  const collectionClick = () => {
    console.log(props.is_collect)
    if (isLogin.value === true) {
      console.log("登录了")
      emit('collectClick')
    } else {
      refLoginPopup.value.showPopup()
    }
  };

  return {
    refLoginPopup,
    collectionClick,
  };
}

// 评论功能模块
function fnComment() {
  const router = useRouter()
  const commentClick = () => {
    const returnEle = document.querySelector("#comment");  //productId是将要跳转区域的id
    if (!!returnEle) {
      returnEle.scrollIntoView({behavior: 'smooth'}); // true 是默认的
    }
  };
  return {
    commentClick,
  };
}


</script>

<style lang="scss" scoped>
.directory {
  padding: 0.267rem 0.533rem;

  .content {
    height: 62vh;
    overflow: auto;

    p {
      font-size: 0.373rem;
      line-height: 0.533rem;
    }
  }

  .catalog {
    height: 62vh;
    overflow: auto;
    font-size: 0.373rem;
    margin-top: 0.4rem;

    p {
      text-indent: 1em;
    }
  }
}
</style>
