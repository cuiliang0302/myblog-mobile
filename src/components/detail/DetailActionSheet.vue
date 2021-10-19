<template>
  <van-action-sheet
      v-model:show="show"
      cancel-text="取消"
      close-on-click-action
      @cancel="onCancel"
      close-on-popstate
  >
    <div class="content">
      <div class="dark">
        <span>显示模式</span>
        <span>
          <van-switch v-model="isDark" @change="changePattern" active-color="#bdc3c7" inactive-color="#ffffff"/>
        </span>
      </div>
      <div class="font-setting">
        <span class="slider">
          <span class="font-title">字体大小</span>
          <span>小</span>
          <van-slider v-model="fontValue" :step="25" @change="changeSize">
          <template #button>
            <div class="custom-button">{{ fontType }}</div>
          </template>
        </van-slider>
          <span>大</span>
        </span>
      </div>
    </div>
  </van-action-sheet>
</template>

<script setup>
import {Toast, ActionSheet, Slider, Switch} from 'vant';
import store from "@/store/index"
import {ref, computed} from "vue";
import fontSize from "@/utils/fontSize";
import dark from "@/utils/dark";
// 引入字体设置模块
let {fontValue, changeSize, fontType} = fontSize()
// 引入暗黑模块
let {setDark} = dark()
// 动作菜单默认状态
const show = ref(false)
// 动作菜单点击取消
const onCancel = () => {
  console.log("取消")
}
// 父组件点击动作菜单调用
const showAction = () => {
  show.value = true
};
// 是否开启深色模式
const isDark = computed(() => store.state.dark)
// 点击切换深色浅色按钮
const changePattern = (value) => {
  setDark(value)
  if (value) {
    Toast('已开启深色模式')
  } else {
    Toast('已关闭深色模式')
  }
}
defineExpose({
  showAction
})
</script>

<style lang="scss" scoped>
@import "src/assets/style/index";

.content {
  padding: 0.533rem;

  .dark {
    display: flex;
    align-items: center;
    margin-bottom: 0.8rem;

    span:nth-child(1) {
      font-size: 0.427rem;
      width: 2.133rem;
    }
  }

  .font-setting {

    .slider {
      display: flex;
      align-items: center;

      span:nth-child(1) {
        font-size: 0.427rem;
        width: 2.667rem;
      }

      span:nth-child(2) {
        font-size: 0.373rem;
      }

      span:nth-child(3) {
        font-size: 0.373rem;
      }
    }
  }
}

.van-slider {
  width: 75%;
  margin: 0 0.533rem;
}

.custom-button {
  width: 1.067rem;
  height: 0.667rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.373rem;
  line-height: 0.48rem;
  background-color: #3498db;
  border-radius: 0.4rem;
}

.van-switch {
  background-image: url("/src/assets/images/dark-btn.png");
  background-size: 1.6rem 0.8rem;
}
</style>
