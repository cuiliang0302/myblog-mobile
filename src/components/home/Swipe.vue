<!--轮播图-->
<template>
  <van-swipe :autoplay="3000" lazy-render>
    <van-swipe-item v-for="(item,index) in carouselList" :key="index">
      <van-image :src="item.img" alt="" width="100%" @click="toView(item.url)">
        <template v-slot:loading>
          <van-loading type="spinner" size="20"/>
        </template>
      </van-image>
    </van-swipe-item>
  </van-swipe>
</template>

<script>
import {Swipe, SwipeItem, Image as VanImage, Loading, Toast} from 'vant';

export default {
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [VanImage.name]: VanImage,
    [Loading.name]: Loading,
    Toast
  },
  name: "Swipe",
  props: {
    // 轮播图数据
    carouselList: {
      type: Array,
      default() {
        return []
      }
    },
  },
  setup() {
    const toView = (url) => {
      window.location.href = url
      Toast.loading({
        message: '第三方站点跳转中...',
        forbidClick: true,
      });
    };
    return {toView};
  },
}
</script>

<style lang="scss" scoped>
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
