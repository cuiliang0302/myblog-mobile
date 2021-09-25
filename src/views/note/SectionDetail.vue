<!--内容详情页-->
<template>
  <div class="detail" v-title="detail.title+'-'+sitename">
    <NavBar :componentName="'note'"></NavBar>
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
        <span>{{ detail.note }}</span>
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
    <div class="context">
      <div class="last">
        <span>
          <svg class="icon context-icon" aria-hidden="true">
            <use xlink:href="#icon-last-solid"></use>
          </svg>
        </span>
        <span v-if="context.last && context.last.title" @click="toDetail(context.last.id)">
          {{ context.last.title }}
        </span>
        <span v-else>已是第一篇</span>
      </div>
      <div class="next">
        <span>
          <svg class="icon context-icon" aria-hidden="true">
            <use xlink:href="#icon-next-solid"></use>
          </svg>
        </span>
        <span v-if="context.next && context.next.title" @click="toDetail(context.next.id)">
          {{ context.next.title }}
        </span>
        <span v-else>已是最后一篇</span>
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
    <Tabbar :componentName="'note'" :titleList="titleList" :catalogList="catalogList" :is_collect="is_collect"
            @collectClick="collectClick" @rollTo="rollTo"
            @dirTab="dirTab" @toNoteDetail="toNoteDetail" @likeClick="likeClick" @onShare="onShare"></Tabbar>
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
  getCatalogue,
  getContext,
  getSectionDetail,
  putSectionDetail,
  getQRcode
} from "@/api/blog";
import {getImgProxy} from "@/api/public";
import {
  getSectionComment,
  postSectionComment,
  deleteSectionComment,
  putSectionComment,
  postReplySectionComment,
  getSectionHistory,
  postSectionHistory,
  putSectionHistory
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
    } = publicFn(route, router, sectionData)
    // markdown模块
    let {titleList, editor, rollTo, getTitle, setMDFont, showImg} = markdown(titleList)
    // 笔记模块
    let {context, catalogList, dirTab, toNoteDetail, sectionData, contextData} = note(detail, toDetail)
    // 评论回复模块
    let {
      messageForm,
      commentsList,
      sectionCommentData,
      clickSend,
      refLoginPopup
    } = comment(DetailID, $bus, router)
    // 浏览记录模块
    let {
      is_collect,
      collectClick,
      getSectionHistoryData,
      postSectionHistoryData
    } = history(DetailID)

    // 获取内容详情
    async function getDetail(DetailID) {
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
      });
      await sectionData(DetailID)
      await contextData(DetailID)
      await sectionCommentData(DetailID)
      await getSectionHistoryData(DetailID)
      await postSectionHistoryData(DetailID)
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
      commentsList,
      rollTo,
      loading,
      context,
      dirTab,
      catalogList,
      toNoteDetail,
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
  // 文章笔记ID
  const DetailID = ref()
  // 内容详情
  let detail = reactive({})
  // 文章发布日期只保留天
  let {timeDate} = timeFormat()
  // 骨架屏默认显示
  const loading = ref(true);
  // 切换新的文章或笔记
  const toDetail = (detailId) => {
    DetailID.value = detailId
    router.push({path: `/detail/section/${detailId}`})
  }
  // 点赞文章或笔记
  const likeClick = () => {
    detail.like = detail.like + 1
    putSectionDetail(DetailID.value, detail).then((response) => {
      console.log(response)
      Toast.success('点赞成功！');
      getSectionDetail(DetailID.value)
    }).catch(response => {
      //发生错误时执行的代码
      console.log(response)
      Toast.fail(response.msg);
    });
  }

  // 分享文章或笔记
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
    sitename, DetailID,  detail, timeDate, loading, toDetail, likeClick, onShare
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

// 笔记模块
function note(detail, toDetail) {
  // 笔记上下篇
  const context = reactive({})
  // 笔记目录
  const catalogList = ref([])
  // 获取笔记目录
  const dirTab = () => {
    catalogueData(detail.note_id)
  }
  // 子组件获取笔记内容
  const toNoteDetail = (sectionId) => {
    toDetail('note', sectionId)
  }

  // 获取笔记目录数据
  async function catalogueData(note_id) {
    catalogList.value = await getCatalogue(note_id)
    console.log(catalogList.value)
  }

  // 获取笔记详情
  async function sectionData(DetailID) {
    const detail_data = await getSectionDetail(DetailID)
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

  // 获取笔记上下篇
  async function contextData(DetailID) {
    const context_data = await getContext(DetailID)
    for (let i in context_data) {
      context[i] = context_data[i]
    }
  }

  return {
    context, catalogList, dirTab, toNoteDetail, catalogueData, sectionData, contextData
  }
}

// 评论回复模块
function comment(DetailID, $bus, router) {
  // 引入用户信息模块
  let {userId, isLogin} = user();
  // 留言评论列表
  const commentsList = ref([])

  // 获取笔记评论数据
  async function sectionCommentData(DetailID) {
    commentsList.value = await getSectionComment(DetailID)
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
        messageForm['section_id'] = DetailID.value
        console.log(messageForm)
        postSectionComment(messageForm).then((response) => {
          console.log(response)
          Toast.success('留言成功！');
          messageForm.content = ''
          sectionCommentData(DetailID.value)
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
    putSectionComment(messageId).then((response) => {
      console.log(response)
      Toast.success('点赞成功！');
      sectionCommentData(DetailID.value)
    }).catch(response => {
      //发生错误时执行的代码
      console.log(response)
      Toast.fail(response.msg);
    });
  });
  // 评论删除事件
  if (!$bus.all.get("delMessage")) $bus.on("delMessage", messageId => {
    deleteSectionComment(messageId).then((response) => {
      console.log(response)
      Toast.success('留言删除成功！');
      sectionCommentData(DetailID.value)
    }).catch(response => {
      //发生错误时执行的代码
      console.log(response)
      Toast.fail(response.msg);
    });
  });
  // 留言回复事件
  if (!$bus.all.get("replySend")) $bus.on("replySend", replyForm => {
    replyForm['section_id'] = DetailID.value
    console.log(replyForm)
    postReplySectionComment(replyForm).then((response) => {
      console.log(response)
      Toast.success('回复成功！');
      sectionCommentData(DetailID.value)
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
    sectionCommentData,
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

  // 获取笔记浏览记录（是否已收藏）
  async function getSectionHistoryData(DetailID) {
    if (isLogin.value === true) {
      let res = await getSectionHistory(DetailID, userId.value)
      console.log(res)
      is_collect.value = res.is_collect
    }
  }

  // 添加笔记浏览记录表单
  const sectionHistoryForm = reactive({
    section_id: '',
    user: ''
  })

  // 添加文章浏览记录
  async function postSectionHistoryData(DetailID) {
    if (isLogin.value === true) {
      sectionHistoryForm.section_id = DetailID
      sectionHistoryForm.user = userId.value
      console.log(sectionHistoryForm)
      let res = await postSectionHistory(sectionHistoryForm)
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
    CollectForm['section_id'] = DetailID
    putSectionHistory(CollectForm).then((response) => {
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
    collectClick,
    getSectionHistoryData,
    postSectionHistoryData
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

  .context {
    display: flex;
    @include background_color("background_color4");
    font-size: 16px;
    color: $color-text-primary;

    div {
      flex: 1;
      margin: 10px;
      @include background_color("background_color5");
      border-radius: 5px;
    }

    .last {
      padding: 5px 5px 5px 0;
      display: flex;
      align-items: center;
    }

    .next {
      padding: 5px 0 5px 5px;
      display: flex;
      align-items: center;
      flex-direction: row-reverse;
    }

    .context-icon {
      color: $color-primary;
      margin: 0 0.267rem;
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