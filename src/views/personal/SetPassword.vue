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
      <van-form @submit="verifySubmit">
        <van-field
            v-show="active===0"
            v-model="verifyForm.contact"
            name="邮箱/手机号"
            label="邮箱/手机号"
            placeholder="邮箱/手机号"
            label-width="20"
            :rules="[{ validator: checkContact, message: '填写正确的邮箱/手机号' }]"
        >
          <template #label>
            <MyIcon class="icon" type="icon-email"/>
          </template>
        </van-field>
        <van-field
            v-show="active===0"
            v-model="verifyForm.code"
            name="验证码"
            label="验证码"
            placeholder="验证码"
            label-width="20"
            :rules="[{ required: true, message: '请填写验证码' }]"
        >
          <template #label>
            <MyIcon class="icon" type="icon-code"/>
          </template>
          <template #right-icon>
            <VerifyCodeBtn @pass="pass" :btnDisabled="btnDisabled"></VerifyCodeBtn>
          </template>
        </van-field>
        <div style="margin: 16px;" v-show="active===0">
          <van-button round block type="primary" native-type="submit">
            下一步
          </van-button>
        </div>
      </van-form>
      <van-form @submit="passwordSubmit">
        <van-field
            v-show="active===1"
            v-model="passwordForm.password1"
            type="password"
            name="密码"
            label-width="20"
            validate-first
            placeholder="请输入密码(数字+字符,最少8位)"
            :rules="[{ pattern, message: '请填写密码' }]"
        >
          <template #label>
            <MyIcon class="icon" type="icon-password"/>
          </template>
        </van-field>
        <van-field
            v-show="active===1"
            v-model="passwordForm.password2"
            type="password"
            name="密码"
            label-width="20"
            validate-first
            placeholder="请再次输入密码"
            :rules="[{ validator: checkPassword, message: '请再次填写密码' }]"
        >
          <template #label>
            <MyIcon class="icon" type="icon-password"/>
          </template>
        </van-field>
        <div style="margin: 16px;" v-show="active===1">
          <van-button round block type="primary" native-type="submit">
            下一步
          </van-button>
        </div>
      </van-form>
      <div v-show="active===2" class="success">
        <MyIcon class="icon" type="icon-success-solid"/>
        <br>
        恭喜，密码重置成功
      </div>
      <div class="btn">
        <van-button v-show="active===2" round block type="primary" native-type="submit"
                    @click="$router.push('/loginRegister')">
          登录
        </van-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import {Step, Steps, Form, Button, Field, Toast} from 'vant';
import {reactive, ref} from "vue";
import {getRegister, postCode, postSetPassword} from "@/api/account";
import VerifyCodeBtn from "@/components/verify/VerifyCodeBtn.vue";
import icon from '@/utils/icon'
let {MyIcon} = icon()

const active = ref(0);
// 用户验证表单
const verifyForm = reactive({
  contact: '',
  code: '',
  password: ''
});
// 异步校验邮箱/手机号
const checkContact = (val) =>
    new Promise((resolve) => {
      if (val) {
        getRegister(NaN, val).then((response) => {
          console.log(response)
          resolve(false)
        }).catch(response => {
          //发生错误时执行的代码
          console.log(response)
          btnDisabled.value = false
          resolve(true)
        });
      } else {
        btnDisabled.value = true
        resolve(false)
      }
    })
// 验证码按钮状态
const btnDisabled = ref(true)
// 获取验证码表单
const codeForm = reactive({
  contact: '',
  action: '重置密码',
  username: '用户',
})
// 获取验证码
const pass = () => {
  console.log("通过验证了,获取验证码")
  codeForm.contact = verifyForm.contact
  postCode(codeForm).then((response) => {
    console.log(response)
    Toast.success('验证码发送成功！');
  }).catch(response => {
    //发生错误时执行的代码
    console.log(response)
    Toast.fail(response.msg);
  });
}
// 用户验证表单提交
const verifySubmit = (values) => {
  console.log('submit', values);
  active.value = 1
};
// 密码正则校验
const pattern = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
// 密码一致性校验
const checkPassword = (val) =>
    new Promise((resolve) => {
      console.log(val)
      if (val && passwordForm.password1 === passwordForm.password2) {
        resolve(true)
      } else {
        resolve(false)
      }
    })
// 设置密码表单
const passwordForm = reactive({
  password1: '',
  password2: '',
});

// 密码表单提交
async function passwordSubmit() {
  verifyForm.password = passwordForm.password1
  try {
    let response = await postSetPassword(verifyForm)
    console.log(response)
    active.value = 2
  } catch (error) {
    console.log(error)
    Toast.fail(error.msg);
    active.value = 0
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/style/index";

.password {
  height: 100%;
  background-size: 100%;
  background-image: linear-gradient(#5aa6f8, #1d6ef9);

  section {
    width: 100%;
    position: absolute;
    height: 88%;
    background-image: url("/src/assets/images/background.png");
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
      @include background_img('background_img1');
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
    @include background_color('background_color2');
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
      margin: 1.067rem 0;
      @include font_color('font_color1');

      .icon {
        width: 1.333rem;
        height: 1.333rem;
        margin-bottom: 0.533rem;
        color: $color-other-emerald;
      }
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
