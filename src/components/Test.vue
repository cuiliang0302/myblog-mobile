<template>
  <h1>这是子组件，名字叫{{ name }}</h1>
  <p>父组件给子组件传的值是————>{{ msg }}——{{ status }}</p>
  <button type="button" @click="toFather">
    向父组件传值
  </button>
</template>

<script setup>
// 引入组件
import {ref} from "vue";
// 定义变量
const name = ref('李四')
// 组件属性参数(子组件接收父组件传值)
const props = defineProps({
  msg: String,
  // 参数校验与默认值
  status: {
    type: String,
    required: false,
    default: '未定义',
  },
})
// 定义事件(子组件向父组件传参)
const emit = defineEmit(['toFather']);
const toFather = () => {
  emit('toFather', '112233');
}
</script>

<style scoped>

</style>
