<template>
  <div>
    <h1>这是dark页</h1>
    <a @click="setDark">模式切换</a>
    <br>
    <router-link to="/">去首页</router-link>
    <van-grid>
      <van-grid-item icon="photo-o" text="文字"/>
      <van-grid-item icon="photo-o" text="文字"/>
      <van-grid-item icon="photo-o" text="文字"/>
      <van-grid-item icon="photo-o" text="文字"/>
    </van-grid>
  </div>
</template>

<script>
import {Grid, GridItem, ConfigProvider} from 'vant';
import dark from "@/utils/dark";

export default {
  name: "DarkModelPage",
  components: {
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    [ConfigProvider.name]: ConfigProvider
  },
  setup() {
    let {themeVars, setDark} = dark()
    return {
      setDark, themeVars
    }
  }
}
</script>

<style lang="scss">
@import "~@/assets/style/index.scss";

:root {
  --van-grid-item-content-background-color: red;
  //@include grid_color("background_color4");
}
</style>