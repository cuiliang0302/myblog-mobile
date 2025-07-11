<!--轮播图-->
<template>
  <van-swipe :autoplay="3000" lazy-render>
    <van-swipe-item v-for="(item,index) in carouselList" :key="index">
      <van-image :src="item.img" alt="" width="100%" @click="toView(item.url,item.title)">
        <template v-slot:loading>
          <van-loading type="spinner" size="20"/>
        </template>
      </van-image>
    </van-swipe-item>
  </van-swipe>
</template>

<script setup>
import {Image as VanImage, showLoadingToast} from 'vant';

const props = defineProps({
  // 轮播图数据
  carouselList: {
    type: Array,
    required: true,
    default: []
  },
})
const toView = (url,title) => {
  console.log(url)
  console.log(title)
  console.log("umami", window.umami.track)
  console.log("点击轮播图：" + title)
  window.umami.track("点击轮播图：" + title)
  window.location.href = url
  showLoadingToast({
    message: '第三方站点跳转中...',
    forbidClick: true,
  });
};
</script>

<style lang="less" scoped>
.van-swipe {
  margin: 0.133rem 0;
}

.van-swipe-item {
  img {
    width: 100%;
    height: 5.333rem;
  }
}
</style>
