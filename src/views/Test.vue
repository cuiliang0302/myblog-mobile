<!--重置密码-->
<template>
  <div class="main">
    <transition name="van-slide-up">
      <span>{{ time_old }}<br>{{ time_new }}</span>

    </transition>
  </div>
</template>

<script>
import {Step, Steps, Form, Button, Field} from 'vant';
import TimeLine from "@/components/common/TimeLine";
import timeFormat from "@/utils/timeFormat"

export default {
  components: {
    TimeLine,
    [Button.name]: Button
  },
  name: "Test",
  setup() {
    let {timeAgo} = timeFormat()
    const time_old = '2021-05-09T22:55:00.552572+08:00'
    const time_new = timeAgo(time_old)
    return {timeAgo,time_old, time_new}
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
