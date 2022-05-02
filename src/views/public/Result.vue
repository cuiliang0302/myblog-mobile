<template>
  <div class="search" v-title="searchForm.key+'-搜索结果'">
    <NavBar></NavBar>
    <van-list>
      <div class="list-item" v-for="(item,index) in articleList" :key="index" @click="toDetail(item.id)">
        <div class="title">{{ item.title }}</div>
        <div class="list-main">
        <span class="cover" v-show="searchForm.kind==='article'">
            <van-image :src="item.cover" alt="" radius="0.4rem" lazy-load height="3.013rem" width="100%">
              <template v-slot:loading>
                <van-loading type="spinner" size="20"/>
              </template>
            </van-image>
        </span>
          <span class="abstract">{{ item.abstract }}</span>
        </div>
        <div class="info">
          <span>
            <MyIcon class="icon" type="icon-time"/>{{ timeAgo(item.created_time) }}
          </span>
          <span>
            <MyIcon class="icon" type="icon-view"/>{{ item.view }}
          </span>
          <span>
            <MyIcon class="icon" type="icon-like"/>{{ item.like }}
          </span>
          <span>
            <MyIcon class="icon" type="icon-comment"/>{{ item.comment }}
          </span>
          <span v-if="searchForm.kind==='article'">
            <van-tag round :color="tagColor(item.category_id)">{{ item.category }}</van-tag>
          </span>
          <span v-else>
            <van-tag round :color="tagColor(item.note_id)">{{ item.note }}</van-tag>
          </span>
        </div>
      </div>
    </van-list>
    <Tabbar :activeBar="1"></Tabbar>
  </div>
</template>

<script setup>
import {Tag, Empty, List, Loading, Toast} from 'vant';
import NavBar from "@/components/common/NavBar.vue";
import {getSearch} from "@/api/record";
import {onMounted, reactive, ref} from "vue";
import user from "@/utils/user";
import timeFormat from "@/utils/timeFormat";
import setColor from "@/utils/setColor";
import {Image as VanImage} from "vant/lib/image";
import {useRouter} from "vue-router";
import Tabbar from '@/components/common/Tabbar.vue'
import icon from '@/utils/icon'

let {MyIcon} = icon()
const router = useRouter()
// 引入用户信息模块
let {userId, isLogin} = user();
// 时间显示几天前
let {timeAgo} = timeFormat()
// 标签颜色
let {tagColor} = setColor()
// 搜索关键词
const searchForm = reactive({})
// 搜索结果列表
const articleList = reactive({})
// 点击查看文章详情
const toDetail = (id) => {
  if (searchForm.kind === 'article') {
    router.push({path: `/detail/article/${id}`, query: {component: 'article'}})
  } else {
    router.push({path: `/detail/section/${id}`, query: {component: 'article'}})
  }
}

// 获取搜索结果列表
async function searchData(key, kind, order) {
  Toast.loading({
    message: '玩命加载中...',
    forbidClick: true,
  });
  let article_data
  if (isLogin.value) {
    try {
      const params = {
        key: key,
        kind: kind,
        order: order,
        user_id: userId.value
      }
      article_data = await getSearch(params)
      console.log(article_data)
    } catch (error) {
      console.log(error)
      Toast.fail(error.msg)
    }
  } else {
    try {
      const params = {
        key: key,
        kind: kind,
        order: order,
      }
      article_data = await getSearch(params)
    } catch (error) {
      console.log(error)
      Toast.fail(error.msg)
    }
  }
  console.log(article_data)
  for (let i in article_data) {
    articleList[i] = article_data[i]
    articleList[i].abstract = article_data[i].body.replace('>', "")
        .replace('[TOC]', "")
        .replace(/#/g, " ") // 过滤标题#
        .replace(/\!\[[\s\S]*?\]\([\s\S]*?\)/, "") // 过滤图片
        .slice(0, 500)
  }
}

onMounted(() => {
  searchForm.key = router.currentRoute.value.query.key
  searchForm.kind = router.currentRoute.value.query.kind
  searchForm.order = router.currentRoute.value.query.order
  searchData(searchForm.key, searchForm.kind, searchForm.order)
})
</script>

<style lang="scss">
@import "src/assets/style/index.scss";

.search {
  .history {
    padding: 0.267rem;

    .content {
      padding: 0.533rem 0.267rem;

    }
  }

  .hot {
    padding: 0.267rem;

    .content {
      padding: 0.32rem;

      .key-item {
        display: inline-block;
        width: 50%;
        font-size: 0.373rem;
        margin: 0.133rem 0;
        height: 0.533rem;
        overflow: hidden;

        .key {
          margin-left: 0.133rem;
        }
      }

      .key-item:nth-child(1) .van-tag {
        background-color: #c0392b;
      }

      .key-item:nth-child(2) .van-tag {
        background-color: #e74c3c;
      }

      .key-item:nth-child(3) .van-tag {
        background-color: #d35400;
      }

      .key-item:nth-child(4) .van-tag {
        background-color: #e67e22;
      }

      .key-item:nth-child(5) .van-tag {
        background-color: #f39c12;
      }

      .key-item:nth-child(6) .van-tag {
        background-color: #f1c40f;
      }

      .key-item:nth-child(7) .van-tag {
        background-color: #27ae60;
      }

      .key-item:nth-child(8) .van-tag {
        background-color: #2ecc71;
      }

      .key-item:nth-child(9) .van-tag {
        background-color: #2980b9;
      }

      .key-item:nth-child(10) .van-tag {
        background-color: #3498db;
      }
    }
  }

  .title {
    h2 {
      margin: 0;
      padding: 0;
      font-size: 0.533rem;
      font-weight: normal;
    }

    span {
      display: inline-block;
      height: 3px;
      width: 2.933rem;
      background-image: linear-gradient(to right, #3498db, #2ecc71);
    }
  }

  .van-tag {
    margin: 0 0.133rem 0.267rem 0;
  }

  .van-empty {
    padding: 0;
  }

  .list-item {
    @include background_color('background_color3');
    padding: 0.267rem;
    @include border_shadow("border_color1");
    margin: 0 0.133rem 0.267rem 0.133rem;
    border-radius: 0.267rem;

    .title {
      font-size: 0.533rem;
      @include font_color("font_color1");
    }

    .list-main {
      display: flex;
      padding: 0.267rem 0;

      .cover {
        flex: 1;
      }

      .abstract {
        height: 3.2rem;
        overflow: hidden;
        text-overflow: ellipsis;
        line-height: 145%;
        flex: 1;
        font-size: 0.373rem;
        margin-left: 0.133rem;
        font-weight: normal;
        @include font_color("font_color2");
        display: -webkit-box;
        -webkit-line-clamp: 6;
        -webkit-box-orient: vertical;
      }
    }

    .info {
      display: flex;
      align-items: center;
      justify-content: space-between;

      span {
        flex: 1;
        text-align: center;
        color: $color-text-secondary;

        .icon {
          margin-right: 0.08rem;
          width: 0.347rem;
          height: 0.347rem;
          vertical-align: -1px;
          color: $color-text-secondary !important;
          font-size: 0.32rem;
        }
      }

      span:last-child {
        color: white;

        span {
          margin: 0
        }
      }
    }
  }
}

.van-image {
  .van-image__img {
    width: 100%;
    height: 100%;
  }
}
</style>
