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
        <span @click="toTag"><img src="@/assets/images/tag.png" alt=""><p>标签</p></span>
        <span @click="toClassify"><img src="@/assets/images/timer-shaft.png" alt=""><p>归档</p></span>
        <span @click="toMessage"><img src="@/assets/images/message.png" alt=""><p>留言板</p></span>
        <span @click="toAbout"><img src="@/assets/images/about.png" alt=""><p>关于</p></span>
        <span @click="toLink"><img src="@/assets/images/link.png" alt=""><p>友链</p></span>
      </div>
    </div>
  </van-action-sheet>
</template>

<script setup>
import {Toast, ActionSheet, Slider} from 'vant';
import {ref} from "vue";
import {useRouter} from "vue-router";

const router = useRouter()
// 动作菜单默认状态
const show = ref(false)
// 动作菜单点击取消
const onCancel = () => {
  console.log('取消')
}
// 父组件点击动作菜单调用
const showAction = () => {
  show.value = true
}
// 跳转标签页
const toTag = () => {
  show.value = false
  router.push('/tag/1')
}
// 跳转归档页
const toClassify = () => {
  show.value = false
  router.push('/classify')
}
// 跳转留言板页
const toMessage = () => {
  show.value = false
  router.push('/message')
}
// 跳转关于页
const toAbout = () => {
  show.value = false
  router.push('/about')
}
// 跳转友情链接页
const toLink = () => {
  show.value = false
  router.push('/link')
}
defineExpose({
  showAction
})
</script>

<style lang="scss" scoped>
@import "/src/assets/style/index";

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
        @include font_color("font_color2");
      }
    }
  }
}
</style>
