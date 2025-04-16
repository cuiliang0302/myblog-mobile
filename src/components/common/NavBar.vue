<template>
  <van-nav-bar fixed placeholder>
    <template #left>
     <img :src="logo" alt="">
    </template>
    <template #title>
      <SearchInput></SearchInput>
    </template>
    <template #right>
      <MyIcon class="icon" type="icon-menu" @click="fnShowAction"/>
    </template>
  </van-nav-bar>
  <ActionSheet ref="showAction"></ActionSheet>
</template>

<script setup>
import {onMounted, ref} from "vue";
import ActionSheet from "@/components/common/ActionSheet.vue";
import SearchInput from "@/components/common/SearchInput.vue"
import Management from "@/api/management";
import icon from '@/utils/icon'
import {showFailToast} from "vant";
const {MyIcon} = icon()
const showAction = ref();
const fnShowAction = () => {
  showAction.value.showAction();
};
// 网站logo
const logo = ref('')
// 获取网站数据
const siteConfigData = async () => {
  try {
    const response = await Management.getSiteConfig();
    console.log(response);
    logo.value = response.logo;
  } catch (error) {
    showFailToast("获取网站数据失败！");
  }
}
onMounted(() => {
  siteConfigData()
})
</script>

<style lang="less" scoped>
:deep(.van-nav-bar__left){
  img{
    width: 35px;
    height: 35px;
  }
}
:deep(.van-nav-bar__title) {
  max-width: 80%;
}
:deep(.van-nav-bar__right) {
    .icon {
      font-size: 40px;
    }
}
</style>
