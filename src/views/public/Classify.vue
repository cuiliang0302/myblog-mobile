<template>
  <div>
    <NavBar></NavBar>
    <section>
      <div class="sidebar">
        <van-sidebar v-model="sidebarActive">
          <van-sidebar-item v-for="(item,index) in monthList"
                            :key="index"
                            :title="item.month+'('+item.count+')篇'"/>
        </van-sidebar>
      </div>
      <div class="timeline">
        <van-steps direction="vertical" :active="0">
          <van-step v-for="(item,index) in articleList" :key="index">
            <h3>《{{ item.title }}》</h3>
            <p>{{ item.date }}</p>
          </van-step>
        </van-steps>
      </div>
    </section>
    <Tabbar></Tabbar>
  </div>

</template>

<script>

import NavBar from "@/components/common/NavBar";
import Tabbar from '@/components/common/Tabbar'
import {Step, Steps, Sidebar, SidebarItem} from 'vant';
import {ref} from "vue";
import Search from "@/views/public/Search";

export default {
  name: 'Classify',
  components: {
    Search,
    [Step.name]: Step,
    [Steps.name]: Steps,
    [Sidebar.name]: Sidebar,
    [SidebarItem.name]: SidebarItem,
    NavBar,
    Tabbar,
  },
  setup() {
    const sidebarActive = ref(0);
    const monthList = [
      {month: '2021年4月', count: 3},
      {month: '2021年3月', count: 5},
      {month: '2021年2月', count: 8},
      {month: '2021年1月', count: 3},
      {month: '2020年12月', count: 11},
      {month: '2020年11月', count: 6},
      {month: '2020年10月', count: 9},
      {month: '2021年9月', count: 3},
      {month: '2021年8月', count: 5},
      {month: '2021年7月', count: 8},
      {month: '2021年6月', count: 3},
      {month: '2020年5月', count: 1},
      {month: '2020年4月', count: 6},
      {month: '2020年3月', count: 9}]
    const articleList = [
      {'title': '初始表', 'date': '2021-2-6 10:13'},
      {'title': '钢铁是怎样炼成的', 'date': '2021-1-6 12:13'},
      {'title': '三字经', 'date': '2021-2-6 10:13'},
      {'title': '百家姓', 'date': '2020-12-6 12:13'},
      {'title': '绕口令大全', 'date': '2020-12-6 10:13'},
      {'title': '唐诗三百首', 'date': '2020-11-6 12:13'}
    ]
    return {sidebarActive, monthList, articleList};
  }
}
</script>
<style lang="scss" scoped>

section {
  display: flex;

  .sidebar {
    flex: 2;
    .van-sidebar{
      width: 145px;
    }
  }

  .timeline {
    flex: 3;
  }
}

.van-sidebar {
  width: 140px;
}
</style>
