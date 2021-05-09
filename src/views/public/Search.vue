<template>
  <div>
    <SearchBar></SearchBar>
    <div class="history">
      <div class="title">
        <h2>⏱&nbsp;历史搜索</h2>
        <span></span>
      </div>
      <div class="content">
        <van-tag round size="large" color="#ecf0f1" text-color="#2c3e50"
                 v-for="(key,index) in historyList"
                 :key="index"
                 @click="clickKey(key)"
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
             @click="clickKey(key)"
        >
          <van-tag size="medium">{{ index + 1 }}</van-tag>
          <span class="key">{{ key }}</span>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import {Tag} from 'vant';
import SearchBar from "@/components/search/SearchBar";

export default {
  components: {
    [Tag.name]: Tag,
    SearchBar,
  },
  name: "Search",
  setup() {
    // 搜索历史列表
    let historyList = ['三字经', '百家姓', '唐诗三百首', '钢铁是怎样炼成的', '绕口令大全', '中午吃啥呢', '服务器重启教程',
      '遇事不决,量子力学', 'vue', 'JavaScript']
    // 热门搜索列表
    let hotList = ['python', 'typescript', 'go', 'pycharm', '绕口令大全', '中午吃啥呢', '服务器重启教程',
      '遇事不决,量子力学', 'vue', 'JavaScript']
    const clickKey = (key) => {
      console.log(key)
    }
    return {
      historyList,
      hotList,
      clickKey
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/style/variable";

body {
  background-color: $color-background-white !important;
}

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
</style>
