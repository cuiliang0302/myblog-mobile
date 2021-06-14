<!--内容详情页-->
<template>
  <div class="detail" v-title="detail.title+'-崔亮的博客'">
    <NavBar :componentName="componentName"></NavBar>
    <van-skeleton title round :row="10" :loading="loading">
      <div class="main">
        <div class="title">
          <h1>{{ detail.title }}</h1>
          <div class="info">
      <span class="info-item">
        <span><img src="@/assets/icon/folder-info.png" alt=""></span>
        <span v-if="componentName==='article'">{{ detail.category }}</span>
        <span v-else>{{ detail.note }}</span>
      </span>
            <span class="info-item">
        <span><img src="@/assets/icon/time-info.png" alt=""></span>
        <span>{{ timeDate(detail.created_time) }}</span>
      </span>
            <span class="info-item">
        <span><img src="@/assets/icon/view-info.png" alt=""></span>
        <span>{{ detail.view }}</span>
      </span>
            <span class="info-item">
        <span><img src="@/assets/icon/like-info.png" alt=""></span>
        <span>{{ detail.like }}</span>
      </span>
            <span class="info-item">
        <span><img src="@/assets/icon/comment-info.png" alt=""></span>
        <span>{{ detail.comment }}</span>
      </span>
          </div>
        </div>
        <div class="body" ref="editor">
          <v-md-preview :text="detail.body"></v-md-preview>
        </div>
      </div>
    </van-skeleton>
    <div class="recommend" v-show="componentName==='article'">
      <van-divider content-position="left">💖 猜你喜欢</van-divider>
      <div class="recommend-list">
        <div class="recommend-item" v-for="(item,index) in recommendList" :key="index"
             @click="toDetail('article',item.id)">
          <van-image :src="item.cover" radius="0.4rem" width="100%" height="3.2rem" lazy-load>
            <template v-slot:loading>
              <van-loading type="spinner" size="20"/>
            </template>
          </van-image>
          <span>{{ item.title }}</span>
        </div>
      </div>
    </div>
    <div class="context" v-show="componentName==='note'">
      <div class="last">
        <span><van-image width="20" height="20" :src="require('@/assets/icon/last.png')"/></span>
        <span v-if="context.last && context.last.title" @click="toDetail('note',context.last.id)">
          {{ context.last.title }}
        </span>
        <span v-else>已是第一篇</span>
      </div>
      <div class="next">
        <span><van-image width="20" height="20" :src="require('@/assets/icon/next.png')"/></span>
        <span v-if="context.next && context.next.title" @click="toDetail('note',context.next.id)">
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
          :right-icon="require('@/assets/icon/send.png')"
          @click-right-icon="clickSend"
      />
      <div class="comment-list">
        <van-empty v-show="commentsList.length === 0" description="暂无评论，快来抢沙发吧！"/>
        <Comments :commentsList="commentsList"></Comments>
      </div>
    </div>
    <div class="bottom-margin"></div>
    <Tabbar :componentName="componentName" :titleList="titleList" :catalogList="catalogList" @rollTo="rollTo"
            @dirTab="dirTab" @toNoteDetail="toNoteDetail" @likeClick="likeClick"></Tabbar>
    <LoginPopup ref="refLoginPopup"></LoginPopup>
  </div>
</template>

<script>
import NavBar from '@/components/datail/NavBar';
import Tabbar from '@/components/datail/Tabbar';
import Comments from '@/components/common/Comments'
import {Divider, Image as VanImage, Loading, Skeleton, Toast, Field, Empty} from 'vant'
import {getCurrentInstance, nextTick, onMounted, reactive, ref} from "vue";
import {useRouter, onBeforeRouteUpdate} from "vue-router";
import timeFormat from "@/utils/timeFormat";
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';
import python from 'highlight.js/lib/languages/python';
import bash from 'highlight.js/lib/languages/bash';
import dockerfile from 'highlight.js/lib/languages/dockerfile';
import json from 'highlight.js/lib/languages/json';
import yaml from 'highlight.js/lib/languages/yaml';
import sql from 'highlight.js/lib/languages/sql';
import {
  getCatalogue,
  getContext,
  getSectionDetail,
  getArticleDetail,
  getGuessLike,
  putArticleDetail,
  putSectionDetail
} from "@/api/blog";
import {getImgProxy} from "@/api/public";
import {
  getArticleComment,
  postArticleComment,
  deleteArticleComment,
  putArticleComment,
  postReplyArticleComment,
  getSectionComment,
  postSectionComment,
  deleteSectionComment,
  putSectionComment,
  postReplySectionComment
} from "@/api/record";
import user from "@/utils/user";
import LoginPopup from "@/components/common/LoginPopup";

VMdPreview.use(githubTheme, {
  codeHighlightExtensionMap: {
    vue: 'xml',
  },
  extend(md, hljs) {
    hljs.registerLanguage('python', python);
    hljs.registerLanguage('bash', bash);
    hljs.registerLanguage('dockerfile', dockerfile);
    hljs.registerLanguage('json', json);
    hljs.registerLanguage('yaml', yaml);
    hljs.registerLanguage('sql', sql);
  },
});
export default {
  components: {
    [Divider.name]: Divider,
    [VanImage.name]: VanImage,
    [Loading.name]: Loading,
    [Skeleton.name]: Skeleton,
    [Field.name]: Field,
    [Empty.name]: Empty,
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
    // 调用公共组件模块
    let {DetailID, componentName, detail, timeDate, loading, toDetail, likeClick} = publicFn(router, sectionData)
    // markdown模块
    let {titleList, editor, rollTo, getTitle} = markdown(titleList)
    // 文章模块
    let {recommendList, articleData, guessLikeData} = article(detail)
    // 笔记模块
    let {context, catalogList, dirTab, toNoteDetail, sectionData, contextData} = note(detail, toDetail)
    // 评论回复模块
    let {
      messageForm,
      commentsList,
      articleCommentData,
      sectionCommentData,
      clickSend,
      refLoginPopup
    } = comment(DetailID, $bus, componentName)

    // 获取内容详情
    async function getDetail(DetailID) {
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
      });
      if (componentName.value === 'article') {
        await articleData(DetailID)
        await guessLikeData(DetailID)
        await articleCommentData(DetailID)
      } else {
        await sectionData(DetailID)
        await contextData(DetailID)
        await sectionCommentData(DetailID)
      }
      loading.value = false;
      await getTitle()
      window.scrollTo({top: 0})
    }

    onMounted(async () => {
      componentName.value = router.currentRoute.value.query.component
      let DetailID = router.currentRoute.value.params.id
      await getDetail(DetailID)
    })
    onBeforeRouteUpdate(async (to) => {
      console.log(to)
      componentName.value = to.query.component
      await getDetail(to.params.id)
    });
    return {
      componentName,
      detail,
      timeDate,
      toDetail,
      titleList,
      editor,
      recommendList,
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
      likeClick
    }
  }
}

// 通用模块
function publicFn(router) {
  // 显示组件模块
  const componentName = ref('')
  // 文章笔记ID
  const DetailID = ref()
  // 内容详情
  let detail = reactive({})
  // 文章发布日期只保留天
  let {timeDate} = timeFormat()
  // 骨架屏默认显示
  const loading = ref(true);
  // 切换新的文章或笔记
  const toDetail = (component, detailId) => {
    console.log(component)
    DetailID.value = detailId
    router.push({path: `/detail/${detailId}`, query: {component: component}})
  }
  // 点赞文章或笔记
  const likeClick = () => {
    if (componentName.value === 'article') {
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
    } else {
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
  }
  onMounted(() => {
    DetailID.value = router.currentRoute.value.params.id
  })
  return {
    DetailID, componentName, detail, timeDate, loading, toDetail, likeClick
  }
}

// markdown模块
function markdown() {
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

  return {
    titleList, editor, rollTo, getTitle
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
        const pattern = /!\[(.*?)\]\((.*?)\)/gm;
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
    recommendList, articleData, guessLikeData
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
        const pattern = /!\[(.*?)\]\((.*?)\)/gm;
        let matcher;
        let imgArr = [];
        while ((matcher = pattern.exec(detail.body)) !== null) {
          imgArr.push(matcher[2]);
        }
        for (let i = 0; i < imgArr.length; i++) {
          detail.body = detail.body.replace(
              imgArr[i],
              "https://images.weserv.nl/?url=" + imgArr[i]
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
function comment(DetailID, $bus, componentName) {
  // 引入用户信息模块
  let {userId, isLogin} = user();
  // 留言评论列表
  const commentsList = ref([])

  // 获取文章评论数据
  async function articleCommentData(DetailID) {
    commentsList.value = await getArticleComment(DetailID)
  }

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
        if (componentName.value === 'article') {
          messageForm['article'] = DetailID.value
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
          messageForm['section'] = DetailID.value
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
        }
      } else {
        Toast("毛都没有，发表个锤子")
      }
    } else {
      refLoginPopup.value.showPopup()
    }
  }
  // 评论点赞事件
  if (!$bus.all.get("likeMessage")) $bus.on("likeMessage", messageId => {
    if (componentName.value === 'article') {
      putArticleComment(messageId).then((response) => {
        console.log(response)
        Toast.success('点赞成功！');
        articleCommentData(DetailID.value)
      }).catch(response => {
        //发生错误时执行的代码
        console.log(response)
        Toast.fail(response.msg);
      });
    } else {
      putSectionComment(messageId).then((response) => {
        console.log(response)
        Toast.success('点赞成功！');
        sectionCommentData(DetailID.value)
      }).catch(response => {
        //发生错误时执行的代码
        console.log(response)
        Toast.fail(response.msg);
      });
    }
  });
  // 评论删除事件
  if (!$bus.all.get("delMessage")) $bus.on("delMessage", messageId => {
    if (componentName.value === 'article') {
      deleteArticleComment(messageId).then((response) => {
        console.log(response)
        Toast.success('留言删除成功！');
        articleCommentData(DetailID.value)
      }).catch(response => {
        //发生错误时执行的代码
        console.log(response)
        Toast.fail(response.msg);
      });
    } else {
      deleteSectionComment(messageId).then((response) => {
        console.log(response)
        Toast.success('留言删除成功！');
        sectionCommentData(DetailID.value)
      }).catch(response => {
        //发生错误时执行的代码
        console.log(response)
        Toast.fail(response.msg);
      });
    }
  });
  // 留言回复事件
  if (!$bus.all.get("replySend")) $bus.on("replySend", replyForm => {
    if (componentName.value === 'article') {
      replyForm['article'] = DetailID.value
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
    } else {
      replyForm['section'] = DetailID.value
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
    }

  });
  return {
    commentsList,
    articleCommentData,
    sectionCommentData,
    messageForm,
    clickSend,
    refLoginPopup,
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/style/variable";

.detail {
  .main {
    background-color: $color-background-white;
    padding: 0.267rem 0.133rem;

    .title {
      h1 {
        text-align: center;
        font-size: 0.8rem;
        margin: 0;
        padding: 0.4rem 0;
      }

      .info {
        display: flex;
        justify-content: center;
        margin-bottom: 0.267rem;

        .info-item {
          border-radius: 0.267rem;
          margin: 0 0.08rem;

          span:nth-child(1) {
            width: 0.533rem;
            display: inline-block;
            border-radius: 0.133rem 0 0 0.133rem;

            img {
              margin: 0 0.08rem;
              width: 0.4rem;
              height: 0.4rem;
              vertical-align: -0.107rem;
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
    background-color: $color-background-white;
    padding: 0.267rem 0.133rem;

    .recommend-list {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;

      .recommend-item {
        position: relative;
        margin: 0.133rem;
        width: 4.533rem;

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

  .context {
    display: flex;
    background-color: $color-background-white;
    font-size: 16px;
    color: $color-text-primary;

    div {
      flex: 1;
      margin: 10px;
      background-color: $color-background-base;
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
  }

  .comment {
    background-color: $color-background-white;
    padding: 0 0.267rem 1.867rem 0.267rem;
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
