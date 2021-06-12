<template>
  <div class="photo">
    <van-cell is-link @click="showPopup">评论输入弹窗</van-cell>
    <van-popup v-model:show="show" position="bottom" :style="{ height: '15%' }" closeable>
      <van-field
          v-model="message"
          rows="3"
          autosize
          label="留言"
          type="textarea"
          maxlength="50"
          placeholder="请输入留言"
          show-word-limit
      />
    </van-popup>
  </div>
</template>

<script>
import {Popup, Cell, Field} from 'vant';
import {ref} from "vue";

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
    return {
      show,
      showPopup,
      message
    };
  }
}
</script>
<style lang="scss">
.photo {
  position: relative;

  .uploadBtn {
    position: absolute;
    left: 0;
    height: 100px;
    width: 100px;
    opacity: 0;
  }
}
</style>

