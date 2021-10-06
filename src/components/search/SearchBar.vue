<!--搜索页顶部搜索栏-->
<template>
  <van-nav-bar title="标题" left-arrow @click-left="toBack">
    <template #title>
      <SearchInput @keyChange="keyChange" :focus="focus"></SearchInput>
    </template>
    <template #right>
      <div @click="onSearch">搜索</div>
    </template>
  </van-nav-bar>
</template>

<script setup>
import {Search, Toast, Icon, NavBar} from 'vant';
import {ref} from "vue";
import {useRouter} from "vue-router";
import SearchInput from "@/components/common/SearchInput.vue";

const emit = defineEmits(['onSearch'])
// 搜索输入框输入内容
const keyWords = ref('')
// 搜索栏输入内容改变
const keyChange = (key) => {
  keyWords.value = key
}
// 搜索栏是否自动聚焦
const focus = ref(true)
// 搜索输入内容点击按钮
const onSearch = () => {
  if (keyWords.value) {
    emit('onSearch', keyWords.value)
  } else {
    Toast('请先输入搜索内容');
  }
}
const router = useRouter()
// 返回上一级
const toBack = () => {
  router.go(-1)
}
</script>

<style lang="scss" scoped>
</style>
