<!--内容详情页-->
<template>
  <div class="detail">
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
      <Comments :commentsList="commentsList"></Comments>
    </div>
    <div class="bottom-margin"></div>
    <Tabbar :componentName="componentName" :titleList="titleList" :catalogList="catalogList" @rollTo="rollTo"
            @dirTab="dirTab" @toNoteDetail="toNoteDetail"></Tabbar>
  </div>
</template>

<script>
import NavBar from '@/components/deatil/NavBar';
import Tabbar from '@/components/deatil/Tabbar';
import Comments from '@/components/common/Comments'
import {Divider, Image as VanImage, Loading, Skeleton, Toast} from 'vant'
import {nextTick, onMounted, reactive, ref} from "vue";
import {useRouter, onBeforeRouteUpdate} from "vue-router";
import {getArticleDetail, getGuessLike} from "@/api/article";
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
import {getCatalogue, getContext, getSectionDetail} from "@/api/note";

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
    NavBar,
    Tabbar,
    Comments,
    VMdPreview
  },
  name: "Detail",
  setup() {
    const router = useRouter();
    // 调用公共组件模块
    let {componentName, detail, timeDate, loading, toDetail} = publicFn(router, sectionData)
    // markdown模块
    let {titleList, editor, rollTo, getTitle} = markdown(titleList)
    // 文章模块
    let {recommendList, articleData, guessLikeData} = article(detail)
    // 笔记模块
    let {context, catalogList, dirTab, toNoteDetail, sectionData, contextData} = note(detail, toDetail)
    async function getDetail(DetailID){
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
      });
      if (componentName.value === 'article') {
        await articleData(DetailID)
        await guessLikeData(DetailID)
      } else {
        await sectionData(DetailID)
        await contextData(DetailID)
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
    const commentsList = [
      {
        id: '1',
        username: '张三',
        photo: 'https://cdn.cuiliangblog.cn/media/photo/2020_10_22_13_29_07_420444.jpg',
        comment: '你笑起来真好看，像春天的花一样',
        time: '三天前',
        like: 10,
        is_like: true,
        child: [
          {
            id: '2',
            username: '张小三',
            target: '张三',
            photo: 'https://cdn.cuiliangblog.cn/media/photo/2021_02_20_11_18_31_393596.jpg',
            comment: '你说的真对',
            time: '一天前',
            like: 8,
            is_like: false,
          },
          {
            id: '3',
            username: '张大三',
            target: '张小三',
            photo: 'https://cdn.cuiliangblog.cn/media/photo/2020_12_26_21_47_08_682774.jpg',
            comment: '你们说的都对',
            time: '8分钟前',
            like: 2,
            is_like: false,
          },
        ]
      },
      {
        id: '4',
        username: '李四',
        photo: 'https://cdn.cuiliangblog.cn/media/photo/default.jpg',
        comment: '我笑起来也很好看的哦',
        time: '四天前',
        like: 8,
        is_like: false,
      },
      {
        id: '5',
        username: '王五',
        photo: 'https://cdn.cuiliangblog.cn/media/photo/2020_12_26_15_35_59_908281.jpg',
        comment: '别争了，我最好看',
        time: '一个月前',
        like: 18,
        is_like: true,
      }
    ]
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
    }
  }
}

// 通用模块
function publicFn(router) {
  // 显示组件模块
  const componentName = ref('')
  // 内容详情
  let detail = reactive({})
  // 文章发布日期只保留天
  let {timeDate} = timeFormat()
  // 骨架屏默认显示
  const loading = ref(true);
  // 切换新的文章或笔记
  const toDetail = (component, DetailID) => {
    console.log(component)
    router.push({path: `/detail/${DetailID}`, query: {component: component}})
  }
  return {
    componentName, detail, timeDate, loading, toDetail
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
              "https://images.weserv.nl/?url=" + imgArr[i]
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
    padding-bottom: 1.333rem;
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
</style>
