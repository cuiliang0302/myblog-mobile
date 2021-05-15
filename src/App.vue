<template>
  <div id="app">
    <router-view class="router-view" v-slot="{ Component }">
      <transition :enter-active-class="enterClass"
                  :leave-active-class="leaveClass"
                  :duration="{ enter: 800, leave: 500 }">
        <!--          &lt;!&ndash;        需要缓存的视图&ndash;&gt;-->
        <!--          <keep-alive v-if="$route.meta.keepAlive" :key="1">-->
        <!--            <component :is="Component"/>-->
        <!--          </keep-alive>-->
        <!--        不需要缓存的视图-->
        <component :is="Component"/>
      </transition>
    </router-view>
  </div>
  <!--  <router-view></router-view>-->
</template>

<script>
import {onMounted, ref, watch} from "vue";
import {useRoute} from "vue-router";
import animate from "animate.css";

export default {
  name: "App",
  setup() {
    let enterClass = ref('');
    let leaveClass = ref('');
    const route = useRoute();
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
        () => route.meta.transitionClass,
        (transitionClass) => {
          // 平滑切换
          if (transitionClass === 'back') {
            enterClass.value = 'animate__animated animate__fadeInRight'
            leaveClass.value = 'animate__animated animate__fadeOutLeft'
          }
          // 跳转
          else if (transitionClass === 'jump') {
            enterClass.value = 'animate__animated animate__rollIn'
            leaveClass.value = 'animate__animated animate__rollOut'
          }
          // 渐入
          else if (transitionClass === 'gradually') {
            enterClass.value = 'animate__animated animate__fadeIn'
            leaveClass.value = 'animate__animated animate__fadeOut'
          }
          // 快速切换
          else if (transitionClass === 'fast') {
            enterClass.value = 'animate__animated animate__slideInRight'
            leaveClass.value = 'animate__animated animate__slideOutLeft'
          } else {
            enterClass.value = ''
            leaveClass.value = ''
          }
        }
    );
    return {enterClass, leaveClass};
  },
};
</script>

<style>
.router-view {
  width: 100%;
  height: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: 0 auto;
  -webkit-overflow-scrolling: touch;
}
</style>
