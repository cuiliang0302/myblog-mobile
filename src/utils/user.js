// 是否登录判断

import {computed, onMounted, reactive, ref} from "vue";
import store from "@/store";

function user() {
  const isLogin = ref(computed(() => store.state.login.isLogin))
  const keepLogin = computed(() => store.state.login.keepLogin)
  const userInfo = reactive({})
  onMounted(()=>{
    if(isLogin){
      if (keepLogin) {
        for (let i in store.state.userLocal) {
          userInfo[i] = store.state.userLocal[i]
        }
      } else {
        for (let i in store.state.userSession) {
          userInfo[i] = store.state.userLocal[i]
        }
      }
    }
  })
  return {
    isLogin, userInfo
  }
}

export default user
