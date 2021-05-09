<!--更换邮箱-->
<template>
  <div class="password">
    <NavBar :title="title"></NavBar>
    <van-form @submit="onSubmit">
      <van-field
          v-model="state.password"
          type="password"
          name="当前密码"
          label="当前密码"
          placeholder="当前密码"
          label-width="1.867rem"
          :rules="[{ required: true, message: '请填写当前密码' }]"
      />
      <van-field
          v-model="state.password"
          type="password"
          name="新邮箱号"
          label="新邮箱号"
          placeholder="新邮箱号"
          label-width="1.867rem"
          center
          :rules="[{ required: true, message: '请填写新邮箱号' }]">
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
          name="验证码"
          label="验证码"
          placeholder="验证码"
          label-width="1.867rem"
          :rules="[{ required: true, message: '请填写验证码' }]"
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
import {Form, Field, Button} from 'vant';
import {reactive} from "vue";
import emailCode from "@/utils/emailCode";
export default {
  components: {
    [Form.name]: Form,
    [Field.name]: Field,
    [Button.name]: Button,
    NavBar
  },
  name: "Pay",
  setup() {
    // 获取验证码模块
    let {codeBtn,getCode} = emailCode();
    const title = '更换邮箱'
    const state = reactive({
      username: '',
      password: '',
    });
    const onSubmit = (values) => {
      console.log('submit', values);
    };
    return {
      title,
      state,
      onSubmit,
      codeBtn,
      getCode
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
