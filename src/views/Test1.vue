<!--重置密码-->
<template>
  <div class="main">
    <h1>TEST1</h1>
    <h1>TEST1</h1>
    <h1>TEST1</h1>
    <h1>TEST1</h1>
    <h1>TEST1</h1>
    <router-link to="/test">去test</router-link>
    <van-button type="primary" @click="get">取值</van-button>
    <van-button type="success" @click="set">存值</van-button>
    <h1>TEST1</h1>
    <h1>TEST1</h1>
    <h1>TEST1</h1>
    <h1>TEST1</h1>
    <h1>TEST1</h1>
    <h1>TEST1</h1>
    <h1>TEST1</h1>
  </div>
</template>

<script>
import {Step, Steps, Form, Button, Field} from 'vant';
import {onActivated, onDeactivated, reactive, ref} from "vue";
import TimeLine from "@/components/common/TimeLine";
import viewScrollTop from "@/utils/viewScrollTop";
import {useRouter} from "vue-router";
import sessionStorage from "@/utils/sessionStorage";

export default {
  components: {
    TimeLine,
    [Button.name]: Button
  },
  name: "Test1",
  setup() {
    let {getScrollTop, setScrollTop} = viewScrollTop()
    let {getValue, setValue} = sessionStorage()
    const router = useRouter()
    let view = router.currentRoute.value.name
    const activated = onActivated(() => {
      getScrollTop(view)
    })
    const get = () => {
      let scrollTop = Math.max(window.pageYOffset, document.documentElement.scrollTop)
      console.log("这是get方法的值：",scrollTop)
      getValue(view)
    }
    const set = () => {
      let scrollTop = Math.max(window.pageYOffset, document.documentElement.scrollTop)
      console.log("这是set方法")
      setValue(view,scrollTop)
    }
    const deactivated = onDeactivated(() => {
      setScrollTop(view)
    })
    return {
      activated, deactivated, get,set
    }
  },
}
</script>

<style scoped lang="scss">
@import "src/assets/style/variable";

.main {
  height: 1000px;

  h1 {
    font-size: 100px;
  }
}
</style>
