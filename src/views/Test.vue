<template>
  <div class="main">
    <van-skeleton title round :row="10" :loading="loading">
      <div>实际内容</div>
    </van-skeleton>
  </div>
</template>
<script>
import {onMounted, ref, nextTick} from "vue";
import {Button, Skeleton} from 'vant';

export default {
  components: {
    [Button.name]: Button,
    [Skeleton.name]: Skeleton
  },
  name: "Test",
  setup() {
    const loading = ref(true);

    onMounted(() => {
      loading.value = false;
    });
    return {
      loading,
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
