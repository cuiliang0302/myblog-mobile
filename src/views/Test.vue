<template>
  <div class="photo" id="apply">
    <h1>{{ msg }}</h1>
    <h1>{{ height }}</h1>
    <van-cell is-link @click="showPopup">评论输入弹窗</van-cell>
    <div class="textarea">
      <van-popup v-model:show="show"
                 position="bottom" :style="{ height: '15%' }" closeable
                 close-on-popstate
                 overlay-class="my-overlay"
                 @close="popClose"
      >
        <van-field
            v-model="message"
            rows="4"
            autosize
            label="留言"
            type="textarea"
            maxlength="50"
            label-width="30"
            placeholder="请输入留言"
            :right-icon="require('@/assets/icon/send.png')"
            show-word-limit
            @focus="focus"
        />
      </van-popup>
    </div>
  </div>
</template>

<script>
import {Popup, Cell, Field} from 'vant';
import {onMounted, ref} from "vue";

export default {
  components: {
    [Popup.name]: Popup,
    [Cell.name]: Cell,
    [Field.name]: Field
  },
  name: 'Test',
  setup() {
    const msg = ref('aaa')
    const height = ref()
    const textarea = ref(null)
    const show = ref(false);
    const showPopup = () => {
      show.value = true;
    };
    const message = ref('')
    const popClose = () => {
      console.log("关了")
      let textareaDom = document.querySelector('.textarea>.van-popup--bottom')
      textareaDom.style.bottom = '20px';
    }
    const focus = () => {
      console.log("焦点我来了")
      let UA = window.navigator.userAgent
      if (UA.includes('MiuiBrowser')) {
        if (window.screen.height / window.screen.width >= 2) {
          msg.value = '是小米全面屏浏览器'
          let textareaDom = document.querySelector('.textarea>.van-popup--bottom')
          textareaDom.style.bottom = '38vh';
        }
      } else {
        msg.value = '不是小米全面屏浏览器'
      }
    }
    onMounted(() => {
    })
    return {
      msg,
      height,
      show,
      showPopup,
      message,
      textarea,
      focus,
      popClose
    };
  }
}
</script>
<style lang="scss">
.focusState {
  position: absolute;
}

.textarea > .van-popup--bottom {
  bottom: 25px;
}
</style>

