<!--更换手机-->
<template>
  <div class="password">
    <PersonalNavBar :title="'更换手机'"></PersonalNavBar>
    <van-form @submit="onSubmit">
      <van-field
          v-model="phoneForm.newPhone"
          name="新手机号"
          label="新手机号"
          placeholder="新手机号"
          label-width="1.867rem"
          center
          :rules="[{ validator: checkContact, message: '请填写正确的新手机号' }]">
      </van-field>
      <van-field
          v-model="phoneForm.code"
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
import {postCode, getRegister, putChangePhone} from "@/api/account";
import VerifyCodeBtn from "@/components/verify/VerifyCodeBtn.vue";
import user from "@/utils/user";


// 引入用户信息模块
let {userName, userId} = user();
// 更换手机表单
const phoneForm = reactive({
  newPhone: '',
  code: '',
});
// 验证码按钮状态
const btnDisabled = ref(true)
// 获取验证码表单
const codeForm = reactive({
  contact: '',
  action: '更换手机',
  username: '',
})
// 获取验证码
const pass = () => {
  codeForm.contact = phoneForm.newPhone
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
// 异步校验手机号
const checkContact = (val) =>
    new Promise((resolve) => {
      const objRegExp = /^1[0-9]\d{9}$/;
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
  putChangePhone(userId.value, phoneForm).then((response) => {
    console.log(response)
    Toast.success('手机修改成功！');
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
