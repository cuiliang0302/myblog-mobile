<!--内容详情页-->
<template>
  <div class="detail">
    <NavBar></NavBar>
    <Tabbar :componentName="componentName"></Tabbar>
    <div class="main">
      <div class="title">
        <h1>{{ detail.title }}</h1>
        <div class="info">
      <span class="info-item">
        <span><img src="@/assets/icon/folder-info.png" alt=""></span>
        <span>{{ detail.category }}</span>
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
      <div class="body">{{ detail.body }}</div>
    </div>
    <div class="recommend" v-show="componentName==='article'">
      <van-divider content-position="left">💖 猜你喜欢</van-divider>
      <div class="recommend-list">
        <div class="recommend-item" v-for="(item,index) in recommendList" :key="index">
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
        <span>概念和术语</span>
      </div>
      <div class="next">
        <span>kubernetes集群的部署流程</span>
        <span><van-image width="20" height="20" :src="require('@/assets/icon/next.png')"/></span>
      </div>
    </div>
    <div class="comment" id="comment">
      <van-divider content-position="left">📝 评论交流</van-divider>
      <Comments :commentsList="commentsList"></Comments>
    </div>
    <div class="bottom-margin"></div>
  </div>
</template>

<script>
import NavBar from '@/components/deatil/NavBar';
import Tabbar from '@/components/deatil/Tabbar';
import Comments from '@/components/common/Comments'
import {Divider, Image as VanImage, Loading, Toast} from 'vant'
import {onMounted, reactive, ref} from "vue";
import {useRouter} from "vue-router";
import {getArticleDetail} from "@/api/public";
import timeFormat from "@/utils/timeFormat";

export default {
  components: {
    [Divider.name]: Divider,
    [VanImage.name]: VanImage,
    [Loading.name]: Loading,
    NavBar,
    Tabbar,
    Comments,
  },
  name: "Detail",
  setup() {
    const router = useRouter();
    // 显示组件模块
    const componentName = ref('')
    // 文章详情
    let detail = reactive({})
    // 文章发布日期只保留天
    let {timeDate} = timeFormat()

    // 获取文章详情
    async function detailData(DetailID) {
      const detail_data = await getArticleDetail(DetailID)
      for (let i in detail_data) {
        detail[i] = detail_data[i]
      }
    }

    onMounted(() => {
      componentName.value = router.currentRoute.value.query.component
      let DetailID = router.currentRoute.value.params.id
      if (componentName.value === 'article') {
        detailData(DetailID)
      }
    })
    const recommendList = [
      {
        title: '这是第一篇推荐文章标题',
        cover: 'https://cdn.cuiliangblog.cn/media/images/cover.jpg'
      },
      {
        title: '这是第二篇推荐文章',
        cover: 'https://cdn.cuiliangblog.cn/media/images/cover.jpg'
      },
      {
        title: '这是第三篇推荐文章标题是第三篇推荐文章标题',
        cover: 'https://cdn.cuiliangblog.cn/media/images/cover.jpg'
      },
      {
        title: '这是第四篇推荐文章标题',
        cover: 'https://cdn.cuiliangblog.cn/media/images/cover.jpg'
      },
    ]
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
      recommendList,
      commentsList
    }
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
        font-weight: normal;
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
      line-height: 0.667rem;
      font-size: 0.427rem;
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
      text-align: right;
      display: flex;
      align-items: center;
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
</style>
