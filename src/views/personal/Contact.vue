<!--联系博主-->
<template>
  <div>
    <PersonalNavBar :title="'联系博主'"></PersonalNavBar>
    <van-grid :column-num="2" :gutter="20" clickable>
      <van-grid-item @click="copy('QQ号',contact.qq)">
        <van-image width="1.067rem" height="1.067rem" :src="QQImg"/>
        <p>QQ</p>
      </van-grid-item>
      <van-grid-item @click="copy('微信号',contact.wechat)">
        <MyIcon class="icon" type="icon-weixin"/>
        <p>微信</p>
      </van-grid-item>
      <van-grid-item @click="copy('微信公众号',contact.vx_public)">
        <MyIcon class="icon" type="icon-vx-public"/>
        <p>微信公众号</p>
      </van-grid-item>
      <van-grid-item @click="copy('邮箱号',contact.email)">
        <MyIcon class="icon" type="icon-email1"/>
        <p>邮箱</p>
      </van-grid-item>
      <van-grid-item @click="toURL(contact.github)">
        <MyIcon class="icon" type="icon-github-blue"/>
        <p>GitHub</p>
      </van-grid-item>
      <van-grid-item @click="toURL(contact.gitee)">
        <MyIcon class="icon" type="icon-gitee"/>
        <p>码云</p>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script setup>
import PersonalNavBar from "@/components/personal/PersonalNavBar.vue";
import useClipboard from 'vue-clipboard3'
import {Grid, GridItem, Image as VanImage, Toast} from 'vant'
import {getInfo} from "@/api/management";
import {onMounted} from "vue";
import QQImg from "@/assets/images/qq-round.png";
import icon from '@/utils/icon'

let {MyIcon} = icon()
const {toClipboard} = useClipboard()
const contact = {
  qq: '',
  wechat: '',
  vx_public: '',
  github: '',
  gitee: '',
  email: ''
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

// 获取博主信息数据
async function infoData() {
  let info_data = await getInfo()
  console.log(info_data)
  contact.qq = info_data.qq
  contact.wechat = info_data.wechat
  contact.github = info_data.github
  contact.gitee = info_data.gitee
  contact.email = info_data.email
  contact.vx_public = info_data.vx_public
}

onMounted(() => {
  infoData()
})
</script>

<style lang="scss">
body {
  background-color: #fff;
}

.van-grid {
  margin-top: 0.533rem;

  .icon {
    width: 1.067rem;
    height: 1.067rem;
    font-size: 0.933rem;
  }
}
</style>
