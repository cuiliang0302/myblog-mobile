<template>
  <div>
    <h1>这是测试页</h1>
    <van-button v-if="is_order===false" type="primary" @click="order(1)">抢先预约</van-button>
    <van-button v-else type="success">已预约</van-button>
    <van-button type="default" @click="order(2)">跳转页面</van-button>
    <Test1 ref="popup" @loginOrder="loginOrder"></Test1>
  </div>
</template>

<script setup>
import Test1 from "@/views/Test1.vue"
// 用户是否已登录
import {computed, ref} from "vue";
import store from "@/store";

const is_login = computed(() => store.state.testIsLogin)
// 用户是否已预约
const is_order = ref(false)
// 弹窗子组件对象
const popup = ref(null)
// 当前执行拿个事件（预约还是跳转）
const event = ref('')
// 用户预约事件
const order = (value) => {
  console.log("是否已登录",is_login.value)
  // 判断是否已经登录
  event.value = value
  if (is_login.value === false) {
    popup.value.showPopup()
  }else {
    loginOrder()
  }
}
// 父组件收到弹窗登录确定预约事件
const loginOrder = () => {
  console.log("父组件收到了")
  console.log(event.value)
  if (event.value === 1) {
    is_order.value = true
  } else {
    // router.push('/')
    console.log("跳转页面了")
  }
}
</script>

<style lang="scss">

</style>
