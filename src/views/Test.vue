<!--字体设置-->
<template>
  <div>
    <h1>这是分享页1</h1>
    <van-button type="primary" @click="share">主要按钮</van-button>
    {{ isWeChat() }}

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

.wrapper {
  color: white;
  font-size: 20px;
  text-align: center;
  line-height: 40px;
  height: 100%;

  .browser {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  .wechat {
    margin-right: 30px;
    display: flex;
    align-items: center;
    flex-direction: row-reverse;

    img {
      width: 70px;
    }
  }
}
</style>
