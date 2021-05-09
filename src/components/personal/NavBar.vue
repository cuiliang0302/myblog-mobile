<template>
  <van-nav-bar
      :title="title"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
      fixed
      placeholder
  >
    <template #right>
      <van-icon name="wap-home-o"/>
    </template>
  </van-nav-bar>
</template>

<script>
import {NavBar, Icon, Toast} from 'vant';
import {useRoute, useRouter} from "vue-router";

export default {
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon
  },
  name: "NavBar",
  props: {
    title: {
      type: String,
      default() {
        return '个人中心';
      }
    }
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const onClickLeft = () => {
      // console.log(router)
      // console.log(route)
      router.go(-1)
    };
    const onClickRight = () => {
      router.push('/')
    }
    return {
      onClickLeft,
      onClickRight,
    };
  },
}
</script>

<style scoped>

</style>
