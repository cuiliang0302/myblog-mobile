<template>
  <van-tabbar v-model="activeBar" placeholder safe-area-inset-bottom>
    <van-tabbar-item to="/">
      <span>首页</span>
      <template #icon="props">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-home-solid"></use>
        </svg>
      </template>
    </van-tabbar-item>
    <van-tabbar-item to="/article">
      <span>文章</span>
      <template #icon="props">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-article-solid"></use>
        </svg>
      </template>
    </van-tabbar-item>
    <van-tabbar-item to="/note">
      <span>笔记</span>
      <template #icon="props">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-note-solid"></use>
        </svg>
      </template>
    </van-tabbar-item>
    <van-tabbar-item to="/personal">
      <span>我的</span>
      <template #icon="props">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-my-solid"></use>
        </svg>
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
    return {
      active,
    };
  },
}
</script>

<style lang="scss" scoped>
</style>
