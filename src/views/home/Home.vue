<template>
  <div>
    <NavBar></NavBar>
    <Swipe :carouselList="carouselList"></Swipe>
    <Tab :tabList="tabList" :dataList="article.articleList"></Tab>
    <Tabbar></Tabbar>
  </div>
</template>

<script>
import NavBar from "@/components/common/NavBar";
import Swipe from "@/components/home/Swipe";
import Tab from "@/components/common/Tab";
import Tabbar from '@/components/common/Tabbar'
import {getCarousel, getArticle} from '@/api/home'
import {onDeactivated, onMounted, reactive, ref} from "vue";

export default {
  name: 'Home',
  components: {
    NavBar,
    Swipe,
    Tab,
    Tabbar,
  },
  setup() {
    // 轮播图数据
    let carouselList = ref([])

    // 获取轮播图数据
    async function carouselData() {
      carouselList.value = await getCarousel()
    }

    // 文章列表数据
    let article = reactive({
      count: '',
      articleList: []
    })

    // 获取文章列表数据
    async function articleData() {
      const article_data = await getArticle()
      console.log(article_data)
      article.articleList = article_data.results
    }

    onMounted(() => {
      carouselData()
      articleData()
    })
    // Tab 标签分类名
    const tabList = [
      {
        title: '最新发布',
        name: 'new'
      },
      {
        title: '强烈推荐',
        name: 'recommend'
      },
      {
        title: '最受欢迎',
        name: 'view'
      },
      {
        title: '最多评论',
        name: 'comment'
      }
    ]
    return {
      tabList,
      carouselList,
      article
    }
  }
}
</script>
<style lang="scss">
@import "../../assets/style/variable";

.van-swipe {
  margin: 0 !important;
}
</style>
