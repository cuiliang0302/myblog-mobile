<template>
  <van-nav-bar
      :title="title"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
      fixed
      placeholder
  >
    <template #right>
      <van-icon name="wap-home-o"/>
    </template>
  </van-nav-bar>
</template>

<script setup>
import {NavBar, Icon, Toast} from 'vant';
import {useRouter} from "vue-router";

const props = defineProps({
  // 导航栏标题
  title: {
    type: String,
    required: true,
    default: '个人中心'
  }
})
const router = useRouter();
const onClickLeft = () => {
  // console.log(router)
  // console.log(route)
  router.back()
};
const onClickRight = () => {
  router.push('/')
}
</script>

<style scoped>

</style>
