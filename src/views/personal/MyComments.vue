<!--我的评论-->
<template>
  <div class="collect">
    <NavBar :title="title"></NavBar>
    <van-tabs v-model:active="active" color="#409EFF" animated swipeable @click="onClick">
      <van-tab title="文章">
        <IsNull></IsNull>
      </van-tab>
      <van-tab title="笔记">
        <IsNull></IsNull>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import TimeLine from "@/components/common/TimeLine";
import NavBar from "@/components/personal/NavBar";
import IsNull from "@/components/common/IsNull";
import {Tab, Tabs, Toast} from 'vant';
import {reactive, ref} from "vue";

export default {
  components: {
    NavBar,
    TimeLine,
    IsNull,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    Toast
  },
  name: "MyComments",
  setup() {
    const active = ref(0);
    const title = '我的评论'
    const collect = reactive({
      list: [],
      kind: '文章',
      action: '评论'
    })
    const onClick = (name, title) => {
      collect.kind = title
      if (name) {
        console.log('显示笔记')
      } else {
        console.log('显示文章')
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
