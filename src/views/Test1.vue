<template>
  <div class="info">
    <h1>aaa</h1>
    <van-button type="primary">主要按钮</van-button>
  </div>
</template>

<script>
import {computed, onMounted, reactive, ref} from "vue";
import {Button} from 'vant';
import Test from "@/views/Test";

export default {
  components: {
    [Button.name]: Button
  },
  name: "Test1",
  setup() {
    return {}
  }
}
</script>

<style lang="scss">
@import "src/assets/style/index";

:root {
  //@include button_color('background_color1');
  //--van-button-primary-background-color: red
}
</style>
