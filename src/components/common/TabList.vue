<template>
  <van-tabs :active="activeTab" color="#44afe0" animated swipeable>
    <van-tab v-for="(item,index) in tabList" :key="index" :title="item.name" :name="item.id">
      <van-loading v-show="load" size="0.8rem" text-color="#409EFF" vertical>
        玩命加载中...
      </van-loading>
      <van-pull-refresh v-model="listState.refreshing" @refresh="onRefresh">
        <van-list
            v-model:loading="listState.loading"
            :finished="listState.finished"
            finished-text="我是有底线的"
            @load="onLoad"
            :immediate-check=false
        >
          <div class="list-item" v-for="(item,index) in listState.list" :key="index" @click="toDetail(item.id)">
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
    </van-tab>
  </van-tabs>
</template>

<script>
import {Toast, Tab, Tabs, PullRefresh, Cell, Tag, Image as VanImage, Loading, List} from 'vant';
import {reactive, ref} from 'vue';
import {useRouter} from "vue-router";
import timeFormat from "@/utils/timeFormat";
import setColor from "@/utils/setColor";

export default {
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    Toast,
    [PullRefresh.name]: PullRefresh,
    [List.name]: List,
    [Cell.name]: Cell,
    [Tag.name]: Tag,
    [VanImage.name]: VanImage,
    [Loading.name]: Loading
  },
  name: "TabList",
  props: {
    // 加载中动画
    load: {
      type: Boolean,
      default() {
        return false;
      }
    },
    // 标签栏列表
    tabList: {
      type: Array,
      default() {
        return [];
      }
    },
    // 内容列表
    listState: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  setup(props, {emit}) {
    const activeTab = ref('');
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
      console.log("子组件触发刷新")
      emit('onRefresh')
    };
    const onLoad = () => {
      console.log("子组件触发加载下一页了")
      emit('onLoad')
    };
    // 点击查看文章详情
    const toDetail = (id) => {
      router.push({path: `/detail/${id}`, query: {component: 'article'}})
    }
    return {
      activeTab,
      refresh,
      onRefresh,
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
        vertical-align: -1px;
      }
    }

    span:last-child {
      color: white;
    }
  }
}
</style>
