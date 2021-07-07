<template>
  <van-nav-bar fixed placeholder>
    <template #left="props">
      <img :src="logo" alt="">
    </template>
    <template #title="props">
      <SearchInput></SearchInput>
    </template>
    <template #right="props">
      <svg class="icon" aria-hidden="true" @click="fnShowAction">
        <use xlink:href="#icon-menu"></use>
      </svg>
    </template>
  </van-nav-bar>
  <ActionSheet ref="showAction"></ActionSheet>
</template>

<script>
import {NavBar, Icon, Search} from 'vant';
import {onMounted, ref} from "vue";
import ActionSheet from "@/components/common/ActionSheet";
import SearchInput from "@/components/common/SearchInput"
import {getSiteConfig} from "@/api/management";
export default {
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: NavBar,
    [Search.name]: Search,
    ActionSheet,
    SearchInput
  },
  name: "NavBar",
  setup() {
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
    onMounted(()=>{
      siteConfigData()
    })
    return {
      key,
      active,
      showAction,
      fnShowAction,
      logo
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/assets/style/variable";

.van-nav-bar__left {
  img {
    width: 0.8rem;
    height: 0.8rem;
  }
}


.van-nav-bar__right {
  .icon {
    width: 0.933rem;
    height: 0.933rem;
  }
}
</style>
