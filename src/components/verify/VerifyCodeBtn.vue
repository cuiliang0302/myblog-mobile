<!--图片验证按钮-->
<template>
  <div class="main">
    <div>
      <van-button type="primary" @click="showPopup" block plain size="small"
                  :text="codeBtn.btnText"
                  :disabled="codeBtn.disabled"/>
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
import {onMounted, reactive, ref, watch} from "vue";
import {Button, Popup, Toast, Icon} from 'vant';

export default {
  components: {
    dragVerifyImgChip,
    [Button.name]: Button,
    [Popup.name]: Popup,
    [Icon.name]: Icon,
    Toast
  },

  name: "VerifyCodeBtn",
  setup(props, {emit}) {
    // 是否通过验证
    const isPassing = ref(false)
    // 滑块验证对象
    const dragVerify = ref(null)
    // 获取验证码按钮对象
    let codeBtn = reactive({disabled: false, btnText: '获取验证码'});
    // 点击获取验证码
    const getCode = () => {
      let second = 60
      const intervalObj = setInterval(() => {
        codeBtn.disabled = true
        second--
        codeBtn.btnText = '获取验证码(' + second + 's)'
        if (second === 0) {
          codeBtn.disabled = false
          codeBtn.btnText = '获取验证码'
          clearInterval(intervalObj)
        }
      }, 1000)
    }
    // 验证弹窗状态
    const show = ref(false)
    const imgList = ref([require('@/assets/verify/verify-1.jpg'),
      require('@/assets/verify/verify-2.jpg'),
      require('@/assets/verify/verify-3.jpg'),
      require('@/assets/verify/verify-4.jpg'),
      require('@/assets/verify/verify-5.jpg'),
      require('@/assets/verify/verify-6.jpg')])
    const imgId = ref()
    const getImgId = () => {
      imgId.value = parseInt(Math.random() * imgList.value.length, 10);
    }
    const reimg = () => {
      getImgId()
    }
    const pass = () => {
      Toast.success('滑动验证成功！');
      getCode()
      emit('pass')
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
    return {
      show, showPopup, imgList, imgId, reimg, pass, codeBtn, dragVerify,isPassing
    }
  }
}
</script>

<style lang="scss">

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
