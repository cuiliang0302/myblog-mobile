<template>
  <div class="main">
    <div class="form">
      <van-form @submit="onSubmit">
        <van-field
            v-model="loginForm.username"
            name="username"
            placeholder="用户名/邮箱号"
            label-width="20"
            validate-first
            clearable
            :rules="[{ required: true, message: '请填写用户名/邮箱号' }]"
        >
          <template #label>
            <MyIcon class="icon" type="icon-username"/>
          </template>
        </van-field>
        <van-field
            v-model="loginForm.password"
            type="password"
            name="password"
            label-width="20"
            validate-first
            placeholder="密码"
            clearable
            :rules="[{ required: true, message: '请填写密码' }]"
        >
          <template #label>
            <MyIcon class="icon" type="icon-password"/>
          </template>
        </van-field>
        <van-field
            label-width="20"
        >
          <template #label>
            <MyIcon class="icon" type="icon-code"/>
          </template>
          <template #input>
            <VerifyImgBtn :isPassing="isPassing" :btnType="btnType" @pass="pass" class="verify-btn"></VerifyImgBtn>
          </template>
        </van-field>
        <div class="other">
          <div class="remember">
            <van-checkbox v-model="keep_login" shape="square">保持登录</van-checkbox>
          </div>
          <div class="forget" @click="router.push('/setPassword')">
            忘记密码
          </div>
        </div>
        <div style="margin: 0.427rem;">
          <van-button round block type="primary" native-type="submit">
            登&nbsp;录
          </van-button>
        </div>
      </van-form>
    </div>
    <div class="other">
      <van-divider>第三方账号登录</van-divider>
      <div class="other-logo">
        <span @click="otherLogin('QQ')">
          <MyIcon class="logo-icon" type="icon-qq-logo"/>
          <p>QQ</p>
        </span>
        <span @click="otherLogin('PAY')">
          <MyIcon class="logo-icon" type="icon-alipay-logo"/>
          <p>支付宝</p>
        </span>
        <span @click="otherLogin('BAIDU')">
          <MyIcon class="logo-icon" type="icon-baidu-logo"/>
          <p>百度</p>
        </span>
        <span @click="otherLogin('WEIBO')">
          <MyIcon class="logo-icon" type="icon-weibo-logo"/>
          <p>微博</p>
        </span>
        <span @click="otherLogin('GITHUB')">
          <MyIcon class="logo-icon" type="icon-github-logo"/>
          <p>GitHub</p>
        </span>
        <span @click="otherLogin('MICROSOFT')">
          <MyIcon class="logo-icon" type="icon-microsoft-logo"/>
          <p>微软</p>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import {Button, showSuccessToast, showFailToast, showToast} from 'vant';
import VerifyImgBtn from "@/components/verify/VerifyImgBtn.vue";
import {reactive, ref} from "vue";
import {storeToRefs} from 'pinia'
import {useCommonStore, useUserStore} from '@/store';

import {useRouter} from "vue-router";
import icon from '@/utils/icon'
import account from "@/api/account";

const common = useCommonStore();
const user = useUserStore();
const {MyIcon} = icon()
const router = useRouter()
// 保持登录复选框
const {keep_login} = storeToRefs(user)
// 用户登录表单
const loginForm = reactive({
  username: '',
  password: '',
});
// 验证码通过验证状态
const isPassing = ref(false)
// 验证码按钮样式
const btnType = ref('default')
// 验证码通过验证
const pass = () => {
  isPassing.value = true
}
// 表单登录按钮
const onSubmit = () => {
  if (!isPassing.value) {
    console.log("滑动了吗")
    btnType.value = 'danger'
    return
  }
  account.postLogin(loginForm).then((response) => {
    console.log(response)
    showSuccessToast('登录成功！');
    user.login(response.user_id, response.token, response.username)
    console.log(common.next_path)
    router.push(common.next_path)
  }).catch(response => {
    //发生错误时执行的代码
    console.log(response)
    showFailToast('账号或密码错误！');
    loginForm.username = ''
    loginForm.password = ''
    isPassing.value = false
  });
};
// 第三方登录
const otherLogin = (kind) => {
  showToast('正在跳转至第三方平台，请稍候……')
  console.log(kind)
  let domain = window.location.protocol + "//" + window.location.host
  if (kind === 'WEIBO') {
    account.getOAuthID(kind).then((response) => {
      console.log(response)
      let url = 'https://open.weibo.cn/oauth2/authorize?client_id=' + response.clientId +
          '&response_type=code&redirect_uri=' + domain + '/OAuth/' + kind + '&display=mobile'
      console.log(url)
      window.location.href = url;
    }).catch(response => {
      //发生错误时执行的代码
      console.log(response)
      showFailToast('获取第三方登录ID失败！')
    });
  }
  if (kind === 'QQ') {
    account.getOAuthID(kind).then((response) => {
      console.log(response)
      let url = 'https://graph.qq.com/oauth2.0/authorize?client_id=' + response.clientId +
          '&response_type=code&redirect_uri=' + domain + '/OAuth/' + kind + '&display=mobile'
          + '&state=' + Math.random().toString(36).slice(-6)
      console.log(url)
      window.location.href = url;
    }).catch(response => {
      //发生错误时执行的代码
      console.log(response)
      showFailToast('获取第三方登录ID失败！')
    });
  }
  if (kind === 'PAY') {
    account.getOAuthID(kind).then((response) => {
      console.log(response)
      let parameter = 'https://openauth.alipay.com/oauth2/publicAppAuthorize.htm?app_id=' +
          response.clientId + '&scope=auth_user&redirect_uri=' + domain + '/OAuth/' + kind + '&state=' + Math.random().toString(36).slice(-6)
      let url = 'alipays://platformapi/startapp?appId=20000067&url=' + encodeURIComponent(parameter)
      console.log(url)
      window.location.href = url;
    }).catch(response => {
      //发生错误时执行的代码
      console.log(response)
      showFailToast('获取第三方登录ID失败！')
    });
  }
  if (kind === 'GITHUB') {
    account.getOAuthID(kind).then((response) => {
      console.log(response)
      let url = 'https://github.com/login/oauth/authorize?client_id=' + response.clientId +
          '&scope=user&redirect_uri=' + domain + '/OAuth/' + kind + '&state=' + Math.random().toString(36).slice(-6)
      console.log(url)
      window.location.href = url;
    }).catch(response => {
      //发生错误时执行的代码
      console.log(response)
      showFailToast('获取第三方登录ID失败！')
    });
  }
  if (kind === 'BAIDU') {
    account.getOAuthID(kind).then((response) => {
      console.log(response)
      let url = 'https://openapi.baidu.com/oauth/2.0/authorize?client_id=' + response.clientId +
          '&redirect_uri=' + domain + '/OAuth/' + kind + '&response_type=code&display=mobile&state=' + Math.random().toString(36).slice(-6)
      console.log(url)
      window.location.href = url;
    }).catch(response => {
      //发生错误时执行的代码
      console.log(response)
      showFailToast('获取第三方登录ID失败！')
    });
  }
  if (kind === 'MICROSOFT') {
    account.getOAuthID(kind).then((response) => {
      console.log(response)
      let url = 'https://login.microsoftonline.com/consumers/oauth2/v2.0/authorize?client_id=' + response.clientId +
          '&response_type=code&redirect_uri=' + domain + '/OAuth/' + kind +
          '&response_mode=query&scope=offline_access user.read&state=' + Math.random().toString(36).slice(-6)
      console.log(url)
      window.location.href = url;
    }).catch(response => {
      //发生错误时执行的代码
      console.log(response)
      showFailToast('获取第三方登录ID失败！')
    });
  }
}
</script>

<style lang="less" scoped>
//@import "src/assets/style/index";

.main {

  .form {
    padding: 0.533rem;
    background-color: var(--background_color2);
    //@include background_color('background_color2');
    border-radius: 0.267rem;
    height: 380px;
    z-index: 4;
    box-shadow: 0 0.08rem 0.133rem rgb(0 0 0 / 35%);
    margin-top: 1.067rem;


    button {
      margin-top: 1.333rem;
      font-size: 0.533rem;
    }

    .other {
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--font_color1);
      //@include font_color('font_color1');
      padding: 0 0.8rem;

      .remember {
        flex: 1;
      }

      .forget {
        flex: 1;
        text-align: right;
      }
    }

    .verify-btn {
      width: 5.6rem;
    }


  }

  .other {
    margin-top: 0.8rem;

    .other-logo {
      display: flex;
      justify-content: center;
      text-align: center;

      span {
        width: 1.333rem;

        .logo-icon {
          font-size: 1.067rem;
        }

        p {
          color: var(--font_color2);
          //@include font_color('font_color2');
        }
      }
    }
  }

  .van-cell {
    height: 70px;
    padding: 20px 0;
    display: flex;
    align-items: center;
    background-color: var(--background_color2);
  }
}


</style>
