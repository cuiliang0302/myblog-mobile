<!--更换邮箱-->
<template>
  <div class="password">
    <PersonalNavBar :title="'更换邮箱'"></PersonalNavBar>
    <van-form @submit="onSubmit">
      <van-field
          v-model="emailForm.newEmail"
          name="新邮箱号"
          label="新邮箱号"
          placeholder="新邮箱号"
          label-width="1.867rem"
          center
          :rules="[{ validator: checkContact, message: '请填写新邮箱号' }]">
      </van-field>
      <van-field
          v-model="emailForm.code"
          name="验证码"
          label="验证码"
          placeholder="验证码"
          label-width="1.867rem"
          :rules="[{ required: true, message: '请填写验证码' }]"
      >
        <template #right-icon>
          <VerifyCodeBtn @pass="pass" :btnDisabled="btnDisabled"></VerifyCodeBtn>
        </template>
      </van-field>
      <div style="margin: 0.427rem;">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script setup>
import PersonalNavBar from "@/components/personal/PersonalNavBar.vue";
import {Form, Field, Button, Toast} from 'vant';
import {reactive, ref} from "vue";
import {getRegister, postCode, putChangeEmail} from "@/api/account";
import VerifyCodeBtn from "@/components/verify/VerifyCodeBtn.vue";
import user from "@/utils/user";


// 引入用户信息模块
let {userName, userId} = user();
// 更换邮箱表单
const emailForm = reactive({
  newEmail: '',
  code: '',
});
// 验证码按钮状态
const btnDisabled = ref(true)
// 获取验证码表单
const codeForm = reactive({
  contact: '',
  action: '更换邮箱',
  username: '',
})
// 获取验证码
const pass = () => {
  codeForm.contact = emailForm.newEmail
  codeForm.username = userName.value
  postCode(codeForm).then((response) => {
    console.log(response)
    Toast.success('验证码发送成功！');
  }).catch(response => {
    //发生错误时执行的代码
    console.log(response)
    Toast.fail(response.msg);
  });
}
// 异步校验邮箱号
const checkContact = (val) =>
    new Promise((resolve) => {
      const objRegExp = /^.+@.+$/;
      if (objRegExp.test(val)) {
        getRegister(NaN, val).then((response) => {
          console.log(response)
          btnDisabled.value = false
          resolve(true)
        }).catch(response => {
          //发生错误时执行的代码
          console.log(response)
          Toast.fail(response.msg);
          btnDisabled.value = true
          resolve(false)
        });
      } else {
        btnDisabled.value = true
        resolve(false)
      }
    })
// 表单提交事件
const onSubmit = () => {
  putChangeEmail(userId.value, emailForm).then((response) => {
    console.log(response)
    Toast.success('邮箱修改成功！');
  }).catch(response => {
    //发生错误时执行的代码
    console.log(response)
    Toast.fail(response.msg);
  });
};
</script>

<style scoped lang="scss">
.pay {
  .title {
    margin: 0.4rem;

    h2 {
      margin: 0;
      padding: 0;
      font-weight: normal;
    }

    span {
      display: inline-block;
      height: 3px;
      width: 1.333rem;
      background-image: linear-gradient(to right, #3498db, #2ecc71);
    }
  }

  .pay-img {
    text-align: center;
  }
}
</style>
