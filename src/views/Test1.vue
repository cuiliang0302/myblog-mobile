<!--内容详情页-->
<template>
  <div>
    <van-popup v-model:show="show">
      <van-button @click="loginOrder">登录</van-button>
    </van-popup>
  </div>
</template>
<script setup>
import {ref} from "vue";
import store from "@/store";

const show = ref(false);
const emit = defineEmits(['showPopup', 'loginOrder'])
const showPopup = () => {
  show.value = true;
};
const loginOrder = () => {
  store.commit('setTestIsLogin', true)
  show.value = false
  emit('loginOrder');
}
defineExpose({
  showPopup
})
</script>
