<template>
  <div class="main">
    <div class="form">
      <van-form @submit="onSubmit">
        <van-field
            v-model="state.username"
            name="用户名"
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
            v-model="state.password"
            type="password"
            name="密码"
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
            name="验证码"
            label-width="20"
        >
          <template #label>
            <img :src="require('@/assets/icon/code.png')" alt="">
          </template>
          <template #input>
            <VerifyImgBtn class="verify-btn"></VerifyImgBtn>
          </template>
        </van-field>
        <div class="other">
          <div class="remember">
            <van-checkbox v-model="checked" shape="square">保持登录</van-checkbox>
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
        <span>
        <img src="https://img.yzcdn.cn/vant/share-sheet-qq.png">
        <p>QQ</p>
      </span>
        <span>
        <img src="https://img.yzcdn.cn/vant/share-sheet-wechat.png">
        <p>微信</p>
      </span>
        <span>
        <img src="https://img.yzcdn.cn/vant/share-sheet-weibo.png">
        <p>微博</p>
      </span>
      </div>
    </div>
  </div>
</template>

<script>
import {Form, Button, Field, Divider, Icon, Checkbox} from 'vant';
import VerifyImgBtn from "@/components/verify/VerifyImgBtn";
import {reactive, ref} from "vue";

export default {
  components: {
    [Form.name]: Form,
    [Button.name]: Button,
    [Field.name]: Field,
    [Divider.name]: Divider,
    [Icon.name]: Icon,
    [Checkbox.name]: Checkbox,
    VerifyImgBtn
  },
  name: "Login",
  setup() {
    const checked = ref(false);
    const state = reactive({
      username: '',
      password: '',
    });
    const onSubmit = (values) => {
      console.log('submit', values);
    };

    return {
      state,
      onSubmit,
      checked
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
