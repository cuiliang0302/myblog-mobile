<!--我的消息通知-->
<template>
  <div class="message">
    <NavBar :title="title"></NavBar>
    <IsNull></IsNull>
  </div>
</template>

<script>
import TimeLine from "@/components/common/TimeLine";
import NavBar from "@/components/personal/NavBar";
import IsNull from "@/components/common/IsNull";
import {Tab, Tabs, Toast} from 'vant';
import {reactive, ref} from "vue";

export default {
  components: {
    NavBar,
    TimeLine,
    IsNull,
  },
  name: "MyMessage",
  setup() {
    const title = '消息通知'
    return {
      title,
    }
  }
}
</script>

<style scoped>

</style>
