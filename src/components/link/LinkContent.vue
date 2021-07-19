<template>
  <section class="link-content">
    <div class="title">
      {{ title }}
    </div>
    <div class="links">
      <van-grid :column-num="2" :gutter="10" clickable>
        <van-grid-item v-for="(item,index) in linkList" :key="index">
          <div class="info" @click="toLink(item.url)">
            <van-image :src="item.logo" width="30px" height="30px" round>
              <template v-slot:loading>
                <van-loading type="spinner" size="20"/>
              </template>
            </van-image>
            <h3>{{ item.name }}</h3>
          </div>
          <div class="describe">
            <p>{{ item.describe }}</p>
          </div>
        </van-grid-item>
      </van-grid>
    </div>
  </section>
</template>

<script>
import {Grid, GridItem, Loading, Image as VanImage,Toast} from 'vant';

export default {
  name: "LinkContent",
  components: {
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    [Loading.name]: Loading,
    [VanImage.name]: VanImage,
    Toast
  },
  props: {
    // 评论回复列表
    title: {
      type: String, default() {
        return ''
      }
    },
    linkList: {
      type: Array, default() {
        return []
      }
    },
  },
  setup() {
    const toLink = (url) => {
      window.location.href = url
      Toast.loading({
        message: '第三方网站跳转中...',
        forbidClick: true,
      });
    }
    return {
      toLink
    }
  }
}
</script>

<style scoped lang="scss">
@import "~@/assets/style/index.scss";
.link-content {
  margin: 0.4rem 0;

  .title {
    margin: 0 0 0.267rem 0.267rem;
    font-size: 0.533rem;
  }

  .links {
    .info {
      display: flex;
      align-items: center;

      h3 {
        margin-left: 10px;
      }
    }
    .describe{
      p{
        line-height: 15px;
        margin-bottom: 0;
        @include font_color('font_color2');
      }
    }
  }
}
.van-grid-item{
  height: 150px;
  .van-grid-item :first-child {
    border-radius: 10px;
  }
}
</style>
