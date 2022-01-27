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
  <DetailActionSheet ref="showAction"></DetailActionSheet>
</template>

<script setup>
import {NavBar, Toast, Icon} from 'vant';
import {useRouter} from "vue-router";
import SearchInput from '@/components/common/SearchInput.vue'
import DetailActionSheet from "@/components/detail/DetailActionSheet.vue";
import {ref} from "vue";


const props = defineProps({
  // 当前显示的组件
  componentName: {
    type: String,
    required: true,
    default: 'article'
  },
})
const router = useRouter();
const showAction = ref();
// 返回上一级
const onClickLeft = () => {
  if (props.componentName === 'note') {
    router.push('/note')
  } else {
    router.push('/category/1')
  }
}
// 点击右侧更多按钮
const onClickRight = () => {
  showAction.value.showAction();
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
