<template>
  <div>
    <NavBar></NavBar>
    <TabList :activeTab="Number(tagID)"
             :tabList="tabList"
             :listState="listState"
             @onClickTab="tabClick"
             @onLoad="onLoad"
             @onRefresh="onRefresh"
             :load="load">
    </TabList>
    <Tabbar :activeBar=1></Tabbar>
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
// 当前标签id
const tagID = ref()
// 加载动画
const load = ref(true)
// Tab 标签列表
const tabList = ref([])
// 文章列表数据
const listState = reactive({
  list: [],
  page: 1,
  count: 1,
  order: '-created_time',
  tag: 1,
  loading: false,
  finished: false,
  refreshing: false,
});
// 标签页点击切换
const tabClick = (index) => {
  tagID.value = index
  router.push('/tag/' + tagID.value)
  listState.page = 1
  listState.tag = tagID.value
}
// 子组件的加载下一页事件
const onLoad = () => {
  if (listState.list.length < listState.count) {
    listState.page++
    const params = {
      page: listState.page,
      size: 5,
      ordering: listState.order,
      tag: listState.tag
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
  listState.page = 1
  const params = {
    page: listState.page,
    size: 5,
    ordering: listState.order,
    tag: listState.tag
  }
  Blog.getArticle(params).then((response) => {
    console.log(response)
    listState.list = response.results
    listState.count = response.count
    listState.refreshing = false;
    showSuccessToast('刷新成功');
  })
}

// 获取文章标签数据
const tagData = async () => {
  try {
    tabList.value = await Blog.getTag()
  } catch (error) {
    console.log(error)
    showFailToast("获取文章标签数据失败")
  }
}

// 首屏获取文章列表数据
const articleData = async (page, order, tag) => {
  const params = {
    page: page,
    size: 5,
    ordering: order,
    tag: tag
  }
  try {
    const article_data = await Blog.getArticle(params)
    console.log(article_data)
    load.value = false
    listState.list = article_data.results
    listState.count = article_data.count
  } catch (e) {
    console.log(e)
    showFailToast("获取文章列表数据失败")
  }
}

onMounted(() => {
  tagID.value = router.currentRoute.value.params.id
  console.log("tagID", tagID.value)
  tagData()
  articleData(1, '-created_time', 1)
})
onBeforeRouteUpdate((to) => {
  window.scrollTo({top: 0})
  articleData(1, '-created_time', tagID.value)
});
</script>

<style scoped>

</style>
