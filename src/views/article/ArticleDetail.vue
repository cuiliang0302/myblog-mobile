<!--内容详情页-->
<template>
  <div class="detail" v-title="detail.title+'-'+sitename">
    <NavBar :componentName="'article'"></NavBar>
    <van-skeleton title round :row="10" :loading="loading">
      <div class="main">
        <div class="title">
          <h1>{{ detail.title }}</h1>
          <div class="info">
      <span class="info-item">
        <span class="info-icon">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-category-solid"></use>
          </svg>
        </span>
        <span>{{ detail.category }}</span>
      </span>
            <span class="info-item">
        <span class="info-icon">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-time-solid"></use>
          </svg>
        </span>
        <span>{{ timeDate(detail.created_time) }}</span>
      </span>
            <span class="info-item">
        <span class="info-icon">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-view-solid"></use>
          </svg>
        </span>
        <span>{{ detail.view }}</span>
      </span>
            <span class="info-item">
        <span class="info-icon">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-like-solid"></use>
          </svg>
        </span>
        <span>{{ detail.like }}</span>
      </span>
            <span class="info-item">
        <span class="info-icon">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-comment-solid"></use>
          </svg>
        </span>
        <span>{{ detail.comment }}</span>
      </span>
          </div>
        </div>
        <div class="body" ref="editor">
          <v-md-preview :text="detail.body" @image-click="showImg"></v-md-preview>
        </div>
      </div>
    </van-skeleton>
    <div class="recommend">
      <van-divider content-position="left">💖 猜你喜欢</van-divider>
      <div class="recommend-list">
        <div class="recommend-item" v-for="(item,index) in recommendList" :key="index"
             @click="toDetail(item.id)">
          <van-image :src="item.cover" radius="0.4rem" width="100%" height="3.2rem" lazy-load>
            <template v-slot:loading>
              <van-loading type="spinner" size="20"/>
            </template>
          </van-image>
          <span>{{ item.title }}</span>
        </div>
      </div>
    </div>
    <div class="comment" id="comment">
      <van-divider content-position="left">📝 评论交流</van-divider>
      <van-field
          v-model="messageForm.content"
          rows="2"
          autosize
          type="textarea"
          maxlength="50"
          placeholder="元芳，你怎么看？"
          show-word-limit
          clearable
          @click-right-icon="clickSend"
      >
        <template #right-icon>
          <svg class="icon click-send" aria-hidden="true">
            <use xlink:href="#icon-send"></use>
          </svg>
        </template>
      </van-field>
      <div class="comment-list">
        <van-empty v-show="commentsList.length === 0" description="暂无评论，快来抢沙发吧！"/>
        <Comments :commentsList="commentsList"></Comments>
      </div>
    </div>
    <div class="bottom-margin"></div>
    <Tabbar :componentName="'article'" :titleList="titleList" :is_collect="is_collect"
            @collectClick="collectClick" @rollTo="rollTo"
            @likeClick="likeClick" @onShare="onShare"></Tabbar>
    <LoginPopup ref="refLoginPopup"></LoginPopup>
  </div>
</template>

<script>
import NavBar from '@/components/datail/NavBar';
import Tabbar from '@/components/datail/Tabbar';
import Comments from '@/components/common/Comments'
import {Divider, Image as VanImage, Loading, Skeleton, Toast, Field, Empty, ImagePreview} from 'vant'
import {getCurrentInstance, nextTick, onMounted, reactive, ref, watch} from "vue";
import {useRouter, onBeforeRouteUpdate} from "vue-router";
import timeFormat from "@/utils/timeFormat";
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';
import hljs from 'highlight.js/lib/core';
import python from 'highlight.js/lib/languages/python';
import bash from 'highlight.js/lib/languages/bash';
import dockerfile from 'highlight.js/lib/languages/dockerfile';
import json from 'highlight.js/lib/languages/json';
import yaml from 'highlight.js/lib/languages/yaml';
import sql from 'highlight.js/lib/languages/sql';
import javascript from 'highlight.js/lib/languages/javascript';
import css from 'highlight.js/lib/languages/css';
import scss from 'highlight.js/lib/languages/scss';
import xml from 'highlight.js/lib/languages/xml';
import fontSize from "@/utils/fontSize";
import {getSiteConfig} from "@/api/management";
import store from "@/store";
import {
  getArticleDetail,
  getGuessLike,
  putArticleDetail,
  getQRcode
} from "@/api/blog";
import {getImgProxy} from "@/api/public";
import {
  getArticleComment,
  postArticleComment,
  deleteArticleComment,
  putArticleComment,
  postReplyArticleComment,
  postArticleHistory,
  putArticleHistory,
  getArticleHistory,
} from "@/api/record";
import user from "@/utils/user";
import LoginPopup from "@/components/common/LoginPopup";
import useClipboard from 'vue-clipboard3'

hljs.registerLanguage('json', json);
hljs.registerLanguage('python', python);
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('dockerfile', dockerfile);
hljs.registerLanguage('yaml', yaml);
hljs.registerLanguage('sql', sql);
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('scss', scss);
hljs.registerLanguage('css', css);
hljs.registerLanguage('xml', xml);
VMdPreview.use(githubTheme, {
  codeHighlightExtensionMap: {
    vue: 'xml',
    less: 'scss',
  },
  Hljs: hljs,
});
export default {
  components: {
    [Divider.name]: Divider,
    [VanImage.name]: VanImage,
    [Loading.name]: Loading,
    [Skeleton.name]: Skeleton,
    [Field.name]: Field,
    [Empty.name]: Empty,
    [ImagePreview.Component.name]: ImagePreview.Component,
    NavBar,
    Tabbar,
    Comments,
    VMdPreview,
    LoginPopup
  },
  name: "Detail",
  setup() {
    // 事件总线
    const internalInstance = getCurrentInstance();  //当前组件实例
    const $bus = internalInstance.appContext.config.globalProperties.$bus;
    const router = useRouter();
    const route = useRouter();
    // 调用公共组件模块
    let {
      sitename,
      DetailID,
      detail,
      timeDate,
      loading,
      toDetail,
      likeClick,
      onShare
    } = publicFn(route, router)
    // markdown模块
    let {titleList, editor, rollTo, getTitle, setMDFont, showImg} = markdown(titleList)
    // 文章模块
    let {recommendList, articleData, guessLikeData} = article(detail)
    // 评论回复模块
    let {messageForm, commentsList, articleCommentData, clickSend, refLoginPopup} = comment(DetailID, $bus, router)
    // 浏览记录模块
    let {is_collect, getArticleHistoryData, postArticleHistoryData, collectClick} = history(DetailID)

    // 获取文章内容详情
    async function getDetail(DetailID) {
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
      });
      await articleData(DetailID)
      await guessLikeData(DetailID)
      await articleCommentData(DetailID)
      await getArticleHistoryData(DetailID)
      await postArticleHistoryData(DetailID)
      loading.value = false;
      await setMDFont()
      await getTitle()
      window.scrollTo({top: 0})
    }

    onMounted(async () => {
      let DetailID = router.currentRoute.value.params.id
      await getDetail(DetailID)
    })
    onBeforeRouteUpdate(async (to) => {
      console.log(to)
      await getDetail(to.params.id)
    });
    return {
      sitename,
      detail,
      timeDate,
      toDetail,
      titleList,
      editor,
      recommendList,
      commentsList,
      rollTo,
      loading,
      messageForm,
      clickSend,
      refLoginPopup,
      likeClick,
      is_collect,
      collectClick,
      onShare,
      showImg
    }
  }
}

// 通用模块
function publicFn(route, router) {
  const {toClipboard} = useClipboard()
  // 站点名称
  const sitename = ref()
  // 文章ID
  const DetailID = ref()
  // 内容详情
  let detail = reactive({})
  // 文章发布日期只保留天
  let {timeDate} = timeFormat()
  // 骨架屏默认显示
  const loading = ref(true);
  // 切换新的文章
  const toDetail = (detailId) => {
    DetailID.value = detailId
    router.push({path: `/detail/article/${detailId}`})
  }
  // 点赞文章
  const likeClick = () => {
    detail.like = detail.like + 1
    putArticleDetail(DetailID.value, detail).then((response) => {
      console.log(response)
      Toast.success('点赞成功！');
      getArticleDetail(DetailID.value)
    }).catch(response => {
      //发生错误时执行的代码
      console.log(response)
      Toast.fail(response.msg);
    });
  }

  // 分享文章
  const onShare = async (name) => {
    const URL = window.location.href
    console.log(URL)
    console.log("爹收到了", name)
    if (name === '复制链接') {
      try {
        await toClipboard(URL)
        Toast.success('链接已复制至剪切板')
      } catch (e) {
        Toast.fail('剪切板调用异常！')
        console.error(e)
      }
    }
    if (name === '二维码') {
      getQRcode(URL).then((response) => {
        console.log(response)
        let blob = new Blob([response], {type: 'application/octet-stream'})
        let url = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = 'QRcode.png'
        link.click()
        Toast.success('二维码已开始下载')
      }).catch(response => {
        //发生错误时执行的代码
        console.log(response)
        Toast.fail('获取二维码失败');
      });
    }
  }

  // 获取站点名称
  async function siteConfigData() {
    let siteConfig_data = await getSiteConfig()
    sitename.value = siteConfig_data.name
  }

  onMounted(() => {
    siteConfigData()
    DetailID.value = router.currentRoute.value.params.id
  })
  return {
    sitename, DetailID, detail, timeDate, loading, toDetail, likeClick, onShare
  }
}

// markdown模块
function markdown() {
  // 引入字体设置模块
  let {rootSize} = fontSize()
  // markdown对象
  let editor = ref(null)
  // 文章标题列表
  let titleList = ref([])
  // markdown标题跳转
  const rollTo = (anchor) => {
    console.log('收到跳转请求')
    const {lineIndex} = anchor;
    const heading = editor.value.querySelector(
        `.v-md-editor-preview [data-v-md-line="${lineIndex}"]`
    );
    if (heading) {
      heading.scrollIntoView({behavior: "smooth", block: "center"})
    }
  }

  // 获取markdown标题
  async function getTitle() {
    await nextTick()
    const anchors = editor.value.querySelectorAll(
        '.v-md-editor-preview h1,h2,h3'
    )
    const titles = Array.from(anchors).filter((title) => !!title.innerText.trim());
    if (!titles.length) {
      titleList.value = [];
      return;
    }
    const hTags = Array.from(new Set(titles.map((title) => title.tagName))).sort();
    titleList.value = titles.map((el) => ({
      title: el.innerText,
      lineIndex: el.getAttribute('data-v-md-line'),
      indent: hTags.indexOf(el.tagName),
    }));
  }

  // 设置markdown字体
  async function setMDFont() {
    await nextTick()
    const html = document.querySelector('.main')
    html.style.fontSize = rootSize.value + 'px'
  }

  // 调整字体大小
  watch(rootSize, (newSize) => {
    const html = document.querySelector('.main')
    html.style.fontSize = newSize + 'px'
  });
  // 图片预览
  const showImg = (MDimages, currentIndex) => {
    ImagePreview({
      images: MDimages,
      startPosition: currentIndex,
      closeable: true,
    });
  }
  return {
    titleList, editor, rollTo, getTitle, setMDFont, showImg
  }
}

// 文章模块
function article(detail) {
  // 猜你喜欢列表
  const recommendList = ref([])

  // 获取文章详情
  async function articleData(DetailID) {
    const detail_data = await getArticleDetail(DetailID)
    for (let i in detail_data) {
      if (i === 'body') {
        // 图片防盗链处理
        detail.body = detail_data.body
        const pattern = /!\[(.*?)\]\((https:\/\/cdn.nlark.com.*?)\)/gm;
        let matcher;
        let imgArr = [];
        while ((matcher = pattern.exec(detail.body)) !== null) {
          imgArr.push(matcher[2]);
        }
        for (let i = 0; i < imgArr.length; i++) {
          detail.body = detail.body.replace(
              imgArr[i],
              getImgProxy(imgArr[i])
          );
        }
      } else {
        detail[i] = detail_data[i]
      }
    }
  }

  // 获取猜你喜欢
  async function guessLikeData(DetailID) {
    recommendList.value = await getGuessLike(DetailID)
  }

  return {
    recommendList, articleData, guessLikeData,
  }
}

// 评论回复模块
function comment(DetailID, $bus, router) {
  // 引入用户信息模块
  let {userId, isLogin} = user();
  // 留言评论列表
  const commentsList = ref([])

  // 获取文章评论数据
  async function articleCommentData(DetailID) {
    commentsList.value = await getArticleComment(DetailID)
  }

  // 提示登录组件对象
  const refLoginPopup = ref()
  // 评论表单
  const messageForm = reactive({
    content: '',
    user: '',
  })
  // 点击发表评论事件
  const clickSend = () => {
    if (isLogin.value) {
      if (messageForm.content) {
        messageForm.user = userId.value
        messageForm['article_id'] = DetailID.value
        console.log(messageForm)
        postArticleComment(messageForm).then((response) => {
          console.log(response)
          Toast.success('留言成功！');
          messageForm.content = ''
          articleCommentData(DetailID.value)
        }).catch(response => {
          //发生错误时执行的代码
          console.log(response)
          for (let i in response) {
            Toast.fail(i + response[i][0]);
          }
        });
      } else {
        Toast("一言不发，发个寂寞")
      }
    } else {
      store.commit('setNextPath', router.currentRoute.value.fullPath)
      refLoginPopup.value.showPopup()
    }
  }
  // 评论点赞事件
  if (!$bus.all.get("likeMessage")) $bus.on("likeMessage", messageId => {
    putArticleComment(messageId).then((response) => {
      console.log(response)
      Toast.success('点赞成功！');
      articleCommentData(DetailID.value)
    }).catch(response => {
      //发生错误时执行的代码
      console.log(response)
      Toast.fail(response.msg);
    });
  });
  // 评论删除事件
  if (!$bus.all.get("delMessage")) $bus.on("delMessage", messageId => {
    deleteArticleComment(messageId).then((response) => {
      console.log(response)
      Toast.success('留言删除成功！');
      articleCommentData(DetailID.value)
    }).catch(response => {
      //发生错误时执行的代码
      console.log(response)
      Toast.fail(response.msg);
    });
  });
  // 留言回复事件
  if (!$bus.all.get("replySend")) $bus.on("replySend", replyForm => {
    replyForm['article_id'] = DetailID.value
    console.log(replyForm)
    postReplyArticleComment(replyForm).then((response) => {
      console.log(response)
      Toast.success('回复成功！');
      articleCommentData(DetailID.value)
    }).catch(response => {
      //发生错误时执行的代码
      console.log(response)
      for (let i in response) {
        Toast.fail(i + response[i][0]);
      }
    });
  });
  return {
    commentsList,
    articleCommentData,
    messageForm,
    clickSend,
    refLoginPopup,
  }
}

// 浏览记录模块
function history(DetailID) {
  // 引入用户信息模块
  let {userId, isLogin} = user();
  // 文章收藏状态
  const is_collect = ref(false)

  // 获取文章浏览记录（是否已收藏）
  async function getArticleHistoryData(DetailID) {
    if (isLogin.value === true) {
      let res = await getArticleHistory(DetailID, userId.value)
      console.log(res)
      is_collect.value = res.is_collect
    }
  }

  // 添加文章浏览记录表单
  const articleHistoryForm = reactive({
    article_id: '',
    user: ''
  })

  // 添加文章浏览记录
  async function postArticleHistoryData(DetailID) {
    if (isLogin.value === true) {
      articleHistoryForm.article_id = DetailID
      articleHistoryForm.user = userId.value
      console.log(articleHistoryForm)
      let res = await postArticleHistory(articleHistoryForm)
      console.log(res)
    }
  }


  // 添加/取消收藏表单
  const CollectForm = reactive({
    user: '',
    is_collect: ''
  })
  // 子组件添加/取消收藏事件
  const collectClick = () => {
    console.log("爹收到了")
    is_collect.value = !is_collect.value
    CollectForm.user = userId.value
    CollectForm.is_collect = is_collect.value
    CollectForm['article_id'] = DetailID
    putArticleHistory(CollectForm).then((response) => {
      console.log(response)
      if (response.is_collect === true) {
        Toast.success('已添加收藏！');
      } else {
        Toast.success('已取消收藏！');
      }
    }).catch(response => {
      //发生错误时执行的代码
      console.log(response)
      Toast.fail(response.msg);
    });
  }

  return {
    is_collect,
    getArticleHistoryData,
    postArticleHistoryData,
    collectClick,
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/index.scss";

.detail {
  .main {
    @include background_color("background_color3");
    padding: 0.267rem 0.133rem;

    .title {
      h1 {
        text-align: center;
        font-size: 1.75em;
        margin: 0;
        padding: 0.4rem 0;
      }

      .info {
        display: flex;
        justify-content: center;
        margin-bottom: 0.267rem;
        font-size: 0.7em;

        .info-item {
          border-radius: 0.267rem;
          margin: 0 0.08rem;
          display: flex;
          align-items: center;
          justify-content: center;

          .info-icon {
            padding-left: 0.133rem;
            color: white;
            width: 0.533rem;
            height: 0.533rem;
            display: inline-block;
            border-radius: 0.133rem 0 0 0.133rem;

            .icon {
              width: 0.4rem;
              height: 0.4rem;
              vertical-align: -0.187rem;
            }
          }

          span:nth-child(2) {
            margin: 0 0.08rem;
            vertical-align: -0.027rem;
          }
        }

        .info-item:nth-child(1) {
          border: 1px solid #3498db;

          span:nth-child(1) {
            background-color: #3498db;
          }

          span:nth-child(2) {
            color: #3498db;
          }
        }

        .info-item:nth-child(2) {
          border: 1px solid #2ecc71;

          span:nth-child(1) {
            background-color: #2ecc71;
          }

          span:nth-child(2) {
            color: #2ecc71;
          }
        }

        .info-item:nth-child(3) {
          border: 1px solid #f1c40f;

          span:nth-child(1) {
            background-color: #f1c40f;
          }

          span:nth-child(2) {
            color: #f1c40f;
          }
        }

        .info-item:nth-child(4) {
          border: 1px solid #e67e22;

          span:nth-child(1) {
            background-color: #e67e22;
          }

          span:nth-child(2) {
            color: #e67e22;
          }
        }

        .info-item:nth-child(5) {
          border: 1px solid #9b59b6;

          span:nth-child(1) {
            background-color: #9b59b6;
          }

          span:nth-child(2) {
            color: #9b59b6;
          }
        }
      }
    }

    .body {
      margin: 0 0.267rem;
    }
  }

  .recommend {
    margin: 0.133rem 0;
    @include background_color("background_color3");
    padding: 0.267rem 0.133rem;

    .recommend-list {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;

      .recommend-item {
        position: relative;
        margin: 0.133rem;
        width: 45%;

        span {
          position: absolute;
          left: 50%;
          bottom: 0;
          transform: translate(-50%, -25%);
          background-color: rgba(0, 0, 0, 0.3);
          color: white;
          width: 4rem;
          height: 0.347rem;
          text-align: center;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }

  .comment {
    @include background_color("background_color3");
    padding: 0 0.267rem 1.867rem 0.267rem;

    .click-send {
      color: $color-primary;
      width: 0.933rem;
      height: 0.933rem;
      position: absolute;
      right: 0;
      top: 0;
    }
  }
}


.bottom-margin {
  margin-bottom: 1.333rem;
}

.van-divider--content-left::before {
  max-width: 0;
}

.van-divider {
  font-size: 0.533rem;
}

.van-divider {
  margin: 0;
  padding: 0.267rem 0;
}

.v-md-editor-preview {
  padding: 0;
}

.van-empty {
  padding: 0 !important;
}
</style>
