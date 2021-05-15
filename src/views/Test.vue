<template>
  <div class="main">
    <van-tabs v-model:active="active" @click="onClick">
      <van-tab v-for="(item,index) in tabList" :key="index" :title="item.name" :name="item.id">内容</van-tab>
    </van-tabs>
  </div>
</template>

<script>
import {Tab, Tabs, Cell} from 'vant';
import {reactive, ref} from "vue";

export default {
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Cell.name]: Cell,
  },
  name: "Test",
  setup() {
    const active = ref(2);
    const tabList = [
      {
        id: 0,
        name: '最新发布',
      },
      {
        id: 1,
        name: '强烈推荐',
      },
      {
        id: 2,
        name: '最受欢迎',
      },
      {
        id: 3,
        name: '最多评论',
      }
    ]
    const onClick = (name, title) => console.log(title);
    return {active, tabList, onClick};
  },
}
</script>

<style scoped lang="scss">
@import "src/assets/style/variable";

.main {
  height: 1000px;

  h1 {
    font-size: 100px;
  }

  .van-cell {
    height: 200px;
  }
}
</style>
