<template>
  <div>
    <HelloWorld ref="helloRef"></HelloWorld>
    <h1>这是首页</h1>
  </div>
</template>

<script setup>
import HelloWorld from '@/components/HelloWorld.vue'
import {computed, onMounted, ref} from "vue";

const helloRef = ref(null)
onMounted(() => {
  console.log("执行onMounted函数")
  console.log(helloRef.value.count)
});
</script>

<style scoped lang="scss">

h1 {
  color: $color-primary;
}
</style>
