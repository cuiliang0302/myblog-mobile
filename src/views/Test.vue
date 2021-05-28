<template>
  <div class="home">
    <h1>这是测试页1</h1>
    <van-cell is-link @click="showBirthday=true">展示弹出层</van-cell>
    <van-popup v-model:show="showBirthday" position="bottom" :style="{ height: '30%' }">
      <van-datetime-picker
          v-model="currentDate"
          type="date"
          title="选择生日"
      />
    </van-popup>
  </div>
</template>

<script>
import {DatetimePicker, Popup, Cell} from 'vant';
import {ref} from "vue";

export default {
  components: {
    [DatetimePicker.name]: DatetimePicker,
    [Popup.name]: Popup,
    [Cell.name]: Cell
  },
  name: 'Test',
  setup() {
    const currentDate = ref(new Date(2021, 0, 17));
    const showBirthday = ref(false)
    return {
      showBirthday,
      currentDate,
    };
  }
}
</script>
<style lang="scss">
</style>

