<!--字体设置-->
<template>
  <div>
    <h1>这是分享页1</h1>
    <van-button type="primary" @click="share">主要按钮</van-button>
    <svg class="icon search" aria-hidden="true" color="red">
      <use xlink:href="#icon-sousuo"></use>
    </svg>
  </div>
</template>

<script>
import NavBar from "@/components/personal/NavBar";
import {Button, Toast, Overlay, Icon} from 'vant';
import {computed, onMounted, ref} from "vue";

export default {
  components: {
    [Button.name]: Button,
    [Overlay.name]: Overlay,
    [Icon.name]: Icon
  },
  name: "Test",
  setup() {
    const share = () => {
      show.value = true
    }
    const show = ref(false);
    const isWeChat = () => {
      let ua = window.navigator.userAgent.toLowerCase();
      //通过正则表达式匹配ua中是否含有MicroMessenger字符串
      if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
      } else {
        return false;
      }
    }
    onMounted(() => {

    })
    return {
      share, show, isWeChat
    }
  }
}
</script>

<style lang="scss">

.search {
  font-size: 30px;
  fill: currentColor;
  color: red;
}
</style>
