<template>
  <h2>主题换肤</h2>
  <van-radio-group v-model="theme_name" @change="setTheme">
    <van-radio v-for="(item,index) in theme_list" :key=index :name="item.name" :checked-color="item.value">
      {{ item.name }}
    </van-radio>
  </van-radio-group>
  <h2>深色模式</h2>
  <van-switch v-model="is_dark" @change="setDark"/>
  <h2>用户登录</h2>
  <van-form @submit="userLogin">
    <van-cell-group inset>
      <van-field
          v-model="user_form.username"
          name="用户名"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
          v-model="user_form.password"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
      />
      <van-field name="switch" label="保持登录">
        <template #input>
          <van-switch v-model="keep_login" />
        </template>
      </van-field>
      </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        登录
      </van-button>
    </div>
  </van-form>
  <h2>用户信息</h2>
  <p>登录状态：{{user.isLoggedIn}}</p>
  <p>用户名：{{user.username}}</p>
  <p>用户ID：{{user.user_id}}</p>
  <MyIcon class="icon" type="icon-view"/>
</template>

<script setup>
import {ref, reactive} from 'vue';
import {showFailToast, showSuccessToast} from "vant";
import icon from '@/utils/icon'
import {storeToRefs} from 'pinia'
import {useThemeStore,useUserStore} from '@/store';
const user = useUserStore();
const {MyIcon} = icon()
const theme = useThemeStore();
const {theme_name, is_dark} = storeToRefs(theme)
const {keep_login} = storeToRefs(user)
// 主题色
const theme_list = ref([
  {name: '拂晓蓝(默认)', value: '#409eff'},
  {name: '薄暮红', value: '#e74c3c'},
  {name: '火山橘', value: '#e67e22'},
  {name: '日暮黄', value: '#f1c40f'},
  {name: '极光绿', value: '#16a085'},
  {name: '酱样紫', value: '#9b59b6'},
])
const setTheme = (name) => {
  console.log(name)
  const theme_item = theme_list.value.find(item => item.name === name);
  console.log(theme_item.value)
  theme.toggleTheme(name, theme_item.value)
}
// 深色模式
const setDark = (value) => {
  console.log(value);
}
// 用户登录
const user_form = reactive({
  username: '',
  password: ''
})
const userLogin = async () => {
  console.log("用户提交登录了")
  showSuccessToast('成功文案');
  console.log(user_form)
  try {
    const response = await User.login(user_form.username, user_form.password);
    console.log('Login successful:', response);
    // 你可以在这里处理登录成功后的逻辑，如保存 token 或跳转页面
    showSuccessToast('登录成功');
    user.login(response.user_id, response.token, response.username)
  } catch (error) {
    console.error('Login failed:', error);
    // 处理登录失败的逻辑
    console.log(error.response.data)
    showFailToast(error.response.data.message);
  }
}
</script>

<style lang="less" scoped>

h2 {
  font-size: 25px;
  padding-top: 15px;
  padding-bottom: 15px;
  color: var(--border_color2);
}

.van-radio {
  padding: 5px 0;
}
.van-radio-group,p{
  font-size: 15px
}
p {
  padding: 10px 0;
}
//:deep(.van-button){
//  background-color:var(--primary-color)
//}
</style>