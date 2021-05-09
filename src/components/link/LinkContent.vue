<template>
  <section class="link-content">
    <div class="title">
      {{ title }}
    </div>
    <div class="links">
      <van-grid :column-num="2" :gutter="10" clickable>
        <van-grid-item v-for="(item,index) in linkList" :key="index">
          <div class="info">
            <van-image :src="item.logo" width="30px" height="30px" round>
              <template v-slot:loading>
                <van-loading type="spinner" size="20"/>
              </template>
            </van-image>
            <h3>{{ item.name }}</h3>
          </div>
          <div>
            <p>{{ item.describe }}</p>
          </div>
        </van-grid-item>
      </van-grid>
    </div>
  </section>
</template>

<script>
import {Grid, GridItem, Loading, Image as VanImage} from 'vant';

export default {
  name: "LinkContent",
  components: {
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    [Loading.name]: Loading,
    [VanImage.name]: VanImage
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
}
</script>

<style scoped lang="scss">
.link-content {
  margin: 15px 0;

  .title {
    margin: 0 0 10px 10px;
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
  }
}

.van-grid-item :first-child {
  border-radius: 10px;
}
</style>
