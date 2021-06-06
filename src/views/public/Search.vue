<template>
  <div class="search">
    <SearchBar @onSearch="onSearch"></SearchBar>
    <div v-if="JSON.stringify(articleList)=='{}'">
      <div>
        <div class="history">
          <div class="title">
            <h2>⏱&nbsp;历史搜索</h2>
            <span></span>
          </div>
          <div class="content">
            <van-empty v-show="historyList.length===0" image="search" description="暂无搜索记录"/>
            <van-tag round size="large" color="#ecf0f1" text-color="#2c3e50"
                     v-for="(key,index) in historyList"
                     :key="index"
                     @click="clickSearch(key)"
            >
              {{ key }}
            </van-tag>
          </div>
        </div>
        <div class="hot">
          <div class="title">
            <h2>🔥&nbsp;热门搜索</h2>
            <span></span>
          </div>
          <div class="content">
            <div class="key-item"
                 v-for="(key,index) in hotList"
                 :key="index"
                 @click="clickSearch(key)"
            >
              <van-tag size="medium">{{ index + 1 }}</van-tag>
              <span class="key">{{ key }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <van-list>
        <div class="list-item" v-for="(item,index) in articleList" :key="index" @click="toDetail(item.id)">
          <div class="title">{{ item.title }}</div>
          <div class="list-main">
        <span class="cover">
            <van-image :src="item.cover" alt="" radius="0.4rem" lazy-load height="3.013rem" width="4.533rem">
              <template v-slot:loading>
                <van-loading type="spinner" size="20"/>
              </template>
            </van-image>
        </span>
            <span class="abstract">{{ item.abstract }}</span>
          </div>
          <div class="info">
            <span><img src="@/assets/icon/time.png" alt="">{{ timeAgo(item.created_time) }}</span>
            <span><img src="@/assets/icon/view.png" alt="">{{ item.view }}</span>
            <span><img src="@/assets/icon/like.png" alt="">{{ item.like }}</span>
            <span><img src="@/assets/icon/comment.png" alt="">{{ item.comment }}</span>
            <span><van-tag round :color="tagColor(item.category_id)">{{ item.category }}</van-tag></span>
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
import {Tag, Empty, List, Loading, Toast} from 'vant';
import SearchBar from "@/components/search/SearchBar";
import {getSearchHistory, getSearchHot, getSearch} from "@/api/record";
import {onMounted, reactive, ref} from "vue";
import user from "@/utils/user";
import timeFormat from "@/utils/timeFormat";
import setColor from "@/utils/setColor";
import {Image as VanImage} from "vant/lib/image";

export default {
  components: {
    [Tag.name]: Tag,
    [Empty.name]: Empty,
    [List.name]: List,
    [VanImage.name]: VanImage,
    [Loading.name]: Loading,
    Toast,
    SearchBar,
  },
  name: "Search",
  setup() {
    // 引入用户信息模块
    let {userId, isLogin} = user();
    // 时间显示几天前
    let {timeAgo} = timeFormat()
    // 标签颜色
    let {tagColor} = setColor()
    // 搜索历史列表
    let historyList = ref([])
    // 热门搜索列表
    let hotList = ref([])
    // 搜索结果列表
    let articleList = reactive({})
    // 搜索栏输入搜索
    const onSearch = (key) => {
      console.log(key)
      searchData(key)
    }
    // 点击标签搜索
    const clickSearch = (key) => {
      console.log(key)
      searchData(key)
    }

    // 获取搜索结果列表
    async function searchData(key) {
      Toast.loading({
        message: '玩命加载中...',
        forbidClick: true,
      });
      let article_data
      if (isLogin.value) {
        try {
          article_data = await getSearch(key, userId.value)
        } catch (error) {
          console.log(error)
          Toast.fail(error.msg)
        }
      } else {
        try {
          article_data = await getSearch(key, NaN)
        } catch (error) {
          console.log(error)
          Toast.fail(error.msg)
        }
      }
      console.log(article_data)
      for (let i in article_data) {
        articleList[i] = article_data[i]
      }
    }

    // 获取搜索热词
    async function searchKeyHotData() {
      hotList.value = await getSearchHot()
    }

    // 获取搜索记录
    async function getSearchKeyHistoryData(user_id) {
      let SearchKeyHistoryData = await getSearchHistory(user_id)
      historyList.value = SearchKeyHistoryData.keys
    }

    onMounted(() => {
      searchKeyHotData()
      if (isLogin.value) {
        getSearchKeyHistoryData(userId.value)
      }
    })
    return {
      historyList,
      hotList,
      articleList,
      clickSearch,
      onSearch,
      timeAgo,
      tagColor
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/style/variable";

body {
  background-color: $color-background-white !important;
}

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
    background-color: $color-background-white;
    padding: 0.267rem;
    box-shadow: 0 0.133rem 0.133rem $color-border-base;
    margin: 0 0.133rem 0.267rem 0.133rem;
    border-radius: 0.267rem;

    .title {
      font-size: 0.533rem;
      color: $color-text-primary;
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
        color: $color-text-regular;
        display: -webkit-box;
        -webkit-line-clamp: 6;
        -webkit-box-orient: vertical;
      }
    }

    .info {
      display: flex;
      justify-content: space-between;

      span {
        flex: 1;
        text-align: center;
        color: $color-text-secondary;

        img {
          opacity: 0.6;
          margin-right: 0.08rem;
          width: 0.267rem;
          height: 0.267rem;
          vertical-align: -1px;
        }
      }

      span:last-child {
        color: white;
      }
    }
  }
}
</style>
