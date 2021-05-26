// 是否登录判断

import {computed} from "vue";
import store from "@/store";

function checkLogin() {
  const keepLogin = store.state.keepLogin
  const isLogin = () => {
    console.log("来了")
    console.log(keepLogin)
  }
  return {
    isLogin
  }
}

export default checkLogin
