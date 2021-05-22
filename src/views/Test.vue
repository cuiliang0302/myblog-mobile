<template>
  <div class="home">
    <VerifyCodeBtn @pass="pass"></VerifyCodeBtn>
  </div>
</template>

<script>
import VerifyCodeBtn from "@/components/verify/VerifyCodeBtn";
import {ref} from "vue";

export default {
  components: {
    VerifyCodeBtn
  },
  name: 'Test',
  setup() {
    const pass = () => {
      console.log("通过验证了,获取验证码")
    }
    return {
     pass
    }
  }
}
</script>
<style lang="scss">
</style>

