<template>
  <div>
    <NavBar></NavBar>
    <Tab :tabList="tabList"></Tab>
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
  name: "Article",
  setup() {
    // Tab 标签分类名
    const tabList = [
      {
        title: 'Linux',
        name: 'Linux'
      },
      {
        title: 'MySQL',
        name: 'MySQL'
      },
      {
        title: 'Python',
        name: 'Python'
      },
      {
        title: 'Django',
        name: 'Django'
      },
      {
        title: 'Docker',
        name: 'Docker'
      },
      {
        title: 'Prometheus',
        name: 'Prometheus'
      },
      {
        title: 'Kubernetes',
        name: 'Kubernetes'
      },
      {
        title: 'CI/CD',
        name: 'CI/CD'
      }
    ]

    return {
      tabList
    }
  }
}
</script>

<style scoped>

</style>
