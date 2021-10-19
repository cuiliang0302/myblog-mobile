<!--联系博主-->
<template>
  <div>
    <PersonalNavBar :title="'联系博主'"></PersonalNavBar>
    <van-grid :column-num="2" :gutter="20" clickable>
      <van-grid-item @click="copy('QQ',contact.qq)">
        <van-image
            width="1.067rem"
            height="1.067rem"
            :src="QQImg"
        />
        <p>QQ</p>
      </van-grid-item>
      <van-grid-item @click="copy('微信',contact.wechat)">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#img-weixin"></use>
        </svg>
        <p>微信</p>
      </van-grid-item>
      <van-grid-item @click="toURL(contact.github)">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#img-github-blue"></use>
        </svg>
        <p>GitHub</p>
      </van-grid-item>
      <van-grid-item @click="toURL(contact.gitee)">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#img-gitee"></use>
        </svg>
        <p>码云</p>
      </van-grid-item>
    </van-grid>
    <van-grid :column-num="1" :gutter="20" clickable>
      <van-grid-item @click="copy('Email',contact.email)">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#img-email"></use>
        </svg>
        <p>E-Mail</p>
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

const {toClipboard} = useClipboard()
const contact = {
  qq: '',
  wechat: '',
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
  }
}
</style>
