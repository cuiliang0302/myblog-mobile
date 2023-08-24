<!--笔记内容详情页-->
<template>
  <div class="detail" v-title="(detail.title?detail.title:'笔记正文')+'-'+(sitename?sitename:'')">
    <DetailNavBar :componentName="'note'"></DetailNavBar>
    <van-skeleton title round :row="10" :loading="loading">
      <div class="main">
        <div class="title">
          <h1>{{ detail.title }}</h1>
          <div class="info">
      <span class="info-item">
        <span class="info-icon">
          <MyIcon class="icon" type="icon-category-solid"/>
        </span>
        <span>{{ detail.note }}</span>
      </span>
            <span class="info-item">
        <span class="info-icon">
          <MyIcon class="icon" type="icon-time-solid"/>
        </span>
        <span>{{ timeDate(detail.created_time) }}</span>
      </span>
            <span class="info-item">
        <span class="info-icon">
          <MyIcon class="icon" type="icon-view-solid"/>
        </span>
        <span>{{ detail.view }}</span>
      </span>
            <span class="info-item">
        <span class="info-icon">
          <MyIcon class="icon" type="icon-like-solid"/>
        </span>
        <span>{{ detail.like }}</span>
      </span>
            <span class="info-item">
        <span class="info-icon">
          <MyIcon class="icon" type="icon-comment-solid"/>
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
              <MyIcon class="icon context-icon" type="icon-last-solid"/>
            </span>
        <span v-if="context.last && context.last.title" @click="toDetail(context.last.id)">
              {{ context.last.title }}
            </span>
        <span v-else>已是第一篇</span>
      </div>
      <div class="next">
            <span>
              <MyIcon class="icon context-icon" type="icon-next-solid"/>
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
          <MyIcon class="icon click-send" type="icon-send"/>
        </template>
      </van-field>
      <div class="comment-list">
        <van-empty v-show="commentsList.length === 0" description="暂无评论，快来抢沙发吧！"/>
        <Comments :commentsList="commentsList"></Comments>
      </div>
    </div>
    <div class="bottom-margin"></div>
    <DetailTabbar :componentName="'note'" :titleList="titleList" :catalogList="catalogList" :is_collect="is_collect"
                  :sectionID="detail.id"
                  @collectClick="collectClick" @rollTo="rollTo"
                  @dirTab="getCatalogueData" @toNoteDetail="toDetail" @likeClick="likeClick"
                  @onShare="onShare"></DetailTabbar>
    <LoginPopup ref="loginPopupRef"></LoginPopup>
  </div>
</template>

<script setup>
import DetailNavBar from '@/components/detail/DetailNavBar.vue';
import DetailTabbar from '@/components/detail/DetailTabbar.vue';
import LoginPopup from "@/components/common/LoginPopup.vue";
import Comments from '@/components/common/Comments.vue'
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
import store from "@/store/index";
import {
  getCatalogueList,
  getContext,
  getQRcode, getSectionDetail, postLike
} from "@/api/blog";
import {getImgProxy} from "@/api/public";
import {
  getSectionComment,
  postSectionComment,
  patchSectionComment,
  deleteSectionComment,
  postReplySectionComment, getSectionHistory, postSectionHistory, putSectionHistory
} from "@/api/record";
import user from "@/utils/user";
import icon from '@/utils/icon'
let {MyIcon} = icon()
// 引入用户信息模块
let {userId, isLogin} = user();
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
// markdown对象
const editor = ref(null)
// 调用公共组件模块
let {sitename, DetailID, timeDate, loading, toDetail, router} = publicFn()

// 调用笔记模块
let {detail, getDetail, context, getContextData} = section(DetailID)
// 调用markdown模块
let {showImg, setMDFont} = markdown()

// 提示登录组件对象
const loginPopupRef = ref(null)
// 调用评论回复模块
let {messageForm, commentsList, sectionCommentData,clickSend} = comment(DetailID, router,loginPopupRef)
// 调用tabbar模块
let {
  titleList,
  getTitle,
  rollTo,
  is_collect,
  collectClick,
  likeClick,
  onShare,
  getSectionHistoryData,
  postSectionHistoryData,
  getCatalogueData,
  catalogList
} = tabbarFn(editor, DetailID, detail)
onMounted(async () => {
  window.scrollTo({top: 0})
  await getDetail(DetailID.value)
  await setMDFont()
  await getTitle()
  await postSectionHistoryData(DetailID.value)
  await getCatalogueData()
})
onBeforeRouteUpdate(async (to) => {
  window.scrollTo({top: 0})
  console.log(to)
  DetailID.value = to.params.id
  await getDetail(DetailID.value)
  await setMDFont()
  await getTitle()
  await getContextData(DetailID.value)
  await sectionCommentData(DetailID.value)
  await getSectionHistoryData(DetailID.value)
  await postSectionHistoryData(DetailID.value)
});

// 公共组件模块
function publicFn() {
  const router = useRouter();
  // 站点名称
  const sitename = ref()
  // 笔记ID
  const DetailID = ref()
  // 笔记发布日期只保留天
  let {timeDate} = timeFormat()
  // 骨架屏默认显示
  const loading = ref(true);

  // 获取站点名称
  async function siteConfigData() {
    let siteConfig_data = await getSiteConfig()
    sitename.value = siteConfig_data.name
  }

  // 切换新的笔记
  const toDetail = (detailId) => {
    DetailID.value = detailId
    router.push({path: `/detail/section/${detailId}`})
  }
  onMounted(() => {
    siteConfigData()
    DetailID.value = router.currentRoute.value.params.id
    loading.value = false
  })
  return {
    sitename, DetailID, timeDate, loading, toDetail, router
  }
}

// 笔记模块
function section(DetailID) {
  // 笔记详情
  const detail = reactive({})

  // 获取笔记内容详情
  async function getDetail(DetailID) {
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
    });
    let detail_data = await getSectionDetail(DetailID)
    console.log(detail_data)
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

  // 笔记上下篇
  const context = reactive({})

  // 获取笔记上下篇
  async function getContextData() {
    const context_data = await getContext(DetailID.value)
    for (let i in context_data) {
      context[i] = context_data[i]
    }
  }

  onMounted(() => {
    getContextData()
  })
  return {detail, getDetail, context, getContextData}
}

// markdown模块
function markdown() {
  // 引入字体设置模块
  let {rootSize} = fontSize()
  // 图片预览
  const showImg = (MDimages, currentIndex) => {
    ImagePreview({
      images: MDimages,
      startPosition: currentIndex,
      closeable: true,
    });
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
  return {showImg, setMDFont}
}

// 评论回复模块
function comment(DetailID, router,loginPopupRef) {
  // 事件总线
  const internalInstance = getCurrentInstance();  //当前组件实例
  const $bus = internalInstance.appContext.config.globalProperties.$bus;
  // 留言评论列表
  const commentsList = ref([])

  // 获取笔记评论数据
  async function sectionCommentData() {
    commentsList.value = await getSectionComment(DetailID.value)
    console.log(commentsList.value)
  }
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
        Toast("请先输入内容再提交")
      }
    } else {
      store.commit('setNextPath', router.currentRoute.value.fullPath)
      loginPopupRef.value.showPopup()
    }
  }
  // 评论点赞事件
  if (!$bus.all.get("likeMessage")) $bus.on("likeMessage", value => {
    const params = {'like': value.like}
    patchSectionComment(value.id,params).then((response) => {
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
  onMounted(() => {
    sectionCommentData()
  })
  return {
    commentsList,
    sectionCommentData,
    messageForm,
    clickSend,
  }
}

// tabbar模块
function tabbarFn(editor, DetailID, detail) {
  // 引入用户信息模块
  let {userId, isLogin} = user();
  // 笔记标题列表
  let titleList = ref([])

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
  // 笔记目录
  const catalogList = ref([])
  // 子组件获取笔记内容
  const toNoteDetail = (sectionId) => {
    toDetail('note', sectionId)
  }

  // 获取笔记目录数据
  async function getCatalogueData() {
    catalogList.value = await getCatalogueList(detail.note_id)
    console.log(catalogList.value)
  }

  // 笔记收藏状态
  const is_collect = ref(false)

  // 获取笔记浏览记录（是否已收藏）
  async function getSectionHistoryData() {
    if (isLogin.value === true) {
      let res = await getSectionHistory(DetailID.value, userId.value)
      console.log(res)
      is_collect.value = res.is_collect
      console.log(is_collect.value)
    }
  }

  // 添加笔记浏览记录表单
  const sectionHistoryForm = reactive({
    section_id: '',
    user: ''
  })

  // 添加笔记浏览记录
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
    console.log("添加/取消收藏")
    console.log("当前收藏状态是", is_collect.value)
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
  // 点赞笔记
  const likeClick = () => {
    const params = {id: DetailID.value, 'kind': 'section'}
    postLike(params).then((response) => {
      console.log(response)
      Toast.success('笔记点赞成功！');
      detail.like = detail.like + 1
    }).catch(response => {
      //发生错误时执行的代码
      console.log(response)
      Toast.fail(response.msg);
    });
  }

  // 分享笔记
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
  onMounted(() => {
    getSectionHistoryData()
  })
  return {
    titleList,
    getTitle,
    rollTo,
    postSectionHistoryData,
    getSectionHistoryData,
    is_collect,
    collectClick,
    likeClick,
    onShare,
    getCatalogueData,
    catalogList
  }
}
</script>

<style lang="scss" scoped>
@import "src/assets/style/index.scss";

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
            height: 100%;
            display: inline-block;
            border-radius: 0.133rem 0 0 0.133rem;
            position: relative;
            .icon {
              transform: translate(0%, -50%);
              position: absolute;
              top: 50%;
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
      font-size: 1.067rem;
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
