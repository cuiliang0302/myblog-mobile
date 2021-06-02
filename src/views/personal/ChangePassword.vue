<!--修改密码-->
<template>
  <div class="password">
    <NavBar :title="title"></NavBar>
    <van-form @submit="onSubmit">
      <van-field
          v-model="passwordForm.oldPassword"
          type="password"
          name="当前密码"
          label="当前密码"
          placeholder="当前密码"
          label-width="1.867rem"
          :rules="[{ required: true, message: '请填写当前密码' }]"
      />
      <van-field
          v-model="Form.password1"
          type="password"
          name="新密码"
          label="新密码"
          placeholder="新密码"
          label-width="1.867rem"
          :rules="[{ pattern, message: '请填写密码' }]"
      />
      <van-field
          v-model="Form.password2"
          type="password"
          name="确认密码"
          label="确认密码"
          placeholder="确认密码"
          label-width="1.867rem"
          :rules="[{ validator: checkPassword, message: '请再次填写密码' }]"
      />
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
import {putChangePassword} from "@/api/account";
import user from "@/utils/user";
import {useRouter} from "vue-router";

export default {
  components: {
    [Form.name]: Form,
    [Field.name]: Field,
    [Button.name]: Button,
    NavBar
  },
  name: "Pay",
  setup() {
    const router = useRouter()
    const title = '修改密码'
    // 引入用户信息模块
    let {userId} = user();
    // 修改提交密码表单
    const passwordForm = reactive({
      oldPassword: '',
      newPassword: '',
    });
    // 页面表单
    const Form = reactive({
      password1: '',
      password2: '',
    });
    // 密码正则校验
    const pattern = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
    // 密码一致性校验
    const checkPassword = (val) =>
        new Promise((resolve) => {
          console.log(val)
          if (val && Form.password1 === Form.password2) {
            resolve(true)
          } else {
            resolve(false)
          }
        })

    // 表单提交
    async function onSubmit() {
      passwordForm.newPassword = Form.password1
      try {
        let response = await putChangePassword(userId.value, passwordForm)
        console.log(response)
        Toast.success('修改成功，即将跳转登录页');
        setTimeout(function () {
          router.push('/login_register')
        }, 1500)
      } catch (error) {
        console.log(error)
        Toast.fail(error.msg);
      }
    }

    return {
      title,
      passwordForm,
      Form,
      pattern,
      checkPassword,
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
