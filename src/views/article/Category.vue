<template>
  <div>
    <NavBar></NavBar>
    <TabList :activeTab="article_params.category"
             :tabList="tabList"
             :listState="listState"
             @onClickTab="tabClick"
             @onLoad="onLoad"
             @onRefresh="onRefresh"
             :load="load"
    >
    </TabList>
    <Tabbar :activeBar="1"></Tabbar>
  </div>
</template>

<script setup>
import NavBar from "@/components/common/NavBar.vue";
import Tabbar from '@/components/common/Tabbar.vue'
import TabList from "@/components/common/TabList.vue";
import {onMounted, reactive, ref} from "vue";
import {showFailToast, showSuccessToast} from "vant";
import {onBeforeRouteUpdate, useRouter} from "vue-router";
import Blog from "@/api/blog";
const router = useRouter()
// 当前文章分类id
const categoryID = ref()
// 加载动画
const load = ref(true)
// Tab 标签分类名
const tabList = ref([])
// 文章列表数据
const listState = reactive({
  list: [],
  page: 1,
  count: 1,
  order: '-created_time',
  category: 1,
  loading: false,
  finished: false,
  refreshing: false,
});
// 标签页点击切换
const tabClick = (index) => {
  categoryID.value = index
  router.push('/category/' + categoryID.value)
  article_params.category = categoryID.value
  article_params.page = 1
  listState.list = []
  articleData()
}

// 子组件的加载下一页事件
const onLoad = () => {
  console.log("加载下一页了啊")
  if (listState.list.length < listState.count) {
    article_params.page = article_params.page + 1;
    console.log(listState.page);
    console.log("获取下一页数据")
    articleData()
  } else {
    console.log("无更多数据")
    listState.finished = true;
  }
}
// 子组件的刷新事件
const onRefresh = () => {
  article_params.page = 1
  listState.page = 1
  listState.list = []
  articleData()
  showSuccessToast("刷新成功")
}

// 获取文章分类数据
const categoryData = async () => {
  try {
    const response = await Blog.getCategory()
    console.log(response)
    tabList.value = response
  } catch (error) {
    showFailToast("获取文章分类数据失败")
  }
}

// 获取文章列表参数
const article_params = reactive({
  page: 1,
  size: 5,
  ordering: '',
  category: 1,
})

// 获取文章列表
const articleData = async () => {
  console.log("开始请求数据了啊")
  try {
    console.log(article_params)
    const response = await Blog.getArticle(article_params)
    console.log(response)
    load.value = false
    listState.list = [...listState.list, ...response.results]
    listState.count = response.count
    console.log(listState.list)
    console.log(listState.list.length)
    console.log(listState.count)
    listState.refreshing = false;
    if (listState.list.length === listState.count) {
      console.log("没最新数据了啊")
      listState.finished = true;
    }
  } catch (error) {
    showFailToast("获取文章列表失败")
  }
}

onMounted(() => {
  categoryData()
  // 获取首屏文章列表数据
  article_params.category = parseInt(router.currentRoute.value.params.id)
  console.log(article_params.category)
  console.log(typeof article_params.category)
  article_params.ordering = '-created_time'
  // listState.category = router.currentRoute.value.params.id
  articleData()
})
onBeforeRouteUpdate((to) => {
  window.scrollTo({top: 0})
});
</script>

<style scoped>

</style>
