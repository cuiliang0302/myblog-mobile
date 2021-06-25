<!--字体设置-->
<template>
  <div>
    <NavBar :title="'字体设置'"></NavBar>
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
import {computed, onMounted, ref} from "vue";

export default {
  components: {
    NavBar,
    [Slider.name]: Slider
  },
  name: "FontSize",
  setup() {
    // 字体大小值
    const fontSize = computed(() => store.state.font.fontSize)
    // rem根字体大小
    const rootSize = computed(() => store.state.font.rootSize)
    // 字体大小选项
    const sizeArray = ref([])
    // 字体显示种类
    const fontShow = ['超小', '小号', '默认', '大号', '超大']
    // 设置滑块字体大小
    const changeSize = (fontSize) => {
      const html = document.querySelector('html')
      let fontType = ''
      let RootSize = 0
      switch (fontSize) {
        case 0:
          Toast('当前字体尺寸：超小号')
          fontType = '超小'
          html.style.fontSize = sizeArray.value[0] + 'px'
          RootSize = sizeArray.value[0]
          break;
        case 25:
          Toast('当前字体尺寸：小号')
          fontType = '小号'
          html.style.fontSize = sizeArray.value[1] + 'px'
          RootSize = sizeArray.value[1]
          break;
        case 50:
          Toast('当前字体尺寸：默认')
          fontType = '默认'
          html.style.fontSize = sizeArray.value[2] + 'px'
          RootSize = sizeArray.value[2]
          break;
        case 75:
          Toast('当前字体尺寸：大号')
          fontType = '大号'
          html.style.fontSize = sizeArray.value[3] + 'px'
          RootSize = sizeArray.value[3]
          break;
        case 100:
          Toast('当前字体尺寸：超大号')
          fontType = '超大'
          html.style.fontSize = sizeArray.value[4] + 'px'
          RootSize = sizeArray.value[4]
          break;
        default:
          Toast('当前字体尺寸：默认')
          fontType = '默认'
      }
      store.commit('setFontSize', fontSize)
      store.commit('setFontType', fontType)
      store.commit('setRootSize', RootSize)
    }
    onMounted(() => {
      console.log(rootSize.value)
      const html = document.querySelector('html')
      let rootDefault = parseInt(html.style.fontSize.substring(2, -3))
      sizeArray.value.push(rootDefault - 10)
      sizeArray.value.push(rootDefault - 5)
      sizeArray.value.push(rootDefault)
      sizeArray.value.push(rootDefault + 5)
      sizeArray.value.push(rootDefault + 10)
      if (rootSize.value === 0) {
        // 未设置默认值
        store.commit('setRootSize', rootDefault)
      } else {
        // 调整字体大小
        html.style.fontSize = rootSize.value + 'px'
      }
    })
    return {
      fontSize,
      changeSize,
      fontShow,
      sizeArray,
      rootSize
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
      font-size: 0.427rem;
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
