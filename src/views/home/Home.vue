<template>
  <div class="home">
    <NavBar></NavBar>
    <Swipe :carouselList="carousel_list"></Swipe>
    <TabList :tabList="tab_list" :listState="list_state" @onClickTab="onClickTab" @onLoad="onLoad"
             @onRefresh="onRefresh" :load="load"></TabList>
    <Tabbar :activeBar="0"></Tabbar>
  </div>
</template>
<script setup>
import {ref, reactive, onMounted} from "vue"
import NavBar from "@/components/common/NavBar.vue";
import Swipe from "@/components/home/Swipe.vue";
import TabList from "@/components/common/TabList.vue";
import Tabbar from '@/components/common/Tabbar.vue'
import management from "@/api/management";
import {showFailToast} from "vant";
import Blog from "@/api/blog";
// 轮播图
const carousel_list = ref([])
// 获取轮播图数据
const carouselData = async () => {
  try {
    const response = await management.getCarousel();
    console.log(response);
    carousel_list.value = response;
  } catch (error) {
    showFailToast("获取轮播图数据失败!");
  }
}
// 加载动画
const load = ref(true)
// 文章列表数据
const list_state = reactive({
  list: [],
  page: 1,
  count: 1,
  order: '-created_time',
  loading: false,
  finished: false,
  refreshing: false,
});

// Tab 标签分类名
const tab_list = [
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
  list_state.finished = false
  list_state.list = []
  list_state.order = types[index]
  list_state.page = 1
  load.value = true
  const params = {
    page: list_state.page,
    size: 5,
    ordering: list_state.order,
  }
  Blog.getArticle(params).then((response) => {
    console.log(response)
    list_state.page++
    list_state.list = response.results
    list_state.count = response.count
    list_state.loading = false;
    load.value = false
  })
}
// 子组件的加载下一页事件
const onLoad = () => {
  list_state.page++
  if (list_state.list.length < list_state.count) {
    const params = {
      page: list_state.page,
      size: 5,
      ordering: list_state.order,
    }
    Blog.getArticle(params).then((response) => {
      console.log(response)
      list_state.list.push(...response.results)
      list_state.count = response.count
      list_state.loading = false;
    })
  } else {
    list_state.finished = true;
  }
}
// 子组件的刷新事件
const onRefresh = () => {
  const params = {
    page: 1,
    size: 5,
    ordering: list_state.order,
  }
  Blog.getArticle(params).then((response) => {
    console.log(list_state)
    list_state.page = 1
    list_state.list = response.results
    list_state.count = response.count
    list_state.refreshing = false;
    showSuccessToast('刷新成功');
  })
}

// 获取文章列表数据
async function articleData(page = 1, order = '-created_time') {
  const params = {
    page: page,
    size: 5,
    ordering: order,
  }
  const article_data = await Blog.getArticle(params)
  load.value = false
  console.log(article_data)
  list_state.list = article_data.results
  list_state.count = article_data.count
}

onMounted(() => {
  carouselData()
  articleData()
  // 加载umami统计
  let script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://umami.cuiliangblog.cn/script.js';
  script.setAttribute('data-website-id', "148a1e4d-f683-4819-a172-7605346b75e7")
  script.setAttribute('data-auto-track', "false")
  document.body.appendChild(script)
  console.log("umami", window.umami.track)
})
</script>
<style scoped>
h1 {
  font-size: 30px;
}
</style>