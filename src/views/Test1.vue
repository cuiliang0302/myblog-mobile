<template>
  <div class="main">
    <van-cell is-link @click="showPopup">展示弹出层</van-cell>
    <van-popup v-model:show="show">
      <drag-verify-img-chip
          ref="dragVerify"
          :imgsrc="img"
          :isPassing.sync="isPassing"
          :showRefresh="true"
          text="请按住滑块拖动"
          successText="验证通过"
          handlerIcon="el-icon-d-arrow-right"
          successIcon="el-icon-circle-check"
          @refresh="reimg"
          @passcallback="pass"
      >
      </drag-verify-img-chip>
    </van-popup>
  </div>
</template>

<script>
import {onMounted, ref} from "vue";
import {Popup, Cell} from 'vant';
// 图片滑块组件(拼图)
import dragVerifyImgChip from "@/components/verify/dragVerifyImgChip";

export default {
  components: {
    dragVerifyImgChip,
    [Popup.name]: Popup,
    [Cell.name]: Cell
  },
  name: "Test1",
  setup() {
    const show = ref(false);
    const isPassing = ref(false)
    const img = ref('https://img.yzcdn.cn/vant/apple-1.jpg')
    const id = ref(1)
    const reimg = () => {
      console.log('刷新图片')
      id.value = id.value + 1
      img.value = 'https://img.yzcdn.cn/vant/apple-' + id.value + '.jpg'
    }
    const pass = () => {
      console.log('通过验证')
      isPassing.value = true
    }
    const showPopup = () => {
      show.value = true;
    };
    return {
      show, showPopup, isPassing, img, reimg, pass
    };
  },
}
</script>

<style lang="scss">
@import "src/assets/style/variable";
</style>
