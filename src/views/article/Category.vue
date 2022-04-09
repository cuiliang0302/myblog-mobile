<template>
  <div>
    <NavBar></NavBar>
    <TabList :activeTab="Number(categoryID)"
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
import {getCategory, getArticle} from "@/api/blog";
import {Toast} from "vant";
import {onBeforeRouteUpdate, useRouter} from "vue-router";

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
}
// 子组件的加载下一页事件
const onLoad = () => {
  console.log("加载下一页了啊")
  listState.page++
  if (listState.list.length < listState.count) {
    const params = {
      page: listState.page,
      size: 5,
      ordering: listState.order,
      category: categoryID.value
    }
    console.log(params)
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
    category: categoryID.value
  }
  getArticle(params).then((response) => {
    console.log(response)
    listState.list = response.results
    listState.count = response.count
    listState.refreshing = false;
    Toast.success('刷新成功');
  })
}

// 获取文章分类数据
async function categoryData() {
  const category_data = await getCategory()
  console.log(category_data)
  tabList.value = category_data
}

// 获取指定分类下的文章列表数据
async function articleData(page, order, category) {
  const params = {
    page: page,
    size: 50,
    ordering: order,
    category:category,
  }
  const article_data = await getArticle(params)
  load.value = false
  listState.list = article_data.results
  listState.count = article_data.count
  console.log(listState)
}

onMounted(() => {
  categoryID.value = router.currentRoute.value.params.id
  console.log("categoryID", categoryID.value)
  categoryData()
  articleData(1, '-created_time', categoryID.value)
})
onBeforeRouteUpdate((to) => {
  window.scrollTo({top: 0})
  articleData(1, '-created_time', categoryID.value)
});
</script>

<style scoped>

</style>
