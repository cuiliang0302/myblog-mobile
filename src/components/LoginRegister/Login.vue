<template>
  <div class="main">
    <div class="form">
      <van-form @submit="onSubmit">
        <van-field
            v-model="loginForm.username"
            name="username"
            placeholder="用户名/邮箱号/手机号"
            label-width="20"
            validate-first
            :rules="[{ required: true, message: '请填写用户名/邮箱号/手机号' }]"
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
            <van-checkbox v-model="remember" shape="square">保持登录</van-checkbox>
          </div>
          <div class="forget" @click="$router.push('/setPassword')">
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
        <span @click="qqLogin">
          <MyIcon class="logo-icon" type="icon-qq-logo"/>
          <p>QQ</p>
        </span>
        <span @click="wbLogin">
          <MyIcon class="logo-icon" type="icon-weibo-logo"/>
          <p>微博</p>
        </span>
        <span @click="githubLogin">
          <MyIcon class="logo-icon" type="icon-github-logo"/>
          <p>GitHub</p>
        </span>
        <span @click="githubLogin">
          <MyIcon class="logo-icon" type="icon-baidu-logo"/>
          <p>百度</p>
        </span>
        <span @click="githubLogin">
          <MyIcon class="logo-icon" type="icon-alipay-logo"/>
          <p>支付宝</p>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import {Form, Button, Field, Divider, Icon, Checkbox, Toast} from 'vant';
import VerifyImgBtn from "@/components/verify/VerifyImgBtn.vue";
import {reactive, ref} from "vue";
import {postLogin} from '@/api/account'
import store from "@/store/index";
import {useRouter} from "vue-router";
import icon from '@/utils/icon'

let {MyIcon} = icon()

const router = useRouter()
// 保持登录复选框
const remember = ref(false);
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
  postLogin(loginForm).then((response) => {
    console.log(response)
    Toast.success('登录成功！');
    if (remember.value) {
      console.log('记住了')
      store.commit('setKeepLogin', true)
      store.commit('setUserLocal', response)
    } else {
      console.log('记不住')
      store.commit('setKeepLogin', false)
      store.commit('setUserSession', response)
    }
    router.push(store.state.nextPath)
  }).catch(response => {
    //发生错误时执行的代码
    console.log(response)
    Toast.fail('账号或密码错误！');
    loginForm.username = ''
    loginForm.password = ''
    isPassing.value = false
  });
};
// qq登录
const qqLogin = () => {
  Toast('QQ登录正在开发中！')
}
const githubLogin = () => {
  Toast('GitHub登录正在开发中！')
  // Toast.loading({
  //   message: '登录跳转中...',
  //   forbidClick: true,
  // });
  // window.location.href = 'http://127.0.0.1:8000/auth/login/github/'
}
const wbLogin = () => {
  Toast('微博登录正在开发中！')

}
</script>

<style lang="scss" scoped>
@import "src/assets/style/index";

.main {

  .form {
    padding: 0.533rem;
    @include background_color('background_color2');
    border-radius: 0.267rem;
    height: 9.333rem;
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
      @include font_color('font_color1');
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
        width: 1.6rem;

        .logo-icon{
          font-size: 1.067rem;
        }

        p {
          @include font_color('font_color2');
        }
      }
    }
  }

  .van-cell {
    height: 1.333rem;
    padding: 0.8rem 0rem;
    display: flex;
    align-items: center;
  }
}


</style>
