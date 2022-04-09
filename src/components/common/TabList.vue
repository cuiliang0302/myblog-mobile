<template>
  <van-tabs class="article-list" :active="props.activeTab" color="#44afe0" @click-tab="onClickTab" animated swipeable>
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
              <span><van-tag round :color="tagColor(item.category_id)">{{ item.category }}</van-tag></span>
            </div>
          </div>
        </van-list>
      </van-pull-refresh>
    </van-tab>
  </van-tabs>
</template>

<script setup>
import {Toast, Tab, Tabs, PullRefresh, Cell, Tag, Image as VanImage, Loading, List} from 'vant';
import {onMounted, reactive, ref} from 'vue';
import {useRouter} from "vue-router";
import timeFormat from "@/utils/timeFormat";
import setColor from "@/utils/setColor";
import icon from '@/utils/icon'

let {MyIcon} = icon()
const props = defineProps({
  // 加载中动画
  load: {
    type: Boolean,
    required: true,
    default: false
  },
  // 标签栏列表
  tabList: {
    type: Array,
    required: true,
    default: []
  },
  // 内容列表
  listState: {
    type: Object,
    required: true,
    default: {}
  },
  // 当前激活的标签ID
  activeTab: {
    type: Number,
    required: false,
    default: 0
  }
})
const emit = defineEmits(['onRefresh', 'onLoad', 'onClickTab'])
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
// 标签页点击切换事件
const onClickTab = ({name}) => {
  console.log("子组件点了哦")
  emit('onClickTab', name)
}
// 数据刷新事件
const onRefresh = () => {
  console.log("子组件触发刷新")
  emit('onRefresh')
};
// 加载下一页数据事件
const onLoad = () => {
  console.log("子组件触发加载下一页了")
  emit('onLoad')
};
// 点击查看文章详情
const toDetail = (id) => {
  router.push({path: `/detail/article/${id}`})
}
</script>

<style lang="scss" scoped>
@import "src/assets/style/index";

.list-item {
  @include background_color("background_color3");
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
    }
  }
}
</style>
