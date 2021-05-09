<!--重置密码-->
<template>
  <div class="password">
    <section>
      <div class="wave wave1"></div>
      <div class="wave wave2"></div>
      <div class="wave wave3"></div>
      <div class="wave wave4"></div>
    </section>
    <div class="content">
      <div class="title">
        <h2>重置密码</h2>
      </div>
      <van-steps :active="active">
        <van-step>身份验证</van-step>
        <van-step>设置密码</van-step>
        <van-step>重置完成</van-step>
      </van-steps>
      <van-form @submit="onSubmit">
        <van-field
            v-show="active===0"
            v-model="state.username"
            name="邮箱号"
            label="邮箱号"
            placeholder="邮箱号"
            label-width="20"
            :rules="[{ required: true, message: '请填写邮箱号' }]"
        >
          <template #label>
            <img :src="require('@/assets/icon/email.png')" alt="">
          </template>
        </van-field>
        <van-field
            v-show="active===0"
            v-model="state.password"
            type="password"
            name="验证码"
            label="验证码"
            placeholder="验证码"
            label-width="20"
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
            v-show="active===1"
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
        <van-field
            v-show="active===1"
            v-model="state.password"
            type="password"
            name="密码"
            label-width="20"
            validate-first
            placeholder="请再次输入密码"
            :rules="[{ required: true, message: '请再次输入密码' }]"
        >
          <template #label>
            <img :src="require('@/assets/icon/password.png')" alt="">
          </template>
        </van-field>
        <div v-show="active===2" class="success">
          恭喜，密码重置成功 😊
        </div>
        <div class="btn" @click="nextBtn">
          <van-button v-if="active===2" round block type="primary" native-type="submit">
            登录
          </van-button>
          <van-button v-else round block type="primary">
            下一步
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import {Step, Steps, Form, Button, Field} from 'vant';
import {reactive, ref} from "vue";
import {useRouter} from "vue-router";
import emailCode from "@/utils/emailCode";

export default {
  components: {
    [Step.name]: Step,
    [Steps.name]: Steps,
    [Form.name]: Form,
    [Button.name]: Button,
    [Field.name]: Field
  },
  name: "SetPassword",
  setup() {
    // 获取验证码模块
    let {codeBtn, getCode} = emailCode();
    const router = useRouter()
    const active = ref(0);
    const state = reactive({
      username: '',
      password: '',
    });
    const onSubmit = (values) => {
      console.log('submit', values);
    };
    //按钮点击下一步
    const nextBtn = () => {
      if (active.value !== 2) {
        active.value = active.value + 1
      } else {
        router.push('/login_register')
      }
    }
    return {
      state,
      active,
      onSubmit,
      getCode,
      codeBtn,
      nextBtn
    };
  },
}
</script>

<style scoped lang="scss">
@import "../../assets/style/variable";

.password {
  height: 100%;
  background-size: 100%;
  background-image: linear-gradient(#5aa6f8, #1d6ef9);

  section {
    width: 100%;
    position: absolute;
    height: 88%;
    background-image: url("../../assets/images/background.png");
    background-repeat: no-repeat;
    background-size: 100%;
    padding-bottom: 2.667rem;
    overflow: hidden;

    .wave {
      width: 100%;
      height: 4rem;
      position: absolute;
      bottom: 0;
      left: 0;
      background: url("../../assets/images/wave.png");
      background-size: 26.667rem 4rem;
    }

    .wave.wave1 {
      animation: animate1 20s linear infinite;
      z-index: 4;
      opacity: 1;
      animation-delay: 0s;
      bottom: -30px;
    }

    .wave.wave2 {
      animation: animate2 15s linear infinite;
      z-index: 3;
      opacity: 0.5;
      animation-delay: -5s;
      bottom: -20px;
    }

    .wave.wave3 {
      animation: animate1 10s linear infinite;
      z-index: 2;
      opacity: 0.4;
      animation-delay: -7s;
      bottom: -10px;
    }

    .wave.wave4 {
      animation: animate2 5s linear infinite;
      z-index: 1;
      opacity: 0.2;
      animation-delay: -5s;
      bottom: 0;
    }
  }

  @keyframes animate1 {
    0% {
      background-position-x: 0;
    }
    100% {
      background-position-x: 26.667rem;
    }
  }

  @keyframes animate2 {
    0% {
      background-position-x: 0;
    }
    100% {
      background-position-x: -26.667rem;
    }
  }

  .content {
    position: absolute;
    width: 75%;
    height: 10rem;
    background-color: white;
    box-shadow: 0 0.08rem 0.133rem rgb(0 0 0 / 35%);
    border-radius: 0.267rem;
    left: 50%;
    transform: translateX(-50%);
    top: 17.5%;
    z-index: 4;
    opacity: 0.9;
    padding: 0.533rem;

    .title {
      color: $color-primary;
      width: 8rem;
      text-align: center;
      font-size: 0.48rem;

      .is_activate {
        border-bottom: 0.08rem solid white;
        padding-bottom: 0.133rem;
        font-size: 0.667rem !important;
      }

      span {
        font-size: 0.533rem;
        margin: 0 0.533rem;
      }
    }

    .btn {
      position: absolute;
      bottom: 0.8rem;
      left: 50%;
      width: 65%;
      transform: translateX(-50%);
    }

    .success {
      font-size: 0.427rem;
      text-align: center;
      margin: 1.6rem 0;
      color: $color-text-primary;
    }
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

.van-form {
  margin-top: 0.533rem;
}
</style>
