<template>
  <div>
    <NavBar></NavBar>
    <Swipe :carouselList="carouselList"></Swipe>
    <Tab :tabList="tabList"></Tab>
    <Tabbar></Tabbar>
  </div>
</template>

<script>
import NavBar from "@/components/common/NavBar";
import Swipe from "@/components/home/Swipe";
import Tab from "@/components/common/Tab";
import Tabbar from '@/components/common/Tabbar'
import {getCarousel} from '@/api/home'
import {onDeactivated, onMounted, ref} from "vue";

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
    // async function carousel () {
    //   let res = await getCarousel()
    //   this.barData.push(res.normal)
    //   this.barData.push(res.alert)
    //   this.barData.push(res.down)
    // }
    // 获取轮播图数据
    onMounted(() => {
      getCarousel().then((response) => {
        console.log(response)
        carouselList.value = response
      }).catch(error => {
        //发生错误时执行的代码
        console.log('异常响应')
        console.log(error)
      })
    })
    // Tab 标签分类名
    const tabList = [
      {
        title: '强烈推荐',
        name: 'recommend'
      },
      {
        title: '最新发布',
        name: 'new'
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
      carouselList
    }
  }
}
</script>
<style lang="scss">
@import "../../assets/style/variable";
.van-swipe{
  margin: 0!important;
}
</style>
