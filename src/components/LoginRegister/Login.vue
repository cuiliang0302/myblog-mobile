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
            <img :src="require('@/assets/icon/user.png')" alt="">
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
            <img :src="require('@/assets/icon/password.png')" alt="">
          </template>
        </van-field>
        <van-field
            label-width="20"
        >
          <template #label>
            <img :src="require('@/assets/icon/code.png')" alt="">
          </template>
          <template #input>
            <VerifyImgBtn :isPassing="isPassing" :btnType="btnType" @pass="pass" class="verify-btn"></VerifyImgBtn>
          </template>
        </van-field>
        <div class="other">
          <div class="remember">
            <van-checkbox v-model="remember" shape="square">保持登录</van-checkbox>
          </div>
          <div class="forget" @click="$router.push('/set-password')">
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
        <img src="https://img.yzcdn.cn/vant/share-sheet-qq.png">
        <p>QQ</p>
      </span>
        <span @click="vxLogin">
        <img src="https://img.yzcdn.cn/vant/share-sheet-wechat.png">
        <p>微信</p>
      </span>
        <span @click="wbLogin">
        <img src="https://img.yzcdn.cn/vant/share-sheet-weibo.png">
        <p>微博</p>
      </span>
      </div>
    </div>
  </div>
</template>

<script>
import {Form, Button, Field, Divider, Icon, Checkbox, Toast} from 'vant';
import VerifyImgBtn from "@/components/verify/VerifyImgBtn";
import {reactive, ref} from "vue";
import {postLogin} from '@/api/personal'
import store from "@/store";
import {useRouter} from "vue-router";

export default {
  components: {
    [Form.name]: Form,
    [Button.name]: Button,
    [Field.name]: Field,
    [Divider.name]: Divider,
    [Icon.name]: Icon,
    [Checkbox.name]: Checkbox,
    Toast,
    VerifyImgBtn
  },
  name: "Login",
  setup() {
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
        store.commit('setIsLogin', true)
        if (remember.value) {
          console.log('记住了')
          store.commit('setKeepLogin', true)
          store.commit('setUserLocal', response)
        } else {
          console.log('记不住')
          store.commit('setKeepLogin', false)
          store.commit('setUserSession', response)
        }
        router.push('/personal')
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
    const vxLogin = () => {
      Toast('微信登录正在开发中！')
    }
    const wbLogin = () => {
      Toast('微博登录正在开发中！')
    }
    return {
      loginForm,
      onSubmit,
      remember,
      isPassing,
      pass,
      btnType,
      qqLogin,
      vxLogin,
      wbLogin
    };
  },
}
</script>

<style lang="scss" scoped>
@import "src/assets/style/variable";

.main {

  .form {
    padding: 0.533rem;
    background-color: white;
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
      color: #323233;
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


    .van-field__label {
      img {
        width: 0.533rem;
        height: 0.533rem;
        opacity: 0.6;
        vertical-align: -0.133rem
      }
    }
  }

  .other {
    margin-top: 0.8rem;

    .other-logo {
      display: flex;
      justify-content: center;
      text-align: center;

      span {
        width: 2.133rem;

        img {
          width: 1.067rem;
          height: 1.067rem;
        }

        p {
          color: $color-text-regular;
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
