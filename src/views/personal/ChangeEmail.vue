<!--更换邮箱-->
<template>
  <div class="password">
    <NavBar :title="title"></NavBar>
    <van-form @submit="onSubmit">
      <van-field
          v-model="emailForm.password"
          type="password"
          name="当前密码"
          label="当前密码"
          placeholder="当前密码"
          label-width="1.867rem"
          :rules="[{ required: true, message: '请填写当前密码' }]"
      />
      <van-field
          v-model="emailForm.newEmail"
          type="password"
          name="新邮箱号"
          label="新邮箱号"
          placeholder="新邮箱号"
          label-width="1.867rem"
          center
          :rules="[{ required: true, message: '请填写新邮箱号' }]">
      </van-field>
      <van-field
          v-model="emailForm.code"
          type="password"
          name="验证码"
          label="验证码"
          placeholder="验证码"
          label-width="1.867rem"
          :rules="[{ required: true, message: '请填写验证码' }]"
          >
        <template #right-icon>
          <VerifyCodeBtn @pass="pass"></VerifyCodeBtn>
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

<script>
import NavBar from "@/components/personal/NavBar";
import {Form, Field, Button, Toast} from 'vant';
import {reactive} from "vue";
import {postCode, putChangeEmail} from "@/api/personal";
import VerifyCodeBtn from "@/components/verify/VerifyCodeBtn";

export default {
  components: {
    [Form.name]: Form,
    [Field.name]: Field,
    [Button.name]: Button,
    NavBar,
    VerifyCodeBtn,
  },
  name: "ChangeEmail",
  setup() {
    const title = '更换邮箱'
    // 更换邮箱表单
    const emailForm = reactive({
      password: '',
      newEmail: '',
      code: '',
    });
    // 获取验证码表单
    const codeForm = reactive({
      contact: '',
      action: '更换邮箱',
      username: '新用户',
    })
    // 获取验证码
    const pass = () => {
      console.log("通过验证了,获取验证码")
      if (!emailForm.newEmail) {
        return false
      }
      codeForm.contact = emailForm.newEmail
      postCode(codeForm).then((response) => {
        console.log(response)
        Toast.success('验证码发送成功！');
      }).catch(response => {
        //发生错误时执行的代码
        console.log(response)
        Toast.fail(response.msg);
      });
    }
    const onSubmit = (values) => {
      console.log('submit', values);
    };
    return {
      title,
      emailForm,
      pass,
      onSubmit,
    }
  }
}
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
