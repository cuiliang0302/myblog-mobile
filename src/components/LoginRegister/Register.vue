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
            clearable
            :rules="[{ validator: checkUsername, message: '请填写正确的用户名' }]"
        >
          <template #label>
            <MyIcon class="icon" type="icon-username"/>
          </template>
        </van-field>
        <van-field
            v-model="registerForm.contact"
            name="邮箱号"
            placeholder="请输入邮箱号"
            label-width="20"
            validate-first
            clearable
            :rules="[{ validator: checkContact, message: '请填写正确的邮箱号' }]"
        >
          <template #label>
            <MyIcon class="icon" type="icon-email"/>
          </template>
        </van-field>
        <van-field
            v-model="registerForm.code"
            name="验证码"
            label-width="20"
            validate-first
            placeholder="请输入验证码"
            clearable
            :rules="[{ required: true, message: '请填写验证码' }]"
        >
          <template #label>
            <MyIcon class="icon" type="icon-code"/>
          </template>
          <template #right-icon>
            <VerifyCodeBtn @pass="pass" :btnDisabled="btnDisabled"></VerifyCodeBtn>
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
            <MyIcon class="icon" type="icon-password"/>
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
<script setup>
import {reactive, ref} from "vue";
import {showFailToast, showSuccessToast} from 'vant';
import {useRouter} from "vue-router";
import VerifyCodeBtn from "@/components/verify/VerifyCodeBtn.vue";
import {storeToRefs} from 'pinia'
import {useCommonStore, useUserStore} from '@/store';
import icon from '@/utils/icon'
import account from "@/api/account";
const {MyIcon} = icon()
const user = useUserStore();
const common = useCommonStore();
const router = useRouter()
// 登录后跳转页面
const {next_path} = storeToRefs(common)
// 注册表单
const registerForm = reactive({
  username: '',
  contact: '',
  code: '',
  password: '',
});
// 注册完成自动登录表单
const loginForm = reactive({
  username: '',
  password: '',
});
// 密码正则校验
const pattern = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
// 异步校验用户名
const checkUsername = (val) =>
    new Promise((resolve) => {
      if (val) {
        account.getRegister(val, NaN).then((response) => {
          console.log(response)
          resolve(true)
        }).catch(response => {
          //发生错误时执行的代码
          console.log(response)
          showFailToast("此用户名已存在!");
          resolve(false)
        });
      }
    })
// 异步校验邮箱
const checkContact = (val) => {
  console.log(val)
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  new Promise((resolve) => {
    if (val && re.test(val)) {
      account.getRegister(NaN, val).then((response) => {
        console.log(response)
        btnDisabled.value = false
        resolve(true)
      }).catch(response => {
        //发生错误时执行的代码
        console.log(response)
        showFailToast("此邮箱号已存在!");
        btnDisabled.value = true
        resolve(false)
      });
    } else {
      showFailToast("请输入正确的邮箱号!");
      btnDisabled.value = true
      resolve(false)
    }
  })
}
const onFailed = (errorInfo) => {
  console.log('failed', errorInfo);
};
// 验证码按钮状态
const btnDisabled = ref(true)
// 获取验证码表单
const codeForm = reactive({
  contact: '',
  action: '用户注册',
  username: '新用户',
})
// 获取验证码
const pass = () => {
  console.log("通过验证了,获取验证码")
  codeForm.contact = registerForm.contact
  account.postCode(codeForm).then((response) => {
    console.log(response)
    showSuccessToast('验证码发送成功！');
  }).catch(response => {
    //发生错误时执行的代码
    console.log(response)
    showFailToast("验证码发送失败!");
  });
}
const onSubmit = (values) => {
  console.log('submit', values);
  account.postRegister(registerForm).then((response) => {
    console.log(response)
    showSuccessToast('注册成功,已为您自动登录!');
    loginForm.username = registerForm.username
    loginForm.password = registerForm.password
    account.postLogin(loginForm).then((response) => {
      console.log(response)
      // store.commit('setKeepLogin', false)
      // store.commit('setUserSession', response)
      user.login(response.user_id, response.token, response.username)
      router.push(common.next_path)
    }).catch(response => {
      //发生错误时执行的代码
      console.log(response)
      showFailToast('登录异常！');
    });
  }).catch(response => {
    //发生错误时执行的代码
    console.log(response)
    showFailToast('账号注册失败！');
  });
};
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

    .submit {
      button {
        margin: 35px auto;
        font-size: 0.533rem;
        width: 88%
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
