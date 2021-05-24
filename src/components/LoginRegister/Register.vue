<template>
  <div class="main">
    <div class="form">
      <van-form @submit="onSubmit" @failed="onFailed">
        <van-field
            v-model="registerForm.username"
            name="用户名"
            placeholder="请输入用户名"
            label-width="20"
            validate-first
            :rules="[{ validator: checkUsername, message: '请填写正确的用户名' }]"
        >
          <template #label>
            <img :src="require('@/assets/icon/user.png')" alt="">
          </template>
        </van-field>
        <van-field
            v-model="registerForm.contact"
            name="邮箱号/手机号"
            placeholder="请输入邮箱号/手机号"
            label-width="20"
            validate-first
            :rules="[{ validator: checkContact, message: '请填写正确的邮箱号/手机号' }]"
        >
          <template #label>
            <img :src="require('@/assets/icon/email.png')" alt="">
          </template>
        </van-field>
        <van-field
            v-model="registerForm.code"
            name="验证码"
            label-width="20"
            validate-first
            placeholder="请输入验证码"
            :rules="[{ required: true, message: '请填写验证码' }]"
        >
          <template #label>
            <img :src="require('@/assets/icon/code.png')" alt="">
          </template>
          <template #right-icon>
            <VerifyCodeBtn @pass="pass"></VerifyCodeBtn>
          </template>
        </van-field>
        <van-field
            v-model="registerForm.password"
            type="password"
            name="密码"
            label-width="20"
            validate-first
            placeholder="请输入密码(数字+字符,8-16位)"
            :rules="[{ pattern, message: '请填写密码' }]"
        >
          <template #label>
            <img :src="require('@/assets/icon/password.png')" alt="">
          </template>
        </van-field>
        <div class="submit">
          <van-button round block type="primary" native-type="submit">
            注 册
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>
<script>
import {reactive, ref} from "vue";
import {Form, Button, Field, Icon, Toast} from 'vant';
import {useRouter} from "vue-router";
import VerifyCodeBtn from "@/components/verify/VerifyCodeBtn";
import {getRegister} from '@/api/personal'

export default {
  components: {
    [Form.name]: Form,
    [Button.name]: Button,
    [Icon.name]: Icon,
    [Field.name]: Field,
    VerifyCodeBtn
  },
  name: "Register",
  setup() {
    const router = useRouter()
    // 注册表单
    const registerForm = reactive({
      username: '',
      contact: '',
      code: '',
      password: '',
    });
    // 密码正则校验
    const pattern = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
    // 异步校验用户名
    const checkUsername = (val) =>
        new Promise((resolve) => {
          if (val) {
            getRegister(val, NaN).then((response) => {
              console.log(response)
              if (response.result === 1) {
                resolve(true)
              } else {
                resolve(false)
              }
            })
          } else {
            resolve(false)
          }
        });
    // 异步校验邮箱/手机号
    const checkContact = (val) =>
        new Promise((resolve) => {
          if (val) {
            getRegister(NaN, val).then((response) => {
              console.log(response)
              if (response.result === 1) {
                resolve(true)
              } else {
                resolve(false)
              }
            })
          } else {
            resolve(false)
          }
        });

    const onFailed = (errorInfo) => {
      console.log('failed', errorInfo);
    };
    // 获取验证码
    const pass = () => {
      console.log("通过验证了,获取验证码")
    }
    const onSubmit = (values) => {
      console.log('submit', values);
      // Toast.success('注册成功，即将跳转至个人中心页');
      // setTimeout(function () {
      //   router.push('/personal')
      // }, 1500);
    };
    return {
      registerForm,
      onSubmit,
      pass,
      pattern,
      checkUsername,
      checkContact,
      onFailed
    };
  }
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

    .submit {
      button {
        margin-top: 1.067rem;
        font-size: 0.533rem;
      }
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

  .van-cell {
    height: 1.333rem;
    padding: 0.8rem 0rem;
    display: flex;
    align-items: center;
  }
}
</style>
