<!--重置密码-->
<template>
  <div class="main">
    <transition name="van-slide-up">
      <div>Slide Up</div>
    </transition>
  </div>
</template>

<script>
import {Step, Steps, Form, Button, Field} from 'vant';
import TimeLine from "@/components/common/TimeLine";

export default {
  components: {
    TimeLine,
    [Button.name]: Button
  },
  name: "Test",
  setup() {
    return {
    }
  },
}
</script>

<style scoped lang="scss">
@import "src/assets/style/variable";

.main {
  height: 1000px;

  h1 {
    font-size: 100px;
  }
}
</style>
