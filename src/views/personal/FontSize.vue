<!--字体设置-->
<template>
  <div>
    <NavBar :title="title"></NavBar>
    <section>
      <div class="preview">
        <h1>拖动下面的滑块，可实现预览字体大小的变化</h1>
        <p>你可以根据阅读习惯，拖动下面的滑块，设置字体大小。设置后会改变文章详情页、笔记详情页的字体大小，注销登录后恢复默认值。</p>
        <p>如果在使用过程中存在问题或意见，欢迎反馈。</p>
      </div>
      <div class="slider">
        <div class="slider-scale">
        <span v-for="(item,index) in fontShow" :key="index"
              :class="{'active': index===fontSize/25}">
          {{ item }}
        </span>
        </div>
        <van-slider v-model="fontSize" :step="25" @change="changeSize"/>
      </div>
    </section>
  </div>
</template>

<script>
import store from "@/store/index"
import NavBar from "@/components/personal/NavBar";
import {Slider, Toast} from 'vant';
import {computed, ref} from "vue";

export default {
  components: {
    NavBar,
    [Slider.name]: Slider
  },
  name: "FontSize",
  setup() {
    const title = '字体大小设置'
    // 字体大小值
    const fontSize = computed(() => store.state.font.fontSize)
    // 字体显示种类
    const fontShow = ['超小', '小号', '默认', '大号', '超大']
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
    return {
      title,
      fontSize,
      changeSize,
      fontShow
    }
  }
}
</script>

<style lang="scss">
@import "src/assets/style/variable";

body {
  background-color: $color-background-white;
}

section {
  background-color: $color-background-white;
  padding: 0 0.267rem;

  .preview {
    height: 80vh;

    p {
      font-size: 0.373rem;
      line-height: 0.64rem;
    }
  }

  .slider {
    .active {
      color: $color-primary;
      font-weight: bold;
    }

    .slider-scale {
      display: flex;
      text-align: center;
      padding-bottom: 0.4rem;

      span {
        flex: 1;
        font-size: 0.373rem;
      }
    }
  }
}

.van-slider {
  width: 80%;
  margin: 0 auto;
}
</style>
