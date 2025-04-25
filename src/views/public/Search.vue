<template>
  <div class="search">
    <SearchBar @onSearch="onSearch"></SearchBar>
    <van-dropdown-menu active-color="#1989fa">
      <van-dropdown-item v-model="dropValue.kind" :options="kind"/>
      <van-dropdown-item v-model="dropValue.order" :options="order"/>
    </van-dropdown-menu>
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
               v-for="(key,index) in hotList.slice(0,10)"
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
</template>

<script setup>
import SearchBar from "@/components/search/SearchBar.vue";
import {onMounted, reactive, ref} from "vue";
import {useUserStore} from '@/store';
const user = useUserStore();
import {useRouter} from "vue-router";
import {showFailToast} from "vant";
import record from "@/api/record";


const router = useRouter()
// 引入用户信息模块
// let {userId, isLogin} = user();
// 搜索历史列表
let historyList = ref([])
// 热门搜索列表
let hotList = ref([])
// 下拉菜单默认值
const dropValue = reactive({
  kind: 'article',
  order: 'default',
});
const kind = [
  {text: '搜文章', value: 'article'},
  {text: '搜笔记', value: 'note'},
];
const order = [
  {text: '默认排序(按时间)', value: 'default'},
  {text: '阅读量排序', value: 'view'},
];
// 搜索栏输入搜索
const onSearch = (key) => {
  console.log(key)
  router.push({path: '/result', query: {key: key, kind: dropValue.kind, order: dropValue.order}})
}
// 点击标签搜索
const clickSearch = (key) => {
  console.log(key)
  router.push({path: '/result', query: {key: key, kind: dropValue.kind, order: dropValue.order}})
}

// 获取搜索热词
const searchKeyHotData = async () => {
  try {
    const response = await record.getSearchHot()
    console.log(response)
    hotList.value = response
  } catch (error) {
    showFailToast('获取搜素热词失败!')
  }
}

// 获取搜索记录
const searchKeyHistoryData = async () => {
  try{
    const response = await record.getSearchHistory()
    console.log(response)
    historyList.value = response
  }catch (error) {
    showFailToast("")
  }
}

onMounted(() => {
  searchKeyHotData()
  if (user.isLoggedIn) {
    searchKeyHistoryData()
  }
})
</script>

<style lang="less">

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
    background-color: var(--background_color3);
    //@include background_color('background_color3');
    padding: 0.267rem;
    box-shadow: var(--shadow_color3);
    //@include border_shadow("border_color1");
    margin: 0 0.133rem 0.267rem 0.133rem;
    border-radius: 0.267rem;

    .title {
      font-size: 0.533rem;
      //color: var(--van-primary-color);
      //color: $color-text-primary;
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
        //color: $color-text-regular;
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
        //color: $color-text-secondary;

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
