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
import {computed, onMounted, ref, watch} from "vue";
import {useRoute} from "vue-router";
import animate from "animate.css";
import {ConfigProvider, Dialog} from "vant";
import dark from "@/utils/dark";
import store from "@/store/index";

export default {
  name: "App",
  components: {
    [ConfigProvider.name]: ConfigProvider,
    Dialog
  },
  setup() {
    let enterClass = ref('');
    let leaveClass = ref('');
    const route = useRoute();
    let {setDark} = dark()
    // 暗黑模式切换主题变量
    const themeVars = computed(() => store.state.themeStyle)
    // 首屏加载动画
    onMounted(() => {
      const is_dark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setDark(is_dark)
      if (document.body.clientWidth > 1200) {
        Dialog.alert({
          message: '检测到您使用PC设备访问，点击确定后跳转至PC版网站',
        }).then(() => {
          location.href = "https://www.cuiliangblog.cn"
        });
      }
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
@import "src/assets/style/index.scss";

.router-view {
  @include font_color("font_color1");
  @include background_color("background_color1");
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

.animate__animated {
  animation-duration: 0.4s;
}

.animate__fadeInRight, .animate__fadeOutLef, .animate__fadeInLeft, .animate__fadeOutRight {
  animation-duration: 0.3s;
}
.icon{
  font-size: 0.4rem;
}
</style>
