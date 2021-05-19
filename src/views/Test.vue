<template>
  <div class="main">
    <van-tabbar v-model="activeBar" placeholder safe-area-inset-bottom>
      <van-tabbar-item to="/home">
        <span>首页</span>
        <template #icon="props">
          <img :src="props.active ? home.active : home.inactive"/>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/article">
        <span>文章</span>
        <template #icon="props">
          <img :src="props.active ? article.active : article.inactive"/>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/note">
        <span>笔记</span>
        <template #icon="props">
          <img :src="props.active ? note.active : note.inactive"/>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/personal">
        <span>我的</span>
        <template #icon="props">
          <img :src="props.active ? user.active : user.inactive"/>
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
import {onMounted, ref, nextTick} from "vue";
import { Tabbar, TabbarItem } from 'vant';

export default {
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  },
  name: "Test",
  setup() {
    const activeBar = ref(0);
    const home = {
      active: require('@/assets/icon/home-active.png'),
      inactive: require('@/assets/icon/home.png'),
    }
    const article = {
      active: require('@/assets/icon/article-active.png'),
      inactive: require('@/assets/icon/article.png'),
    }
    const note = {
      active: require('@/assets/icon/note-active.png'),
      inactive: require('@/assets/icon/note.png'),
    }
    const user = {
      active: require('@/assets/icon/user-active.png'),
      inactive: require('@/assets/icon/user.png'),
    }
    return {
      home,
      article,
      note,
      user,
      activeBar,
    };
  },
}
</script>

<style lang="scss">
@import "src/assets/style/variable";

body {
  background-color: $color-background-white;
}
</style>
