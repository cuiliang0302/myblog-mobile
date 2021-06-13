<template>
  <van-action-sheet close-on-popstate
                    v-model:show="show"
                    cancel-text="取消"
                    close-on-click-action
                    safe-area-inset-bottom
                    @cancel="onCancel"
                    overlay-class="my-overlay"
  >
    <div class="content">
      <div class="menu">
        <span @click="toTag"><img src="@/assets/icon/tag.png" alt=""><p>标签</p></span>
        <span @click="toClassify"><img src="@/assets/icon/timer-shaft.png" alt=""><p>归档</p></span>
        <span @click="toMessage"><img src="@/assets/icon/message.png" alt=""><p>留言板</p></span>
        <span @click="toAbout"><img src="@/assets/icon/about.png" alt=""><p>关于</p></span>
        <span @click="toLink"><img src="@/assets/icon/link.png" alt=""><p>友链</p></span>
      </div>
    </div>
  </van-action-sheet>
</template>

<script>
import {Toast, ActionSheet, Slider} from 'vant';
import {ref} from "vue";
import {onBeforeRouteLeave, useRouter} from "vue-router";

export default {
  components: {
    [ActionSheet.name]: ActionSheet,
    [Slider.name]: Slider,
    [Toast.name]: Toast
  },
  name: "ActionSheet",
  setup() {
    const router = useRouter()
    // 动作菜单默认状态
    const show = ref(false)
    // // 离开前检查弹窗
    // const leaveCheck = ref(false)
    // 动作菜单点击取消
    const onCancel = () =>{
      console.log('取消')
    }
    // 父组件点击动作菜单调用
    const showAction = () => {
      show.value = true
      // leaveCheck.value = true
    }
    // 退出前检查弹窗是否关闭
    // onBeforeRouteLeave((to, from, next) => {
    //   if (leaveCheck.value) {
    //     console.log('更多菜单离开检查')
    //     if (show.value) {
    //       show.value = false
    //       leaveCheck.value = false
    //       next(false)
    //     }
    //   } else {
    //     next(true)
    //   }
    // })
    // 跳转标签页
    const toTag = () => {
      // leaveCheck.value = false
      show.value = false
      router.push('/tag')
    }
    // 跳转归档页
    const toClassify = () => {
      // leaveCheck.value = false
      show.value = false
      router.push('/classify')
    }
    // 跳转留言板页
    const toMessage = () => {
      // leaveCheck.value = false
      show.value = false
      router.push('/message')
    }
    // 跳转关于页
    const toAbout = () => {
      // leaveCheck.value = false
      show.value = false
      router.push('/about')
    }
    // 跳转友情链接页
    const toLink = () => {
      // leaveCheck.value = false
      show.value = false
      router.push('/link')
    }
    return {show, showAction, onCancel, toTag, toClassify, toMessage, toAbout, toLink};
  },
}
</script>

<style lang="scss" scoped>
@import "src/assets/style/variable";

.content {
  padding: 0.533rem;

  .menu {
    display: flex;
    justify-content: center;
    align-items: center;

    span {
      flex: 1;
      text-align: center;

      img {
        width: 0.933rem;
        height: 0.933rem;
      }

      p {
        font-size: 0.373rem;
        color: $color-text-regular;
      }
    }
  }
}
</style>
