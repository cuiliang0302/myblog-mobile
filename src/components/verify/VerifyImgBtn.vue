<!--图片验证按钮-->
<template>
  <div class="main">
    <div>
      <van-button v-if="!isPassing" type="default" @click="showPopup" block>
        <img :src="require('@/assets/icon/click.png')"/>
        <b>点击按钮进行验证</b>
      </van-button>
      <van-button v-else plain type="success" block>
        <img :src="require('@/assets/icon/success.png')"/>
        <b>验证成功</b>
      </van-button>
    </div>
    <van-popup v-model:show="show">
      <div class="verify">
        <drag-verify-img-chip
            ref="dragVerify"
            :imgsrc="imgList[imgId]"
            :isPassing.sync="isPassing"
            :showRefresh="true"
            text="请按住滑块拖动"
            successText="验证通过"
            handlerIcon="el-icon-d-arrow-right"
            successIcon="el-icon-circle-check"
            @refresh="reimg"
            @passcallback="pass"
        />
      </div>
    </van-popup>
  </div>
</template>
<script>
// 图片滑块组件(拼图)
import dragVerifyImgChip from "@/components/verify/dragVerifyImgChip";
import {ref} from "vue";
import {Button, Popup, Toast, Icon} from 'vant';

export default {
  components: {
    dragVerifyImgChip,
    [Button.name]: Button,
    [Popup.name]: Popup,
    [Icon.name]: Icon,
    Toast
  },
  name: "VerifyImgBtn",
  setup() {
    // 验证弹窗状态
    const show = ref(false)
    const isPassing = ref(false)
    const imgList = ref([require('@/assets/verify/verify-1.jpg'),
      require('@/assets/verify/verify-2.jpg'),
      require('@/assets/verify/verify-3.jpg'),
      require('@/assets/verify/verify-4.jpg'),
      require('@/assets/verify/verify-5.jpg'),
      require('@/assets/verify/verify-6.jpg')])
    const imgId = ref(0)
    const reimg = () => {
      console.log('刷新图片')
      if (imgId.value + 1 >= imgList.value.length) {
        imgId.value = 0
      } else {
        imgId.value = imgId.value + 1
      }
    }
    const pass = () => {
      Toast.success('验证成功！');
      isPassing.value = true
      setTimeout(() => {
        show.value = false
      }, 1000);
    }
    const showPopup = () => {
      show.value = true;
    };
    return {
      show, showPopup, isPassing, imgList, imgId, reimg, pass
    }
  },
}
</script>

<style lang="scss">
@import "src/assets/style/variable";

.verify {
  padding: 20px
}

.van-button__text {
  img {
    width: 25px;
  }

  b {
    vertical-align: 6px;
    margin-left: 10px;
    font-weight: normal;
  }
}
</style>
