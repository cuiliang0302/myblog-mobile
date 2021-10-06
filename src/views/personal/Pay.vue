<!--赞赏支持-->
<template>
  <div class="pay">
    <PersonalNavBar :title="'赞赏支持'"></PersonalNavBar>
    <section>
      <div class="title">
        <h2>支付宝</h2>
        <span></span>
      </div>
      <div class="pay-img">
        <van-image :src="info.ali_pay" alt="" radius="0.4rem" lazy-load height="7.467rem" width="7.467rem">
          <template v-slot:loading>
            <van-loading type="spinner" size="20"/>
          </template>
        </van-image>
      </div>
    </section>
    <section>
      <div class="title">
        <h2>微信</h2>
        <span></span>
      </div>
      <div class="pay-img">
        <van-image :src="info.wechat_pay" alt="" radius="0.4rem" lazy-load height="7.467rem" width="7.467rem">
          <template v-slot:loading>
            <van-loading type="spinner" size="20"/>
          </template>
        </van-image>
      </div>
    </section>
  </div>
</template>

<script setup>
import PersonalNavBar from "@/components/personal/PersonalNavBar.vue";
import {Image as VanImage, Loading} from 'vant';
import {onMounted, reactive} from "vue";
import {getInfo} from "@/api/management";

    const info = reactive({
      'wechat_pay': '',
      'ali_pay': ''
    })
    // 获取博主信息数据
    async function infoData() {
      let info_data = await getInfo()
      console.log(info_data)
      info.wechat_pay = info_data.wechat_pay
      info.ali_pay = info_data.ali_pay
    }

    onMounted(() => {
      infoData()
    })

</script>

<style scoped lang="scss">
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
