<template>
  <div v-title="title">
    <NavBar></NavBar>
    <Swipe :carouselList="carouselList"></Swipe>
    <TabList :tabList="tabList" :listState="listState" @onClickTab="onClickTab" @onLoad="onLoad"
             @onRefresh="onRefresh" :load="load"></TabList>
    <Tabbar :activeBar="0"></Tabbar>
  </div>
</template>

<script setup>
import NavBar from "@/components/common/NavBar.vue";
import Swipe from "@/components/home/Swipe.vue";
import TabList from "@/components/common/TabList.vue";
import Tabbar from '@/components/common/Tabbar.vue'
import {getCarousel, getSiteConfig} from "@/api/management";
import {getArticle} from '@/api/blog'
import {onMounted, reactive, ref} from "vue";
import {Toast} from "vant";

// 首页标题
const title = ref('崔亮的博客')
// 加载动画
const load = ref(true)
// 轮播图数据
let carouselList = ref([])

// 文章列表数据
const listState = reactive({
  list: [],
  page: 1,
  count: 1,
  order: '-created_time',
  loading: false,
  finished: false,
  refreshing: false,
});

// Tab 标签分类名
const tabList = [
  {
    id: 0,
    name: '最新发布',
  },
  {
    id: 1,
    name: '强烈推荐',
  },
  {
    id: 2,
    name: '最受欢迎',
  },
  {
    id: 3,
    name: '最多评论',
  }
]
// 标签页排序关键词
let types = ['-created_time', '-is_recommend,-created_time', '-view,-created_time', '-comment,-created_time']
// 标签页点击切换
const onClickTab = (index) => {
  listState.finished = false
  listState.list = []
  listState.order = types[index]
  listState.page = 1
  load.value = true
  const params = {
    page: listState.page,
    size: 5,
    ordering: listState.order,
  }
  getArticle(params).then((response) => {
    console.log(response)
    listState.page++
    listState.list = response.results
    listState.count = response.count
    listState.loading = false;
    load.value = false
  })
}
// 子组件的加载下一页事件
const onLoad = () => {
  listState.page++
  if (listState.list.length < listState.count) {
    const params = {
      page: listState.page,
      size: 5,
      ordering: listState.order,
    }
    getArticle(params).then((response) => {
      console.log(response)
      listState.list.push(...response.results)
      listState.count = response.count
      listState.loading = false;
    })
  } else {
    listState.finished = true;
  }
}
// 子组件的刷新事件
const onRefresh = () => {
  const params = {
    page: 1,
    size: 5,
    ordering: listState.order,
  }
  getArticle(params).then((response) => {
    console.log(listState)
    listState.page = 1
    listState.list = response.results
    listState.count = response.count
    listState.refreshing = false;
    Toast.success('刷新成功');
  })
}

// 获取轮播图数据
async function carouselData() {
  carouselList.value = await getCarousel()
}

// 获取文章列表数据
async function articleData(page = 1, order = '-created_time') {
  const params = {
    page: page,
    size: 5,
    ordering: order,
  }
  const article_data = await getArticle(params)
  load.value = false
  console.log(article_data)
  listState.list = article_data.results
  listState.count = article_data.count
}

// 网站标题
async function siteConfigData() {
  let siteConfig_data = await getSiteConfig()
  title.value = siteConfig_data.title
}

onMounted(() => {
  carouselData()
  articleData()
  siteConfigData()
})

</script>
<style lang="scss">

.van-swipe {
  margin: 0 !important;
}
</style>
