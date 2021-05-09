<template>
  <van-tabs v-model:active="activeName" color="#44afe0" @click="tabClick" animated swipeable>
    <van-tab v-for="(item,index) in tabList" :key="index" :title="item.title" :name="item.name">
      <List :data="dataList"></List>
    </van-tab>
  </van-tabs>
</template>

<script>
import {Toast, Tab, Tabs} from 'vant';
import {ref} from 'vue';
import List from "@/components/common/List";

export default {
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Toast.name]: name,
    List
  },
  name: "Tab",
  props: {
    // 标签栏列表
    tabList: {
      type: Array,
      default() {
        return [];
      }
    },
    // 内容列表
    dataList:{
      type: Array,
      default() {
        return [];
      }
    }
  },
  setup() {
    const activeName = ref('');
    const tabClick = (name, title) => {
      // Toast(title);
    }
    return {activeName, tabClick};
  },
}
</script>

<style lang="scss" scoped>

</style>
