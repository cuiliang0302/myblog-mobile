<template>
  <div class="photo">
    <van-cell is-link @click="showPopup">评论输入弹窗</van-cell>
    <van-popup v-model:show="show" position="bottom" :style="{ height: '15%' }" closeable
               close-on-popstate
               safe-area-inset-bottom
               overlay-class="my-overlay"
    >
      <van-field
          ref="textarea"
          v-model="message"
          rows="3"
          autosize
          label="留言"
          type="textarea"
          maxlength="50"
          placeholder="请输入留言"
          show-word-limit
          @focus="aaa"
      />
    </van-popup>
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
    const textarea = ref(null)
    const show = ref(false);
    const showPopup = () => {
      show.value = true;
    };
    const message = ref('')
    const aaa = () => {
      console.log("焦点我来了")
    }
    onMounted(() => {
      console.log(textarea)
    })
    return {
      show,
      showPopup,
      message,
      textarea,
      aaa
    };
  }
}
</script>
<style lang="scss">
</style>

