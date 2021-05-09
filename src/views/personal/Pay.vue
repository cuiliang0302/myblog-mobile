<!--赞赏支持-->
<template>
  <div class="pay">
    <NavBar :title="title"></NavBar>
    <section v-for="(item,index) in info" :key="index">
      <div class="title">
        <h2>{{ item.kind }}</h2>
        <span></span>
      </div>
      <div class="pay-img">
        <van-image :src="item.url" alt="" radius="0.4rem" lazy-load height="7.467rem" width="7.467rem">
          <template v-slot:loading>
            <van-loading type="spinner" size="20"/>
          </template>
        </van-image>
      </div>
    </section>
  </div>
</template>

<script>
import NavBar from "@/components/personal/NavBar";
import {Image as VanImage, Loading} from 'vant';

export default {
  components: {
    [VanImage.name]: VanImage,
    [Loading.name]: Loading,
    NavBar
  },
  name: "Pay",
  setup() {
    const title = '赞赏支持'
    const info = [
      {kind: '支付宝', url: 'https://cdn.cuiliangblog.cn/static/images/weixin.png'},
      {kind: '微信', url: 'https://cdn.cuiliangblog.cn/static/images/weixin.png'}
    ]
    return {
      title,
      info
    }
  }
}
</script>

<style scoped lang="scss">
.pay {
  .title {
    margin: 0.4rem;

    h2 {
      margin: 0;
      padding: 0;
      font-weight: normal;
    }

    span {
      display: inline-block;
      height: 3px;
      width: 1.333rem;
      background-image: linear-gradient(to right, #3498db, #2ecc71);
    }
  }

  .pay-img {
    text-align: center;
  }
}
</style>
