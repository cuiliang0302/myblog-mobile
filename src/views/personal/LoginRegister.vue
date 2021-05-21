<template>
  <div class="bgc">
    <section>
      <div class="wave wave1"></div>
      <div class="wave wave2"></div>
      <div class="wave wave3"></div>
      <div class="wave wave4"></div>
    </section>
    <div class="content">
      <div class="title">
        <span :class="componentName==='Login'? ['is_activate']:[]" @click="switchLogin">登&nbsp;录</span>
        <span :class="componentName==='Register'? ['is_activate']:[]" @click="switchRegister">注&nbsp;册</span>
      </div>
      <transition enter-active-class="animate__animated animate__flipInY">
        <keep-alive>
          <component :is="componentName"></component>
        </keep-alive>
      </transition>
    </div>
  </div>
</template>

<script>
import Login from "@/components/LoginRegister/Login";
import Register from "@/components/LoginRegister/Register";
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";

export default {
  components: {
    Login,
    Register
  },
  name: "LoginRegister",
  setup() {
    const router = useRouter();
    // 默认显示登录组件
    const componentName = ref('Login')
    // 其他页面调用，默认跳转
    onMounted(() => {
      if (router.currentRoute.value.query.component) {
        componentName.value = router.currentRoute.value.query.component
      }
    })
    // 切换到注册组件
    let switchRegister = () => {
      componentName.value = 'Register'
    }
    // 切换到登录组件
    let switchLogin = () => {
      componentName.value = 'Login'
    }
    return {
      componentName,
      switchRegister,
      switchLogin
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/style/variable";

.bgc {
  background-color: white;
  height: 100vh;
  position: relative;
}

section {
  width: 100%;
  position: absolute;
  height: 9.867rem;
  background-image: url("../../assets/images/login-bg.jpg");
  background-repeat: no-repeat;
  background-size: 100%;
  padding-bottom: 2.533rem;

  .wave {
    width: 100%;
    height: 2.667rem;
    position: absolute;
    bottom: 0;
    left: 0;
    background: url("../../assets/images/wave.png");
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
  width: 85%;
  left: 50%;
  transform: translateX(-50%);
  top: 10%;
  z-index: 4;
  opacity: 0.95;

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
</style>
