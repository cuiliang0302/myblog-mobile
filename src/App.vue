<template>
  <div id="app">
    <van-config-provider :theme-vars="themeVars">
      <router-view class="router-view" v-slot="{ Component }">
        <transition :enter-active-class="enterClass"
                    :leave-active-class="leaveClass">
          <!--        &lt;!&ndash;需要缓存的视图&ndash;&gt;-->
          <!--        <keep-alive v-if="$route.meta.keepAlive" :key="1">-->
          <!--          <component :is="Component"/>-->
          <!--        </keep-alive>-->
          <!--        &lt;!&ndash;不需要缓存的视图&ndash;&gt;-->
          <!--        <component v-else :is="Component" :key="2"/>-->
          <component :is="Component"/>
        </transition>
      </router-view>
    </van-config-provider>
  </div>
  <!--  <router-view></router-view>-->
</template>

<script>
import {onMounted, ref, watch} from "vue";
import {useRoute} from "vue-router";
import animate from "animate.css";
import {ConfigProvider} from "vant";
import dark from "@/utils/dark";

export default {
  name: "App",
  components: {
    [ConfigProvider.name]: ConfigProvider
  },
  setup() {
    let enterClass = ref('');
    let leaveClass = ref('');
    const route = useRoute();
    let {themeVars, setDark} = dark()
    // 首屏加载动画
    onMounted(() => {
      try {
        document.body.removeChild(document.getElementById('Loading'))
        setTimeout(function () {
          document.getElementById('app').style.display = 'block';
        }, 500)
      } catch (e) {
        console.log(e)
      }
    })
    // 监控路由的变化
    watch(
        () => route.meta,
        (newRoute, oldRoute) => {
          // console.log(newRoute, oldRoute)
          if (newRoute.index > oldRoute.index) {
            // console.log("前进")
            enterClass.value = 'animate__animated animate__fadeInRight'
            leaveClass.value = 'animate__animated animate__fadeOutLeft'
          } else if (newRoute.index < oldRoute.index) {
            // console.log("后退")
            enterClass.value = 'animate__animated animate__fadeInLeft'
            leaveClass.value = 'animate__animated animate__fadeOutRight'
          } else {
            // console.log('平级切换')
            if (newRoute.transitionClass === 'gradually') {
              // console.log('渐入')
              enterClass.value = 'animate__animated animate__fadeIn'
              leaveClass.value = 'animate__animated animate__fadeOut'
            }
            if (newRoute.transitionClass === 'jump') {
              // console.log('跳跃')
              enterClass.value = 'animate__animated animate__rollIn'
              leaveClass.value = 'animate__animated animate__rollOut'
            }
          }
        }
    );
    return {enterClass, leaveClass, themeVars};
  },
};
</script>

<style lang="scss">
@import "~@/assets/style/index.scss";

.router-view {
  //在此使用了背景颜色变量
  @include background_color("background-color");
  //再次使用了文字颜色变量
  @include text_color("text-color");
  transition: background 1s, color 0.6s;
  width: 100%;
  height: max-content;
  min-height: 100vh;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: 0 auto;
  -webkit-overflow-scrolling: touch;
  animation-timing-function: linear;

}

:root {
  transition: background 1s, color 3s;
}

.icon {
  width: 0.48rem;
  height: 0.48rem;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.animate__animated {
  animation-duration: 0.4s;
}

.animate__fadeInRight, .animate__fadeOutLef, .animate__fadeInLeft, .animate__fadeOutRight {
  animation-duration: 0.3s;
}
</style>
