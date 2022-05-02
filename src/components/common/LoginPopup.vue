<template>
  <van-popup v-model:show="popupIsShow">
    <section>
      <div class="tip-img">
        <img src="/src/assets/images/login-popup.png" alt=""/>
      </div>
      <div class="tip-content">
        <h3>您还没有登录</h3>
        <p>请先登录或注册再进行此操作</p>
      </div>
      <div class="tip-btn">
        <van-button color="linear-gradient(to right, #ffb061, #ff795d)" round
                    @click="toLogin">立即登录
        </van-button>
        <p @click="toRegister">还未注册？</p>
      </div>
    </section>
  </van-popup>
</template>

<script setup>
import {Popup, Button} from 'vant';
import {ref} from "vue";
import {useRouter} from "vue-router";


const router = useRouter()
// 默认不显示登录提示弹窗
const popupIsShow = ref(false);
// 显示登录提示弹窗
const showPopup = () => {
  popupIsShow.value = true;
};
// 跳转至登录页
const toLogin = () => {
  router.push({path: '/loginRegister', query: {component: 'Login'}})
  popupIsShow.value = false
}
// 跳转至注册页
const toRegister = () => {
  router.push({path: '/loginRegister', query: {component: 'Register'}})
  popupIsShow.value = false
}
defineExpose({
  showPopup, popupIsShow
})
</script>

<style lang="scss" scoped>
@import "src/assets/style/index";

section {
  width: 250px;
  height: 280px;
  text-align: center;
  position: relative;

  .tip-img {
    border-style: none;
    position: absolute;
    top: -20%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 2002;
  }

  .tip-content {
    padding-top: 2.533rem;

    h3 {
      @include font_color('font_color1');
      font-size: 0.48rem;
      margin: 0;
      font-weight: normal;
    }

    p {
      @include font_color('font_color2');
    }
  }

  .tip-btn {
    margin-top: 0.667rem;

    button {
      padding: 0 1.733rem;
    }

    p {
      color: #ffb061;
      font-size: 0.373rem;
    }
  }
}


</style>
