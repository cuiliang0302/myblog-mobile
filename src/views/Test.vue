<template>
  <div class="main">
    <van-pull-refresh v-model="listState.refreshing" @refresh="onRefresh">
      <van-list
          v-model:loading="listState.loading"
          :finished="listState.finished"
          finished-text="没有更多了"
          @load="onLoad"
      >
        <van-cell v-for="item in listState.list" :key="item" :title="item"/>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import {PullRefresh, List, Cell} from 'vant';
import {reactive} from "vue";

export default {
  components: {
    [PullRefresh.name]: PullRefresh,
    [List.name]: List,
    [Cell.name]: Cell,
  },
  name: "Test",
  props: {
    // 标签栏列表
    tabList: {
      type: Array,
      default() {
        return [];
      }
    },
    // 内容列表
    dataList: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  setup() {
    const listState = reactive({
      list: [],
      page: 1,
      count: 50,
      loading: false,
      finished: false,
      refreshing: false,
    });

    const onLoad = () => {
      console.log("获取数据了啊", listState.page)
      setTimeout(() => {
        if (listState.list.length >= listState.count) {
          console.log("没数据可以获取了")
          listState.finished = true;
        } else {
          if (listState.refreshing) {
            listState.list = [];
            listState.refreshing = false;
          }
          for (let i = 0; i < 10; i++) {
            listState.list.push(listState.list.length + 1);
          }
          listState.page++
          listState.loading = false;
        }
      }, 1000);
    };

    const onRefresh = () => {
      // 清空列表数据
      listState.finished = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      listState.loading = true;
      onLoad();
    };

    return {
      listState,
      onLoad,
      onRefresh,
    };
  },
}
</script>

<style scoped lang="scss">
@import "src/assets/style/variable";

.main {
  height: 1000px;

  h1 {
    font-size: 100px;
  }

  .van-cell {
    height: 200px;
  }
}
</style>
