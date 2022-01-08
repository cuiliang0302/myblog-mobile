<template>
  <van-nav-bar fixed placeholder>
    <template #left="props">
      <img :src="logo" alt="">
    </template>
    <template #title="props">
      <SearchInput></SearchInput>
    </template>
    <template #right="props">
      <MyIcon class="icon" type="icon-menu" @click="fnShowAction"/>
    </template>
  </van-nav-bar>
  <ActionSheet ref="showAction"></ActionSheet>
</template>

<script setup>
import {NavBar, Icon, Search} from 'vant';
import {onMounted, ref} from "vue";
import ActionSheet from "@/components/common/ActionSheet.vue";
import SearchInput from "@/components/common/SearchInput.vue"
import {getSiteConfig} from "@/api/management";
import icon from '@/utils/icon'
let {MyIcon} = icon()
const key = ref('')
const active = ref(0);
const showAction = ref();
const fnShowAction = () => {
  showAction.value.showAction();
};
// 网站logo
const logo = ref()

// 获取网站logo
async function siteConfigData() {
  let siteConfig_data = await getSiteConfig()
  logo.value = siteConfig_data.logo
}

onMounted(() => {
  siteConfigData()
})
</script>

<style lang="scss" scoped>
@import "src/assets/style/index";

.van-nav-bar__left {
  img {
    width: 0.8rem;
    height: 0.8rem;
  }
}


.van-nav-bar__right {
  .icon {
    font-size: 0.933rem;
  }
}
</style>
