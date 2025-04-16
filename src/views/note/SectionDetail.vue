<!--笔记内容详情页-->
<template>
  <div class="detail" v-title="(detail.title?detail.title:'笔记正文')+'-'+(site_name?site_name:'')">
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
import {ref, onMounted, reactive, onUnmounted,getCurrentInstance} from "vue";
import Management from "@/api/management";
import {
  showLoadingToast,
  showImagePreview,
  showSuccessToast,
  showFailToast,
  showToast
} from "vant";
import Blog from "@/api/blog";
import {useRouter, onBeforeRouteUpdate} from "vue-router";
import DetailNavBar from "@/components/detail/DetailNavBar.vue";
import icon from "@/utils/icon";
import timeFormat from "@/utils/timeFormat";
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';
import hljs from 'highlight.js';
import json from 'highlight.js/lib/languages/json';
import python from 'highlight.js/lib/languages/python';
import bash from 'highlight.js/lib/languages/bash';
import dockerfile from 'highlight.js/lib/languages/dockerfile';
import yaml from 'highlight.js/lib/languages/yaml';
import sql from 'highlight.js/lib/languages/sql';
import javascript from 'highlight.js/lib/languages/javascript';
import css from 'highlight.js/lib/languages/css';
import scss from 'highlight.js/lib/languages/scss';
import xml from 'highlight.js/lib/languages/xml';
import blog from "@/api/blog";
import {useUserStore, useThemeStore, useCommonStore} from "@/store";
import Record from "@/api/record";
import Comments from "@/components/common/Comments.vue";
import DetailTabbar from "@/components/detail/DetailTabbar.vue";
import LoginPopup from "@/components/common/LoginPopup.vue";

const theme = useThemeStore()
const user = useUserStore();
const common = useCommonStore();
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
// 事件总线
const internalInstance = getCurrentInstance();  //当前组件实例
const $bus = internalInstance.appContext.config.globalProperties.$bus;
// 文章发布日期只保留天
const {timeDate} = timeFormat()
const {MyIcon} = icon()
const router = useRouter();
// 当前笔记ID
const DetailID = ref()
// 文章详情
const detail = reactive({
  title: '笔记正文'
})

// 获取文章内容详情
const getDetail = async (detail_id) => {
  showLoadingToast({
    message: '加载中...',
    forbidClick: true,
  });
  const data = await Blog.getSectionDetail(detail_id)
  Object.assign(detail, data)
  // 图片防盗链处理
  const regex = /!\[.*?\]\((https:\/\/cdn\.nlark\.com\/yuque\/[^\s)]+)\)|<img[^>]*src="(https:\/\/cdn\.nlark\.com\/yuque\/[^"]+)"/g
  const matches = [...detail.body.matchAll(regex)].map(match => match[1])
  console.log(matches)  // 输出所有符合条件的链接
  for (let i = 0; i < matches.length; i++) {
    detail.body = detail.body.replace(
        matches[i],
        import.meta.env.VITE_APP_BASE_URL + '/public/imgProxy/?url=' + (matches[i])
    );
  }

}
// 笔记上下篇
const context = reactive({})
// 获取笔记上下篇
const getContextData = async (detail_id) => {
  const context_data = await blog.getContext(detail_id)
  for (let i in context_data) {
    context[i] = context_data[i]
  }
}
// 图片预览
const showImg = (MDimages, currentIndex) => {
  showImagePreview({
    images: MDimages,
    startPosition: currentIndex,
    closeable: true,
  });
}
// 站点名称
const site_name = ref('')
// 骨架屏默认显示
const loading = ref(true);
// 获取站点名称
const siteConfigData = async () => {
  try {
    const response = await Management.getSiteConfig();
    console.log(response);
    site_name.value = response.name;
  } catch (error) {
    showFailToast("获取网站数据失败")
  }
}
// 评论评论列表
const commentsList = ref([])
// 评论表单
const messageForm = reactive({
  content: '',
  user: '',
  url: '',
})
// 提示登录组件对象
const loginPopupRef = ref(null)
// 点击发表评论事件
const clickSend = () => {
  if (user.isLoggedIn) {
    if (messageForm.content) {
      messageForm.user = user.user_id
      messageForm['section_id'] = DetailID.value
      messageForm['url'] = window.location.href
      console.log(messageForm)
      Record.postSectionComment(messageForm).then((response) => {
        console.log(response)
        showSuccessToast('评论成功！');
        messageForm.content = ''
        sectionCommentData(DetailID.value)
        // reload()
      }).catch(response => {
        //发生错误时执行的代码
        console.log(response)
        showFailToast('评论失败');
      });
    } else {
      showToast("请先输入内容再提交")
    }
  } else {
    common.setNextPath(router.currentRoute.value.fullPath)
    loginPopupRef.value.showPopup()
  }
}
// 评论点赞事件
if (!$bus.all.get("likeMessage")) $bus.on("likeMessage", value => {
  const params = {'like': value.like}
  Record.patchSectionComment(value.id, params).then((response) => {
    console.log(response)
    showSuccessToast('评论点赞成功！');
    // sectionCommentData(DetailID.value)
  }).catch(response => {
    //发生错误时执行的代码
    console.log(response)
    showFailToast('评论点赞失败');
  });
});
// 评论删除事件
if (!$bus.all.get("delMessage")) $bus.on("delMessage", messageId => {
  Record.deleteSectionComment(messageId).then((response) => {
    console.log(response)
    showSuccessToast('评论删除成功！');
    sectionCommentData(DetailID.value)
  }).catch(response => {
    //发生错误时执行的代码
    console.log(response)
    showFailToast('评论删除失败');
  });
});
// 评论回复事件
if (!$bus.all.get("replySend")) $bus.on("replySend", replyForm => {
  replyForm['section_id'] = DetailID.value
  replyForm['url'] = window.location.href
  console.log(replyForm)
  Record.postReplySectionComment(replyForm).then((response) => {
    console.log(response)
    showSuccessToast('评论回复成功！');
    sectionCommentData(DetailID.value)
  }).catch(response => {
    //发生错误时执行的代码
    console.log(response)
    showFailToast('评论回复失败');
  });
});
// 获取笔记评论数据
const sectionCommentData = async (detail_id) => {
  try {
    commentsList.value = await Record.getSectionComment(detail_id)
    console.log(commentsList.value)
  } catch (error) {
    console.log(error)
    showFailToast("获取评论列表失败!")
  }
}
// 笔记标题列表
let titleList = ref([])
// 切换新的笔记
const toDetail = (detailId) => {
  DetailID.value = detailId
  router.push({path: `/detail/section/${detailId}`})
}
// markdown对象
const editor = ref(null)
// 获取markdown标题
const getTitle = () => {
  setTimeout(() => {
    console.log(editor.value)
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
  }, 1000)
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
const getCatalogueData = async () => {
  try {
    catalogList.value = await blog.getCatalogueList(detail.note_id)
    console.log(catalogList.value)
  } catch (error) {
    console.log(error)
    showFailToast('获取笔记目录数据失败！');
  }
}
// 笔记收藏状态
const is_collect = ref(false)

// 获取笔记浏览记录（是否已收藏）
const getSectionHistoryData = async () => {
  if (user.isLoggedIn) {
    try {
      let res = await Record.getSectionHistory(DetailID.value, user.user_id)
      console.log(res)
      is_collect.value = res.is_collect
      console.log(is_collect.value)
    } catch (error) {
      console.log(error)
      showFailToast('获取笔记浏览记录失败!');
    }
  }
}
// 添加笔记浏览记录表单
const sectionHistoryForm = reactive({
  section_id: '',
  user: ''
})

// 添加笔记浏览记录
const postSectionHistoryData = async (DetailID) => {
  if (user.isLoggedIn) {
    sectionHistoryForm.section_id = DetailID
    sectionHistoryForm.user = user.user_id
    console.log(sectionHistoryForm)
    try {
      let res = await Record.postSectionHistory(sectionHistoryForm)
      console.log(res)
    } catch (error) {
      console.log(error)
      showFailToast('添加笔记浏览记录失败!');
    }
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
  CollectForm.user = user.user_id
  CollectForm.is_collect = is_collect.value
  CollectForm['section_id'] = DetailID
  Record.putSectionHistory(CollectForm).then((response) => {
    console.log(response)
    if (response.is_collect === true) {
      showSuccessToast('已添加收藏！');
    } else {
      showSuccessToast('已取消收藏！');
    }
  }).catch(response => {
    //发生错误时执行的代码
    console.log(response)
    showFailToast("收藏操作失败!");
  });
}
// 点赞笔记
const likeClick = () => {
  const params = {id: DetailID.value, 'kind': 'section'}
  detail.like = detail.like + 1
  blog.postLike(params).then((response) => {
    console.log(response)
    showSuccessToast('笔记点赞成功！');
  }).catch(response => {
    //发生错误时执行的代码
    console.log(response)
    showFailToast('笔记点赞失败!');
  });
}

// 分享笔记
const onShare = async (name) => {
  const URL = window.location.href
  console.log(URL)
  if (name === '复制链接') {
    try {
      await toClipboard(URL)
      showSuccessToast('链接已复制至剪切板')
    } catch (e) {
      showFailToast('剪切板调用异常！')
      console.error(e)
    }
  }
}
onMounted(() => {
  siteConfigData()
  DetailID.value = router.currentRoute.value.params.id
  getDetail(DetailID.value)
  getContextData(DetailID.value)
  sectionCommentData(DetailID.value)
  getSectionHistoryData(DetailID.value)
  postSectionHistoryData(DetailID.value)
  getTitle()
  loading.value = false
})
onBeforeRouteUpdate(async (to) => {
  window.scrollTo({top: 0})
  DetailID.value = to.params.id
  await getDetail(DetailID.value)
  await getContextData(DetailID.value)
  await sectionCommentData(DetailID.value)
  await getSectionHistoryData(DetailID.value)
  await postSectionHistoryData(DetailID.value)
  getTitle()
  loading.value = false
});
onUnmounted(() => {
  console.log("更新theme了啊")
  theme.initialize()
})
</script>

<style lang="less" scoped>
.detail {
  .main {
    background-color: var(--background_color3);
    padding: 0.267rem 0.133rem;

    .title {
      h1 {
        text-align: center;
        margin: 0;
        padding: 0.4rem 0;
      }

      .info {
        display: flex;
        justify-content: center;
        margin-bottom: 0.267rem;
        font-size: 0.7em;

        .info-item {
          border-radius: 0 13px 13px 0;
          margin: 0 5px;
          display: flex;
          align-items: center;
          justify-content: center;

          .info-icon {
            display: flex;
            justify-content: center;
            color: white;
            width: 15px;
            height: 15px;
            //border-radius: 10px 0 0 10px;
            position: relative;

            .icon {
              transform: translate(0%, -50%);
              position: absolute;
              top: 50%;
            }
          }

          span:nth-child(2) {
            display: flex;
            align-items: center;
            padding: 0 8px 0 5px;
            height: 15px;
            border-radius: 0 10px 10px 0;
          }
        }

        .info-item:nth-child(1) {
          border-top: 1px solid #3498db;
          border-right: 1px solid #3498db;
          border-bottom: 1px solid #3498db;

          span:nth-child(1) {
            background-color: #3498db;
          }

          span:nth-child(2) {
            color: #3498db;
          }
        }

        .info-item:nth-child(2) {
          border-top: 1px solid #2ecc71;
          border-right: 1px solid #2ecc71;
          border-bottom: 1px solid #2ecc71;

          span:nth-child(1) {
            background-color: #2ecc71;
          }

          span:nth-child(2) {
            color: #2ecc71;
          }
        }

        .info-item:nth-child(3) {
          border-top: 1px solid #f1c40f;
          border-right: 1px solid #f1c40f;
          border-bottom: 1px solid #f1c40f;

          span:nth-child(1) {
            background-color: #f1c40f;
          }

          span:nth-child(2) {
            color: #f1c40f;
          }
        }

        .info-item:nth-child(4) {
          border-top: 1px solid #e67e22;
          border-right: 1px solid #e67e22;
          border-bottom: 1px solid #e67e22;

          span:nth-child(1) {
            background-color: #e67e22;
          }

          span:nth-child(2) {
            color: #e67e22;
          }
        }

        .info-item:nth-child(5) {
          border-top: 1px solid #9b59b6;
          border-right: 1px solid #9b59b6;
          border-bottom: 1px solid #9b59b6;

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
    background-color: var(--background_color4);
    font-size: 16px;
    color: var(--van-primary-color);

    div {
      flex: 1;
      margin: 10px;
      background-color: var(--background_color5);
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
      color: var(--van-primary-color);
      margin: 0 0.267rem;
    }
  }

  .comment {
    background-color: var(--background_color3);
    padding: 0 0.267rem 1.867rem 0.267rem;

    .click-send {
      color: var(--van-primary-color);
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
