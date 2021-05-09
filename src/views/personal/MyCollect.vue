<!--我的收藏-->
<template>
  <div class="collect">
    <NavBar :title="title"></NavBar>
    <van-tabs v-model:active="active" color="#409EFF" animated swipeable @click="onClick">
      <van-tab title="文章">
        <TimeLine :list="collect.list" :kind="collect.kind" :action="collect.action"></TimeLine>
      </van-tab>
      <van-tab title="笔记">
        <TimeLine :list="collect.list" :kind="collect.kind" :action="collect.action"></TimeLine>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import TimeLine from "@/components/common/TimeLine";
import NavBar from "@/components/personal/NavBar";
import {Tab, Tabs, Toast} from 'vant';
import {reactive, ref} from "vue";

export default {
  components: {
    NavBar,
    TimeLine,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    Toast
  },
  name: "MyCollect",
  setup() {
    const active = ref(0);
    const title = '我的收藏'
    const collect = reactive({
      list: [
        {time: '2011-01-01 13:14', name: '三字经'},
        {time: '2011-02-02 23:24', name: '百家姓'},
      ],
      kind: '文章',
      action: '收藏'
    })
    const onClick = (name, title) => {
      collect.kind = title
      if (name) {
        console.log('显示笔记')
        collect.list = [
          {time: '2011-01-01 13:14', name: '四字经'},
          {time: '2011-02-02 23:24', name: '千家姓'},
        ]
      } else {
        console.log('显示文章')
        collect.list = [
          {time: '2022-01-01 13:14', name: '三字经'},
          {time: '2022-02-02 23:24', name: '百家姓'},
        ]
      }
    }
    return {
      active,
      title,
      collect,
      onClick
    }
  }
}
</script>

<style scoped>

</style>
