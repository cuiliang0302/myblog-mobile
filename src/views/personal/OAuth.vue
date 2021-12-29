<template>
  <div class="oauth">
    <van-loading size="30px" vertical></van-loading>
    <p>正在调用{{ platform_name }}平台登录，请稍候……</p>
  </div>
</template>

<script setup>
import { Toast } from 'vant';
import {onMounted, reactive, ref} from "vue";
import {useRouter} from "vue-router";
import {postOAuthCallback} from "@/api/account";
import store from "@/store";
const router = useRouter()
// 平台名称
const platform_name = ref('')
// 回调登录表单
const OAuthForm = reactive({
  platform: '',
  kind: 'PC',
  code: '',
  redirect_uri: ''
})
// 向后端发送登录回调请求
const postCallback = () => {
  postOAuthCallback(OAuthForm).then((response) => {
    console.log(response)
    Toast.success('登录成功！');
    store.commit('setKeepLogin', false)
    store.commit('setUserSession', response)
    console.log(store.state.nextPath)
    router.push(store.state.nextPath)
  }).catch(response => {
    //发生错误时执行的代码
    console.log(response)
    Toast.fail('自动登录出现异常，请重试！');
    router.push('/loginRegister')
  });
}
onMounted(() => {
  OAuthForm.platform = router.currentRoute.value.params.platform
  OAuthForm.code = router.currentRoute.value.query.code
  OAuthForm.redirect_uri = window.location.protocol + "//" + window.location.host + router.currentRoute.value.path
  console.log(OAuthForm)
  switch (OAuthForm.platform) {
    case 'WEIBO':
      platform_name.value = '新浪微博'
      break;
    case 'QQ':
      platform_name.value = '腾讯QQ'
      break;
    default:
      platform_name.value = '第三方'
  }
  postCallback()
})
</script>

<style scoped lang="scss">
.oauth {
  margin-top: 40vh;
  text-align: center;

  p {
    font-size: 0.533rem;
  }
}
</style>
