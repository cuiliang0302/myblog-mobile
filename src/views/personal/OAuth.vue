<template>
  <div class="oauth">
    <van-loading size="30px" vertical></van-loading>
    <p>正在调用{{ platform_name }}平台登录，请稍候……</p>
  </div>
</template>

<script setup>
import {showFailToast, showSuccessToast, Toast} from 'vant';
import {onMounted, reactive, ref} from "vue";
import {useRouter} from "vue-router";
import Account from "@/api/account";
import {useUserStore} from '@/store';
const user = useUserStore();
const router = useRouter()
// 平台名称
const platform_name = ref('')
// 回调登录表单
const OAuthForm = reactive({
  platform: '',
  kind: 'M',
  code: '',
  redirect_uri: ''
})
// 向后端发送登录回调请求
const postCallback = () => {
  Account.postOAuthCallback(OAuthForm).then((response) => {
    console.log(response)
    showSuccessToast('登录成功！');
    user.login(response.user_id, response.token, response.username)
    console.log(user.user_id)
    router.push("/personal/myIndex")
  }).catch(response => {
    //发生错误时执行的代码
    console.log(response)
    showFailToast('自动登录出现异常，请重试！');
    router.push('/loginRegister')
  });
}
onMounted(() => {
  OAuthForm.platform = router.currentRoute.value.params.platform
  OAuthForm.redirect_uri = window.location.protocol + "//" + window.location.host + router.currentRoute.value.path
  if (OAuthForm.platform==='PAY'){
    OAuthForm.code = router.currentRoute.value.query.auth_code
  }else {
    OAuthForm.code = router.currentRoute.value.query.code
  }
  console.log(OAuthForm)
  switch (OAuthForm.platform) {
    case 'WEIBO':
      platform_name.value = '新浪微博'
      break;
    case 'QQ':
      platform_name.value = '腾讯QQ'
      break;
    case 'PAY':
      platform_name.value = '支付宝'
      break;
    case 'GITHUB':
      platform_name.value = 'GitHub'
      break;
    case 'BAIDU':
      platform_name.value = '百度'
      break;
    case 'MICROSOFT':
      platform_name.value = '微软'
      break;
    default:
      platform_name.value = '第三方'
  }
  postCallback()
})
</script>

<style scoped lang="less">
.oauth {
  margin-top: 40vh;
  text-align: center;

  p {
    font-size: 0.533rem;
  }
}
</style>
