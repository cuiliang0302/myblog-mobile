<template>
  <div class="main">
    <div class="form">
      <van-form @submit="onSubmit">
        <van-field
            v-model="state.username"
            name="昵称"
            placeholder="请输入昵称"
            label-width="20"
            validate-first
            :rules="[{ required: true, message: '请填写昵称' }]"
        >
          <template #label>
            <img :src="require('@/assets/icon/user.png')" alt="">
          </template>
        </van-field>
        <van-field
            v-model="state.username"
            name="邮箱号"
            placeholder="请输入邮箱号"
            label-width="20"
            validate-first
            :rules="[{ required: true, message: '请填写邮箱号' }]"
        >
          <template #label>
            <img :src="require('@/assets/icon/email.png')" alt="">
          </template>
        </van-field>
        <van-field
            v-model="state.username"
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
            <van-button type="primary"
                        block
                        plain
                        size="small"
                        :text="codeBtn.btnText"
                        :disabled="codeBtn.disabled"
                        @click="getCode">
            </van-button>
          </template>
        </van-field>
        <van-field
            v-model="state.password"
            type="password"
            name="密码"
            label-width="20"
            validate-first
            placeholder="请输入密码(数字+字符,最少8位)"
            :rules="[{ required: true, message: '请填写密码' }]"
        >
          <template #label>
            <img :src="require('@/assets/icon/password.png')" alt="">
          </template>
        </van-field>
        <div class="submit">
          <van-button round block type="primary" native-type="submit" @click="onSubmit">
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
import emailCode from "@/utils/emailCode";

export default {
  components: {
    [Form.name]: Form,
    [Button.name]: Button,
    [Icon.name]: Icon,
    [Field.name]: Field,
  },
  name: "Register",
  setup() {
    // 获取验证码模块
    let {codeBtn,getCode} = emailCode();
    const router = useRouter()
    const state = reactive({
      username: '',
      password: '',
    });
    const onSubmit = (values) => {
      console.log('submit', values);
      Toast.success('注册成功，即将跳转至个人中心页');
      setTimeout(function () {
        router.push('/personal')
      },1500);
    };
    return {
      state,
      onSubmit,
      codeBtn,
      getCode
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
