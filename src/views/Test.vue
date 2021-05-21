<template>
  <div class="main">
    <drag-verify-img-chip
        v-show="1===2"
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
// 基本滑块验证组件
import dragVerify from "@/components/verify/dragVerify";
// 图片滑块组件
import dragVerifyImg from "@/components/verify/dragVerifyImg";
// 图片滑块组件(拼图)
import dragVerifyImgChip from "@/components/verify/dragVerifyImgChip";
// 旋转图片滑块组件
import dragVerifyImgRotate from "@/components/verify/dragVerifyImgRotate";
import {onMounted, ref, nextTick} from "vue";
import {Tabbar, TabbarItem} from 'vant';

export default {
  components: {
    dragVerify,
    dragVerifyImg,
    dragVerifyImgChip,
    dragVerifyImgRotate
  },
  name: "Test",
  setup() {
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
    return {
      isPassing, img, reimg, pass
    }
  },
}
</script>

<style lang="scss">
@import "src/assets/style/variable";

body {
  background-color: $color-background-white;
}
</style>
