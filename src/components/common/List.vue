<template>
  <van-pull-refresh v-model="refresh.loading" @refresh="onRefresh">
    <van-list
        v-model:loading="state.loading"
        :finished="state.finished"
        finished-text="没有更多了"
        @load="onLoad"
    >
      <div class="list-item" v-for="(item,index) in data" :key="index" @click="toDetail">
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
  </van-pull-refresh>
</template>

<script>
import {computed, reactive} from 'vue';
import {Cell, List, Tag, Image as VanImage, Loading, PullRefresh, Toast} from 'vant';
import {useRouter} from "vue-router";
import timeFormat from "@/utils/timeFormat";
import setColor from "@/utils/setColor";

export default {
  components: {
    [PullRefresh.name]: PullRefresh,
    [List.name]: List,
    [Cell.name]: Cell,
    [Tag.name]: Tag,
    [VanImage.name]: VanImage,
    [Loading.name]: Loading
  },
  name: "List",
  props: {
    // 列表数据内容
    data: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  setup() {
    const router = useRouter()
    // 时间显示几天前
    let {timeAgo} = timeFormat()
    // 标签颜色
    let {tagColor} = setColor()
    // 数据刷新
    const refresh = reactive({
      count: 0,
      loading: false,
    });
    const onRefresh = () => {
      setTimeout(() => {
        refresh.loading = false;
        refresh.count++;
        Toast.success('刷新成功,已刷新' + refresh.count + '次');
      }, 1500);
    };
    const state = reactive({
      list: [],
      loading: false,
      finished: false,
    });
    const onLoad = () => {
      console.log('获取下一页数据')
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      // setTimeout(() => {
      //   for (let i = 0; i < 3; i++) {
      //     state.list.push();
      //   }
      //   // 加载状态结束
      //   state.loading = false;
      //
      //   // 数据全部加载完成
      //   if (state.list.length >= 30) {
      //     state.finished = true;
      //   }
      // }, 1000);
    };
    // 点击查看文章详情
    const toDetail = () => {
      router.push({path: '/detail', query: {component: 'article'}})
    }

    return {
      refresh,
      onRefresh,
      state,
      onLoad,
      toDetail,
      timeAgo,
      tagColor
    };
  },
}
</script>

<style lang="scss" scoped>
@import "src/assets/style/variable";

.list-item {
  background-color: $color-background-white;
  padding: 0.267rem;
  box-shadow: 0rem 0.133rem 0.133rem $color-border-base;
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
    align-items: center;
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
      }
    }

    span:last-child {
      color: white;
    }
  }
}
</style>
