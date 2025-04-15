<template>
  <!-- 开启顶部安全区适配 -->
  <!--  <van-nav-bar safe-area-inset-top/>-->
  <van-config-provider :theme="theme.darkValue">
    <router-view v-slot="{ Component }">
      <transition
          :enter-active-class="enterClass"
          :leave-active-class="leaveClass"
          mode="out-in"
      >
        <component :is="Component"/>
      </transition>
    </router-view>
    <!--    <RouterView/>-->
  </van-config-provider>
  <!-- 开启底部安全区适配 -->
  <!--  <van-number-keyboard safe-area-inset-bottom/>-->
</template>
<script setup>
import {onMounted, watch, ref} from 'vue'
import {RouterView, useRoute, useRouter} from 'vue-router';
import {useThemeStore, useUserStore} from '@/store';
// Toast
import "vant/es/toast/style";
// Dialog
import "vant/es/dialog/style";
// Notify
import "vant/es/notify/style";
// ImagePreview
import "vant/es/image-preview/style";
import {useWindowSize} from "@vueuse/core";
import {showDialog} from "vant";

const route = useRoute()
const router = useRouter()
const {width} = useWindowSize();
const theme = useThemeStore();
const user = useUserStore();
// 动画类
const enterClass = ref('animate__animated animate__fadeInRight')
const leaveClass = ref('animate__animated animate__fadeOutLeft')
// 检测是否跳转PC端
const checkView = () => {
  if (width.value > 1200) {
    showDialog({
      message: '检测到您使用PC设备访问，点击确定后跳转至PC版网站',
    }).then(() => {
      location.href = "https://www.cuiliangblog.cn"
    });
  }
}
// 动态加载动画
watch(
    () => route.meta,
    (to, from) => {
      console.log(to);
      console.log(from);
      if (to.transitionIndex > from.transitionIndex) {
        console.log("前进")
        enterClass.value = 'animate__animated animate__fadeInRight'
        leaveClass.value = 'animate__animated animate__fadeOutLeft'
      } else if (to.transitionIndex < from.transitionIndex) {
        console.log("后退")
        enterClass.value = 'animate__animated animate__fadeInLeft'
        leaveClass.value = 'animate__animated animate__fadeOutRight'
      } else {
        console.log('平级切换')
        if (to.transitionClass === 'gradually') {
          console.log('渐入')
          enterClass.value = 'animate__animated animate__fadeIn'
          leaveClass.value = 'animate__animated animate__fadeOut'
        }
        if (to.transitionClass === 'jump') {
          console.log('跳跃')
          enterClass.value = 'animate__animated animate__rollIn'
          leaveClass.value = 'animate__animated animate__rollOut'
        }
      }
    }
)

onMounted(() => {
  checkView()
  theme.initialize()
  user.initialize()
  // 设置加载动画
  try {
    document.body.removeChild(document.getElementById('Loading'))
    setTimeout(function () {
      document.getElementById('app').style.display = 'block';
    }, 500)
  } catch (e) {
    console.log(e)
  }
})

</script>
<style scoped lang="less">
.van-theme-light {
  --van-white: white;
}

.van-theme-dark {
  --van-white: black;
}
//.van-config-provider {
//  /* 确保高度不会塌陷，避免白屏 */
//  min-height: 100vh;
//  position: relative;
//  overflow: hidden;
//}
</style>
