<template>
  <div class="null">
    <van-image :src="require('@/assets/images/null.png')" width="300px" height="250px">
      <template v-slot:loading>
        <van-loading type="spinner" size="20"/>
      </template>
    </van-image>
  </div>
</template>

<script>
import {Image as VanImage, Loading} from 'vant';

export default {
  components: {
    [VanImage.name]: VanImage,
    [Loading.name]: Loading,
  },
  name: "IsNull"
}
</script>

<style scoped lang="scss">
.null {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 85vh;
}
</style>
