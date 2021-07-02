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
  <van-popup v-model:show="QRcode_show">
    <van-image width="9.333rem" height="9.333rem" :src="QRcode_url">
      <template v-slot:loading>
        <van-loading type="spinner" size="20"/>
      </template>
    </van-image>
  </van-popup>
  <LoginPopup ref="refLoginPopup"></LoginPopup>
  <van-config-provider :theme-vars="themeVars">
    <van-overlay :show="overlay_show">
      <div class="wrapper" @click.stop @click="overlay_show=false">
        <div v-if="isWeChat()" class="wechat">
          <span>
            <img :src="require('@/assets/icon/share-point.png')" alt="">
          </span>
          <span>
            点击右上角"
          <van-icon name="ellipsis"/>
          "
          <br>分享给朋友吧！
          </span>
        </div>
        <div v-else class="browser">
            <span>
              当前浏览器暂不支持直接分享
              <br>请打开浏览器的菜单
              <br>点击"
              <van-icon name="wap-nav"/>
              "或"
              <van-icon name="share"/>
              "
              分享
            </span>
        </div>

      </div>
    </van-overlay>
  </van-config-provider>
</template>

<script>
import {
  Tabbar,
  TabbarItem,
  ShareSheet,
  Toast,
  Popup,
  Tab,
  Tabs,
  Empty,
  Loading,
  Image as VanImage,
  Overlay,
  Icon,
  ConfigProvider
} from 'vant';
import {onMounted, ref} from "vue";
import {useRouter, onBeforeRouteUpdate} from "vue-router";
import user from "@/utils/user";
import LoginPopup from "@/components/common/LoginPopup";
import {getQRcode} from "@/api/blog";
import useClipboard from "vue-clipboard3";
import store from "@/store";

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
    [VanImage.name]: VanImage,
    [Overlay.name]: Overlay,
    [Icon.name]: Icon,
    [ConfigProvider.name]: ConfigProvider,
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
    let {
      options,
      onSelect,
      showShare,
      QRcode_show,
      QRcode_url,
      isWeChat,
      overlay_show,
      themeVars
    } = fnShare(props, {emit})
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
      refLoginPopup,
      QRcode_show,
      QRcode_url,
      isWeChat,
      overlay_show,
      themeVars
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
  const {toClipboard} = useClipboard()
  const showShare = ref(false);
  const QRcode_show = ref(false)
  const overlay_show = ref(false);
  const QRcode_url = ref()
  const options = [
    [
      {name: 'QQ空间', icon: require('@/assets/icon/qq-zone.png')},
      {name: '微博', icon: 'weibo'},
      {name: 'QQ', icon: 'qq'},
      {name: '微信', icon: 'wechat'},
      {name: '朋友圈', icon: 'wechat-moments'},
    ],
    [
      {name: '复制链接', icon: 'link'},
      {name: '二维码', icon: 'qrcode'}
    ],
  ];
  const isWeChat = () => {
    let ua = window.navigator.userAgent.toLowerCase();
    //通过正则表达式匹配ua中是否含有MicroMessenger字符串
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
      return true;
    } else {
      return false;
    }
  }
  const onSelect = async (option) => {
    const URL = window.location.href
    showShare.value = false;
    if (option.name === '复制链接') {
      try {
        await toClipboard(URL)
        Toast.success('链接已复制至剪切板')
      } catch (e) {
        Toast.fail('剪切板调用异常！')
        console.error(e)
      }
    }
    if (option.name === '二维码') {
      QRcode_show.value = true
      getQRcode(URL).then((response) => {
        console.log(response)
        QRcode_url.value = response.url
      }).catch(response => {
        //发生错误时执行的代码
        console.log(response)
        Toast.fail('获取二维码失败');
      });
    }
    if (option.name === '微博') {
      let title = document.title; // 分享出去得文章得标题
      window.open('http://service.weibo.com/share/share.php?appkey=&title=' + title +
          '&url=' + encodeURIComponent(document.location) + '&searchPic=false&style=simple"');
    }
    if (option.name === 'QQ' || option.name === '微信' || option.name === '朋友圈') {
      overlay_show.value = true
    }
    if (option.name === 'QQ空间') {
      let title = document.title; // 分享出去得文章得标题
      let logo = 'https://oss.cuiliangblog.cn/images/logo.png'; // 分享出去logo
      window.open('https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=' +
          encodeURIComponent(document.location) + '?sharesource=qzone&title=' + title + '&pics=' + logo + '&summary=' + '');
    }
  }
  const themeVars = {
    overlayZIndex: '2'
  }
  onMounted(() => {
    const zone = document.createElement('script');
    zone.type = 'text/javascript';
    zone.src = 'https://qzonestyle.gtimg.cn/qzone/app/qzlike/qzopensl.js#jsdate=20111201';
    document.body.appendChild(zone);
  })
  return {
    options,
    onSelect,
    showShare,
    QRcode_show,
    QRcode_url,
    isWeChat,
    overlay_show,
    themeVars
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
  const router = useRouter()
  // 提示登录组件对象
  const refLoginPopup = ref()
  let {userId, isLogin} = user();
  const collectionClick = () => {
    console.log(props.is_collect)
    if (isLogin.value === true) {
      console.log("登录了")
      emit('collectClick')
    } else {
      store.commit('setNextPath', router.currentRoute.value.fullPath)
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

.wrapper {
  color: white;
  font-size: 20px;
  text-align: center;
  line-height: 40px;
  height: 100%;

  .browser {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  .wechat {
    margin-right: 30px;
    display: flex;
    align-items: center;
    flex-direction: row-reverse;

    img {
      width: 70px;
    }
  }
}
</style>
