// 是否登录判断

import {computed, onMounted, reactive, ref} from "vue";
import store from "@/store/index";

function user() {
  const isLogin = ref(false)
  const keepLogin = computed(() => store.state.login.keepLogin)
  const userId = ref()
  const userToken = ref()
  const userName = ref()
  onMounted(() => {
    if (keepLogin === true) {
      userId.value = store.state.userLocal.userid
      userToken.value = store.state.userLocal.token
      userName.value = store.state.userLocal.username
    } else {
      if (JSON.stringify(store.state.userSession) === '{}') {
        isLogin.value = false
      } else {
        isLogin.value = true
        userId.value = store.state.userSession.userid
        userToken.value = store.state.userSession.token
        userName.value = store.state.userSession.username
      }
    }
  })
  return {
    isLogin, userId, userToken, userName
  }
}

export default user
