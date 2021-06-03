<template>
  <van-action-sheet
      v-model:show="show"
      cancel-text="取消"
      close-on-click-action
      @cancel="onCancel"
  >
    <div class="content">
      <div class="dark">
        <span>显示模式</span>
        <span>
          <van-switch v-model="isDark" @change="changePattern" active-color="#bdc3c7" inactive-color="#ffffff"/>
        </span>
      </div>
      <div class="font-setting">
        <p>字体大小</p>
        <span class="slider">
          <span>小</span>
          <van-slider v-model="fontSize" :step="25" @change="changeSize">
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

<script>
import {Toast, ActionSheet, Slider, Switch} from 'vant';
import store from "@/store/index"
import {ref, computed} from "vue";
import {onBeforeRouteLeave} from "vue-router";

export default {
  components: {
    [ActionSheet.name]: ActionSheet,
    [Slider.name]: Slider,
    [Switch.name]: Switch
  },
  name: "ActionSheet",
  setup() {
    // 动作菜单默认状态
    const show = ref(false)
    // 动作菜单点击取消
    const onCancel = () => Toast('取消')
    // 父组件点击动作菜单调用
    const showAction = () => {
      show.value = true
    };
    // 是否开启深色模式
    const isDark = computed(() => store.state.dark)
    // 点击切换深色浅色按钮
    const changePattern = () => {
      store.commit('setDark')
      if (store.state.dark) {
        Toast('已切换为深色模式')
      } else {
        Toast('已切换为浅色模式')
      }
    }
    // 字体大小滑块
    const fontSize = computed(() => store.state.font.fontSize)
    // 显示的字体尺寸
    let fontType = computed(() => store.state.font.fontType)
    // 设置滑块字体大小
    const changeSize = (fontSize) => {
      let fontType = ''
      switch (fontSize) {
        case 0:
          Toast('当前字体尺寸：超小号')
          fontType = '超小'
          break;
        case 25:
          Toast('当前字体尺寸：小号')
          fontType = '小号'
          break;
        case 50:
          Toast('当前字体尺寸：默认')
          fontType = '默认'
          break;
        case 75:
          Toast('当前字体尺寸：大号')
          fontType = '大号'
          break;
        case 100:
          Toast('当前字体尺寸：超大号')
          fontType = '超大'
          break;
        default:
          Toast('当前字体尺寸：默认')
          fontType = '默认'
      }
      store.commit('setFontSize', fontSize)
      store.commit('setFontType', fontType)
    }
    // 退出前检查弹窗是否关闭
    onBeforeRouteLeave((to, from, next) => {
      if (show.value) {
        console.log('字体设置离开检查')
        show.value = false
        next(false)
      } else {
        next(true)
      }
    })
    return {show, showAction, onCancel, changePattern, isDark, fontSize, fontType, changeSize};
  },
}
</script>

<style lang="scss" scoped>
@import "src/assets/style/variable";

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
    p {
      position: absolute;
      font-size: 0.427rem;
      bottom: 1.533rem;
    }

    .slider {
      display: flex;
      margin-left: 2.133rem;
      align-items: center;

      span:nth-child(1) {
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
  background-image: url("../../../src/assets/images/dark-btn.png");
  background-size: 1.6rem 0.8rem;
}
</style>
