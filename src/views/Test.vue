<template>
  <div>
    <van-button type="primary" @click="send">主要按钮</van-button>
  </div>
</template>

<script>
import {Button} from 'vant';
import {ref, getCurrentInstance} from "vue";

export default {
  components: {
    [Button.name]: Button
  },
  name: 'Test',
  setup() {
    const obj = ref("123");
    const internalInstance = getCurrentInstance();
    const $bus = internalInstance.appContext.config.globalProperties.$bus;
    const send = () => {
      console.log("子组件点了")
      $bus.emit("myClick", obj.value);
    }
    return {send}
  }
}
</script>
<style lang="scss">

</style>

