<template>
  <div class="info">
    <h1>aaa</h1>
    <Test></Test>
  </div>
</template>

<script>
import {computed, onMounted, reactive, ref} from "vue";
import {getCurrentInstance} from "vue"
import Test from "@/views/Test";

export default {
  components: {
    Test
  },
  name: "Test1",
  setup() {
    const internalInstance = getCurrentInstance();  //当前组件实例
    const $bus = internalInstance.appContext.config.globalProperties.$bus;
    if (!$bus.all.get("myClick")) $bus.on("myClick", res => {
      console.log('父组件收到了')
      console.log(res)
    });
    return {}
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/style/variable";
</style>
