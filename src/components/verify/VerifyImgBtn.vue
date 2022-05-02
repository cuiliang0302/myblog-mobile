<!--图片验证按钮-->
<template>
  <div class="main">
    <div class="verify-btn">
      <van-button v-if="!isPassing" :type="btnType" @click="showPopup" block plain>
        <MyIcon class="icon" type="icon-verify"/>
        <b>点击按钮进行验证</b>
      </van-button>
      <van-button v-else plain type="success" block>
        <MyIcon class="icon" type="icon-success"/>
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
<script setup>
// 图片滑块组件(拼图)
import dragVerifyImgChip from "@/components/verify/dragVerifyImgChip.vue";
import {onMounted, ref} from "vue";
import {Button, Popup, Toast, Icon} from 'vant';
import verify1 from '@/assets/verify/verify-1.jpg'
import verify2 from '@/assets/verify/verify-2.jpg'
import verify3 from '@/assets/verify/verify-3.jpg'
import verify4 from '@/assets/verify/verify-4.jpg'
import verify5 from '@/assets/verify/verify-5.jpg'
import verify6 from '@/assets/verify/verify-6.jpg'
import icon from '@/utils/icon'
let {MyIcon} = icon()
const props = defineProps({
  // 是否通过验证
  isPassing: {
    type: Boolean,
    default: false
  },
  // 按钮样式
  btnType: {
    type: String,
    default: 'default'
  }
})
const emit = defineEmits(['pass'])
// 滑块验证对象
const dragVerify = ref(null)
// 验证弹窗状态
const show = ref(false)
const imgList = ref([verify1, verify2, verify3, verify4, verify5, verify6])
const imgId = ref()
const getImgId = () => {
  imgId.value = parseInt(Math.random() * imgList.value.length, 10);
}
const reimg = () => {
  console.log('刷新图片')
  getImgId()
}
const pass = () => {
  Toast.success('验证成功！');
  emit('pass')
  // props.isPassing.value = true
  setTimeout(() => {
    show.value = false
    dragVerify.value.reset()
    reimg()
  }, 1000);
}
const showPopup = () => {
  show.value = true;
};
onMounted(() => {
  reimg()
})
</script>

<style lang="scss">
@import "src/assets/style/index";
.main{
  .verify-btn{
    width: 5.6rem;
    .van-overlay{
      z-index: 2001;
      width: 105vw;
      height: 105vh;
      top: -110px;
      left: -45px;
    }
  }
}
.verify {
  padding: 0.533rem
}

.van-button__text {
  .icon {
    font-size: 30px;
  }

  b {
    vertical-align: 0.16rem;
    margin-left: 0.267rem;
    font-weight: normal;
  }
}
</style>
