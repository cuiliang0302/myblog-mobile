<!--文章详情页导航栏-->
<template>
  <van-nav-bar left-arrow @click-left="onClickLeft" @click-right="onClickRight" fixed placeholder>
    <template #title>
      <SearchInput></SearchInput>
    </template>
    <template #right>
      <van-icon name="setting-o"/>
    </template>
  </van-nav-bar>
  <ActionSheet ref="showAction"></ActionSheet>
</template>

<script>
import {NavBar, Toast, Icon} from 'vant';
import {useRoute, useRouter} from "vue-router";
import SearchInput from '@/components/common/SearchInput'
import ActionSheet from "@/components/deatil/ActionSheet";
import {ref} from "vue";

export default {
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    SearchInput,
    ActionSheet
  },
  name: "NavBar",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const showAction = ref();
    // 返回上一级
    const onClickLeft = () => {
      // console.log(router)
      // console.log(route)
      router.go(-1)
    }
    // 点击右侧更多按钮
    const onClickRight = () => {
      showAction.value.showAction();
    }
    return {
      showAction,
      onClickLeft,
      onClickRight,
    };
  },
}
</script>

<style lang="scss" scoped>
.van-nav-bar__right {
  img {
    width: 25px;
    height: 25px;
  }

}
</style>
