<template>
  <van-nav-bar fixed placeholder>
    <template #left="props">
      <img src="@/assets/images/logo.png" alt="">
    </template>
    <template #title="props">
      <SearchInput></SearchInput>
    </template>
    <template #right="props">
      <van-icon name="wap-nav" />
      <img src="@/assets/icon/more.png" alt="" @click="fnShowAction">
    </template>
  </van-nav-bar>
  <ActionSheet ref="showAction"></ActionSheet>
</template>

<script>
import {NavBar, Icon, Search} from 'vant';
import {ref} from "vue";
import ActionSheet from "@/components/common/ActionSheet";
import SearchInput from "@/components/common/SearchInput"
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
    return {
      key,
      active,
      showAction,
      fnShowAction
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
  img {
    width: 0.667rem;
    height: 0.667rem;
  }
}
</style>
