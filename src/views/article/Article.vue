<template>
  <div>
    <NavBar></NavBar>
    <TabList :tabList="tabList" :listState="listState" @click="tabClick" @onLoad="onLoad"
             @onRefresh="onRefresh" :load="load"></TabList>
    <Tabbar :activeBar="1"></Tabbar>
  </div>
</template>

<script>
import NavBar from "@/components/common/NavBar";
import Tabbar from '@/components/common/Tabbar'
import TabList from "@/components/common/TabList";
import {onMounted, reactive, ref} from "vue";
import {getCategory} from "@/api/article";
import {getArticle} from "@/api/home";
import {Toast} from "vant";

export default {
  components: {
    NavBar,
    TabList,
    Tabbar,
  },
  name: "Article",
  setup() {
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
      listState.finished = false
      listState.list = []
      listState.category = index
      listState.page = 1
      getArticle(listState.page, listState.order, listState.category).then((response) => {
        console.log(response)
        listState.page++
        listState.list = response.results
        listState.count = response.count
        listState.loading = false;
      })
    }
    // 子组件的加载下一页事件
    const onLoad = () => {
      listState.page++
      if (listState.list.length < listState.count) {
        getArticle(listState.page, listState.order, listState.category).then((response) => {
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
      getArticle(listState.page, listState.order, listState.category).then((response) => {
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

    // 首屏获取文章列表数据
    async function articleData(page = 1, order = '-created_time', category = 1) {
      const article_data = await getArticle(page, order, category)
      console.log(article_data)
      load.value = false
      listState.list = article_data.results
      listState.count = article_data.count
    }

    onMounted(() => {
      categoryData()
      articleData()
    })
    return {
      tabList,
      listState,
      tabClick,
      onLoad,
      onRefresh,
      load
    }
  }
}
</script>

<style scoped>

</style>
