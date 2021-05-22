<template>
  <div class="main">
    <van-button round type="primary" @click="resetImg">重置</van-button>
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
  </div>
</template>

<script>
import {onMounted, ref} from "vue";
import {Popup, Cell, Button} from 'vant';
// 图片滑块组件(拼图)
import dragVerifyImgChip from "@/components/verify/dragVerifyImgChip";

export default {
  components: {
    dragVerifyImgChip,
    [Popup.name]: Popup,
    [Cell.name]: Cell,
    [Button.name]: Button
  },
  name: "Test1",
  setup() {
    // 滑块验证对象
    const dragVerify = ref(null)
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
    const resetImg = () => {
      console.log("要重置了")
      isPassing.value = false
      reimg()
      dragVerify.value.reset()
    }
    return {
      isPassing, img, reimg, pass, resetImg, dragVerify
    };
  },
}
</script>

<style lang="scss">
@import "src/assets/style/variable";
</style>
