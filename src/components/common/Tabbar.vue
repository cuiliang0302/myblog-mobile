<template>
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
</template>

<script>
import {Tabbar, TabbarItem} from 'vant';
import {ref} from 'vue';

export default {
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
  },
  name: "Tabbar",
  props: {
    // 加载中动画
    activeBar: {
      type: Number,
      default() {
        return 0;
      }
    }
  },
  setup() {
    const active = ref(0);
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
      active,
    };
  },
}
</script>

<style lang="scss" scoped>
.van-tabbar{
  img {
opacity: 0.7;
  }
}
</style>
