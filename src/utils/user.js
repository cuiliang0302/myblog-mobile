// 是否登录判断

import {computed, onMounted, reactive, ref} from "vue";
import store from "@/store";

function user() {
  const isLogin = ref(computed(() => store.state.login.isLogin))
  const keepLogin = computed(() => store.state.login.keepLogin)
  const userId = ref()
  const userToken = ref()
  onMounted(() => {
    if (isLogin) {
      console.log("登录了")
      if (keepLogin === true) {
        console.log('吃久了')
        userId.value = store.state.userLocal.userid
        userToken.value = store.state.userLocal.token
      } else {
        console.log('并没有')
        userId.value = store.state.userSession.userid
        userToken.value = store.state.userSession.token
      }
    }
  })
  return {
    isLogin, userId, userToken
  }
}

export default user
