<template>
  <div>
    <NavBar></NavBar>
    <Tab :tabList="tagList"></Tab>
    <Tabbar></Tabbar>
  </div>

</template>

<script>
import NavBar from "@/components/common/NavBar";
import Tabbar from '@/components/common/Tabbar'
import Tab from "@/components/common/Tab";

export default {
  components: {
    NavBar,
    Tab,
    Tabbar,
  },
  name: "Tag",
  setup() {
    // Tab 标签名
    const tagList = [
      {
        title: '编程开发',
        name: '编程开发'
      },
      {
        title: '经验总结',
        name: '经验总结'
      },
      {
        title: '服务部署',
        name: '服务部署'
      },
      {
        title: '运维案例',
        name: '运维案例'
      },
      {
        title: '生活杂谈',
        name: '生活杂谈'
      },
      {
        title: '虚拟化',
        name: '虚拟化'
      }
    ]

    return {
      tagList
    }
  }
}
</script>

<style scoped>

</style>
