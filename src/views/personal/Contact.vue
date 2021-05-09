<!--联系博主-->
<template>
  <div>
    <NavBar :title="title"></NavBar>
    <van-grid :column-num="2" :gutter="20" clickable>
      <van-grid-item @click="toURL(contact.github)">
        <van-image :src="require('@/assets/icon/github.png')" width="0.8rem"/>
        <p>GitHub</p>
      </van-grid-item>
      <van-grid-item @click="toURL(contact.gitee)">
        <van-image :src="require('@/assets/icon/gitee.png')" width="0.8rem"/>
        <p>码云</p>
      </van-grid-item>
      <van-grid-item @click="copy('微信',contact.wechat)">
        <van-image :src="require('@/assets/icon/wechat.png')" width="0.8rem"/>
        <p>微信</p>
      </van-grid-item>
      <van-grid-item @click="copy('Email',contact.email)">
        <van-image :src="require('@/assets/icon/Email-marketing.png')" width="0.8rem"/>
        <p>E-Mail</p>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import NavBar from "@/components/personal/NavBar";
import useClipboard from 'vue-clipboard3'
import {Grid, GridItem, Image as VanImage, Toast} from 'vant'
import {useRouter} from "vue-router";

export default {
  components: {
    NavBar,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    [VanImage.name]: VanImage
  },
  name: "Contact",
  setup() {
    const {toClipboard} = useClipboard()
    const router = useRouter()
    const title = '联系博主'
    const contact = {
      github: 'https://github.com/cuiliang0302',
      gitee: 'https://gitee.com/cuiliang0302',
      wechat: 'cuiliang0302',
      email: 'cuiliang0302@qq.com'
    }
    // 地址复制至剪切板
    const copy = async (type, value) => {
      try {
        await toClipboard(value)
        Toast.success(type + '已复制至剪切板')
      } catch (e) {
        Toast.fail('剪切板调用异常！')
        console.error(e)
      }
    }
    // 跳转至第三方网站
    const toURL = (url) => {
      window.location.href = url
      Toast.loading({
        message: '第三方网站跳转中...',
        forbidClick: true,
      });
    }
    return {
      title,
      contact,
      toURL,
      copy
    }
  }
}
</script>

<style lang="scss">
body {
  background-color: #fff;
}

.van-grid {
  margin-top: 0.533rem;
}
</style>
