<template>
  <div>
    <van-cell is-link @click="showPopup">评论输入弹窗</van-cell>
    <div class="textarea">
      <van-popup v-model:show="show"
                 position="bottom" :style="{ height: '15%' }" closeable
                 close-on-popstate
                 overlay-class="my-overlay"
      >
        <van-field
            v-model="message"
            rows="4"
            autosize
            type="textarea"
            maxlength="50"
            label-width="0"
            placeholder="请输入留言"
            :right-icon="require('@/assets/icon/send.png')"
            show-word-limit
            @focus="focus"
            @blur="blur"
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
    const show = ref(false);
    const showPopup = () => {
      show.value = true;
    };
    const message = ref('')
    const blur = () => {
      let textareaDom = document.querySelector('.textarea>.van-popup--bottom')
      textareaDom.style.bottom = '20px';
    }
    const focus = () => {
      let UA = window.navigator.userAgent
      if (UA.includes('MiuiBrowser')) {
        if (window.screen.height / window.screen.width >= 2) {
          let textareaDom = document.querySelector('.textarea>.van-popup--bottom')
          textareaDom.style.bottom = '38vh';
        }
      }
    }
    onMounted(() => {
    })
    return {
      show,
      showPopup,
      message,
      focus,
      blur
    };
  }
}
</script>
<style lang="scss">
.textarea > .van-popup--bottom {
  bottom: 25px;
}
</style>

