<template>
  <div class="bgc" ref="wraper">
    <section>
      <div class="wave wave1"></div>
      <div class="wave wave2"></div>
      <div class="wave wave3"></div>
      <div class="wave wave4"></div>
    </section>
    <div class="content">
      <div class="title">
        <span :class="component.name==='Login'? ['is_activate']:[]" @click="switchLogin">登&nbsp;录</span>
        <span :class="component.name==='Register'? ['is_activate']:[]" @click="switchRegister">注&nbsp;册</span>
      </div>
      <transition enter-active-class="animated animate__animated animate__flipInY">
        <component :is="component.comp"></component>
      </transition>
    </div>
  </div>
</template>

<script setup>
import Login from "@/components/LoginRegister/Login.vue";
import Register from "@/components/LoginRegister/Register.vue";
import {onMounted, shallowReactive} from "vue";
import {useRouter} from "vue-router";

const router = useRouter();
// 默认显示登录组件
const component = shallowReactive({
  name: 'Login',
  comp: Login
})
// 其他页面调用，默认跳转
onMounted(() => {
  if (router.currentRoute.value.query.component) {
    component.name = router.currentRoute.value.query.component
    if (component.name === 'Login') {
      component.comp = Login
    } else {
      component.comp = Register
    }
  }
})
// 切换到注册组件
let switchRegister = () => {
  component.name = 'Register'
  component.comp = Register
}
// 切换到登录组件
let switchLogin = () => {
  component.name = 'Login'
  component.comp = Login
}
</script>
<style lang="scss" scoped>
@import "src/assets/style/index.scss";

.bgc {
  @include background_color('background_color4');
  height: 100vh;
  position: relative;
  overflow: hidden;
}

section {
  width: 100%;
  position: absolute;
  height: 9.867rem;
  background-image: url("/src/assets/images/login-bg.jpg");
  background-repeat: no-repeat;
  background-size: 100%;
  padding-bottom: 2.533rem;

  .wave {
    width: 100%;
    height: 2.667rem;
    position: absolute;
    bottom: 0;
    left: 0;
    @include background_img('background_img1');
    background-size: 26.667rem 2.667rem;
  }

  .wave.wave1 {
    animation: animate1 20s linear infinite;
    z-index: 4;
    opacity: 1;
    animation-delay: 0s;
    bottom: -30px;
  }

  .wave.wave2 {
    animation: animate2 15s linear infinite;
    z-index: 3;
    opacity: 0.5;
    animation-delay: -5s;
    bottom: -20px;
  }

  .wave.wave3 {
    animation: animate1 10s linear infinite;
    z-index: 2;
    opacity: 0.4;
    animation-delay: -7s;
    bottom: -10px;
  }

  .wave.wave4 {
    animation: animate2 5s linear infinite;
    z-index: 1;
    opacity: 0.2;
    animation-delay: -5s;
    bottom: 0;
  }
}

@keyframes animate1 {
  0% {
    background-position-x: 0;
  }
  100% {
    background-position-x: 26.667rem;
  }
}

@keyframes animate2 {
  0% {
    background-position-x: 0;
  }
  100% {
    background-position-x: -26.667rem;
  }
}

.content {
  position: absolute;
  z-index: 4;
  opacity: 0.95;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  height: 16.693rem;

  .title {
    color: white;
    width: 8rem;
    display: flex;
    justify-content: center;
    align-items: center;

    .is_activate {
      border-bottom: 0.08rem solid white;
      padding-bottom: 0.133rem;
      font-size: 0.667rem !important;
    }

    span {
      font-size: 0.533rem;
      margin: 0 0.533rem;
    }
  }
}

.animated {
  animation-duration: 1s !important;
}


</style>
