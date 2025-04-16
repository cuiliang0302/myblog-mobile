<!--内容详情页-->
<template>
  <div class="detail" v-title="(detail.title)+'-'+(site_name?site_name:'')">
    <DetailNavBar :componentName="'article'"></DetailNavBar>
    <van-skeleton title round :row="10" :loading="loading">
      <div class="main">
        <div class="title">
          <h1>{{ detail.title }}</h1>
          <div class="info">
              <span class="info-item">
                <span class="info-icon">
                  <MyIcon class="icon" type="icon-category-solid"/>
                </span>
                <span>{{ detail.category }}</span>
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
    <div class="guessLike">
      <van-divider content-position="left">💖 猜你喜欢</van-divider>
      <div class="guessLike-list">
        <div class="guessLike-item" v-for="(item,index) in guessLike" :key="index"
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
          <MyIcon class="icon click-send" type="icon-send"/>
        </template>
      </van-field>
      <div class="comment-list">
        <van-empty v-show="commentsList.length === 0" description="暂无评论，快来抢沙发吧！"/>
        <Comments :commentsList="commentsList"></Comments>
      </div>
    </div>
    <div class="bottom-margin"></div>
    <DetailTabbar :componentName="'article'" :titleList="titleList" :is_collect="is_collect"
                  @collectClick="collectClick" @rollTo="rollTo"
                  @likeClick="likeClick" @onShare="onShare"></DetailTabbar>
    <LoginPopup ref="loginPopupRef"></LoginPopup>
  </div>
</template>

<script setup>
import {ref, onMounted, reactive, onUnmounted, getCurrentInstance} from "vue";
import DetailNavBar from '@/components/detail/DetailNavBar.vue';
import Comments from '@/components/common/Comments.vue'
import DetailTabbar from "@/components/detail/DetailTabbar.vue";
import LoginPopup from "@/components/common/LoginPopup.vue";
import {
  showLoadingToast,
  showImagePreview,
  showSuccessToast,
  showFailToast,
  showToast
} from "vant";
import {onBeforeRouteUpdate, useRouter} from "vue-router";
import icon from '@/utils/icon'
import timeFormat from "@/utils/timeFormat";
import Management from "@/api/management";
import Blog from "@/api/blog";
import Record from "@/api/record";
import {useUserStore, useThemeStore, useCommonStore} from '@/store';
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

const theme = useThemeStore()
const user = useUserStore();
const common = useCommonStore();
const router = useRouter()
const {MyIcon} = icon()
// 文章发布日期只保留天
const {timeDate} = timeFormat()
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
// 当前文章ID
const DetailID = ref()
// 文章详情
const detail = reactive({
  title: '文章正文',
  body: ''
})
// 获取文章内容详情
const getDetail = async (article_id) => {
  showLoadingToast({
    message: '加载中...',
    forbidClick: true,
  });
  const data = await Blog.getArticleDetail(article_id)
  Object.assign(detail, data)
  // 图片防盗链处理
  // console.log(detail.body);
  const regex = /!\[.*?\]\((https:\/\/cdn\.nlark\.com\/yuque\/[^\s)]+)\)/g
  const matches = [...detail.body.matchAll(regex)].map(match => match[1])
  console.log(matches)  // 输出所有符合条件的链接
  for (let i = 0; i < matches.length; i++) {
    detail.body = detail.body.replace(
        matches[i],
        import.meta.env.VITE_APP_BASE_URL + '/public/imgProxy/?url=' + (matches[i])
    );
  }
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
//   图片预览
const showImg = (MDimages, currentIndex) => {
  console.log(MDimages)
  console.log(currentIndex)
  showImagePreview({
    images: MDimages,
    startPosition: currentIndex,
    closeable: true,
  });
}
// 猜你喜欢列表
const guessLike = ref([])

// 获取猜你喜欢
const getGuessLikeData = async (article_id) => {
  try {
    const response = await Blog.getGuessLike(article_id);
    console.log(response);
    guessLike.value = response
  } catch (error) {
    showFailToast("获取猜你喜欢数据失败！")
  }
}
// 切换新的文章
const toDetail = (detail_id) => {
  DetailID.value = detail_id
  router.push({path: `/detail/article/${detail_id}`})
}
// 评论表单
const messageForm = reactive({
  content: '',
  user: user.user_id,
})
// 留言评论列表
const commentsList = ref([])

// 获取文章评论数据
async function articleCommentData(article_id) {
  try {
    const response = await Record.getArticleComment(article_id)
    console.log(response)
    commentsList.value = response
  } catch (error) {
    showFailToast("获取文章评论数据失败!")
  }
}

// 提示登录组件对象
const loginPopupRef = ref(null)
// 发表评论事件
const clickSend = () => {
  if (user.isLoggedIn) {
    if (messageForm.content) {
      messageForm['article_id'] = DetailID.value
      console.log(messageForm)
      Record.postArticleComment(messageForm).then((response) => {
        console.log(response)
        showSuccessToast('评论成功！');
        messageForm.content = ''
        articleCommentData(DetailID.value)
      }).catch(response => {
        //发生错误时执行的代码
        console.log(response)
        showFailToast('评论失败!');
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
  Record.patchArticleComment(value.id, params).then((response) => {
    console.log(response)
    showSuccessToast('评论点赞成功！');
    // articleCommentData(DetailID.value)
    // reload()
  }).catch(response => {
    //发生错误时执行的代码
    console.log(response)
    showFailToast("评论点赞失败！");
  });
});
// 评论删除事件
if (!$bus.all.get("delMessage")) $bus.on("delMessage", messageId => {
  Record.deleteArticleComment(messageId).then((response) => {
    console.log(response)
    showSuccessToast('评论删除成功！');
    articleCommentData(DetailID.value)
    // reload()
  }).catch(response => {
    //发生错误时执行的代码
    console.log(response)
    showFailToast("评论删除失败！");
  });
});
// 评论回复事件
if (!$bus.all.get("replySend")) $bus.on("replySend", replyForm => {
  replyForm['article_id'] = DetailID.value
  console.log(replyForm)
  Record.postReplyArticleComment(replyForm).then((response) => {
    console.log(response)
    showSuccessToast('评论回复成功！');
    articleCommentData(DetailID.value)
    // reload()
  }).catch(response => {
    //发生错误时执行的代码
    console.log(response)
    showFailToast("评论回复失败！");
  });
});

// 文章标题列表
let titleList = ref([])
// markdown对象
const editor = ref(null)
// 获取markdown标题
const getTitle = () => {
  setTimeout(() => {
    console.log(editor.value)
    const anchors = editor.value.querySelectorAll(
        '.v-md-editor-preview .github-markdown-body h1,h2,h3'
    )
    console.log(anchors)
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
// 文章收藏状态
const is_collect = ref(false)

// 获取文章浏览记录（是否已收藏）
const getArticleHistoryData = async (article_id) => {
  if (user.isLoggedIn === true) {
    try {
      const response = await Record.getArticleHistory(article_id, user.user_id)
      console.log(response)
      is_collect.value = response.is_collect
    } catch (error) {
      showFailToast("获取文章浏览记录失败！")
    }
  }
}
// 添加文章浏览记录表单
const articleHistoryForm = reactive({
  article_id: '',
  user: user.user_id
})

// 添加文章浏览记录
const postArticleHistoryData = async (article_id) => {
  if (user.isLoggedIn === true) {
    try {
      articleHistoryForm.article_id = article_id
      console.log(articleHistoryForm)
      const response = await Record.postArticleHistory(articleHistoryForm)
    } catch (error) {
      showFailToast("添加文章浏览记录失败!")
    }
  }
}
// 添加/取消收藏表单
const CollectForm = reactive({
  user: user.user_id,
  is_collect: ''
})
// 子组件添加/取消收藏事件
const collectClick = () => {
  console.log("添加/取消收藏")
  console.log("当前收藏状态是", is_collect.value)
  is_collect.value = !is_collect.value
  CollectForm.is_collect = is_collect.value
  CollectForm['article_id'] = DetailID
  Record.putArticleHistory(CollectForm).then((response) => {
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
// 点赞文章
const likeClick = () => {
  const params = {id: DetailID.value, 'kind': 'article'}
  detail.like = detail.like + 1
  Blog.postLike(params).then((response) => {
    console.log(response)
    showSuccessToast('文章点赞成功！');
  }).catch(response => {
    //发生错误时执行的代码
    console.log(response)
    showFailToast("文章点赞失败!");
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
  getGuessLikeData(DetailID.value)
  articleCommentData(DetailID.value)
  getArticleHistoryData(DetailID.value)
  postArticleHistoryData(DetailID.value)
  getTitle()
  loading.value = false
})
onBeforeRouteUpdate(async (to) => {
  window.scrollTo({top: 0})
  DetailID.value = to.params.id
  await getDetail(DetailID.value)
  await getGuessLikeData(DetailID.value)
  await articleCommentData(DetailID.value)
  await getArticleHistoryData(DetailID.value)
  await postArticleHistoryData(DetailID.value)
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
    //@include background_color("background_color3");
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

  .guessLike {
    margin: 0.133rem 0;
    background-color: var(--background_color3);
    //@include background_color("background_color3");
    padding: 0.267rem 0.133rem;

    .guessLike-list {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;

      .guessLike-item {
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
    background-color: var(--background_color3);
    //@include background_color("background_color3");
    padding: 0 0.267rem 1.867rem 0.267rem;

    .click-send {
      color: var(--van-primary-color);
      //color: $color-primary;
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
