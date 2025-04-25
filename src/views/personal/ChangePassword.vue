<!--修改密码-->
<template>
  <div class="password">
    <PersonalNavBar :title="'修改密码'"></PersonalNavBar>
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
          v-model="checkPasswordForm.password1"
          type="password"
          name="新密码"
          label="新密码"
          placeholder="新密码"
          label-width="1.867rem"
          :rules="[{ pattern, message: '请填写新密码' }]"
      />
      <van-field
          v-model="checkPasswordForm.password2"
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

<script setup>
import PersonalNavBar from "@/components/personal/PersonalNavBar.vue";
import {showSuccessToast, showFailToast, showDialog} from 'vant';
import {onMounted, reactive} from "vue";
import {useRouter} from "vue-router";
import {useUserStore} from '@/store';
import account from "@/api/account";

const user = useUserStore();
const router = useRouter()
// 修改提交密码表单
const passwordForm = reactive({
  oldPassword: '',
  newPassword: '',
});
// 页面表单
const checkPasswordForm = reactive({
  password1: '',
  password2: '',
});
// 密码正则校验
const pattern = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
// 密码一致性校验
const checkPassword = (val) =>
    new Promise((resolve) => {
      console.log(val)
      if (val && checkPasswordForm.password1 === checkPasswordForm.password2) {
        resolve(true)
      } else {
        resolve(false)
      }
    })

// 表单提交
const onSubmit = () => {
  passwordForm.newPassword = checkPasswordForm.password1
  account.putChangePassword(passwordForm).then((response) => {
    console.log(response)
    showSuccessToast('修改成功，即将跳转登录页');
    setTimeout(function () {
      router.replace('/loginRegister')
    }, 1500)
  }).catch(response => {
    //发生错误时执行的代码
    console.log(response)
    showFailToast(response.msg);
  })
}

// 获取用户信息
const getUserinfoData = async () => {
  try {
    const userinfo_data = await account.getUserinfo()
    console.log(userinfo_data[0].source)
    if (userinfo_data[0].source !== '直接注册') {
      showDialog({
        title: '修改密码提示',
        message: '您的账号直接使用' + userinfo_data.source + '登录即可，无需修改密码！',
        theme: 'round-button',
      }).then(() => {
        router.push('/personal/myIndex')
      });
    }
  } catch (e) {
    console.log(e)
    showFailToast("获取用户信息失败");
  }
}

onMounted(() => {
  getUserinfoData()
})
</script>

<style scoped lang="less">
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
