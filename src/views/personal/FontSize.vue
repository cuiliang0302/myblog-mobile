<!--字体设置-->
<template>
  <div>
    <PersonalNavBar :title="'字体设置'"></PersonalNavBar>
    <div class="font">
      <div class="preview" id="setFont" style="font-size: 37px">
        <h1>拖动下面的滑块，可实现预览字体大小的变化</h1>
        <p>
          你可以根据阅读习惯，拖动下面的滑块，设置字体大小。设置后会改变文章详情页、笔记详情页的字体大小，注销登录后恢复默认值。</p>
        <p>如果在使用过程中存在问题或意见，欢迎反馈。</p>
      </div>
      <div class="slider">
        <div class="slider-scale">
        <span v-for="(item,index) in fontShow" :key="index"
              :class="{'active': index===font_value/25}">
          {{ item }}
        </span>
        </div>
        <van-slider v-model="font_value" :step="25" @change="changeSize"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import PersonalNavBar from "@/components/personal/PersonalNavBar.vue";
import {useThemeStore} from "@/store";
import {storeToRefs} from "pinia";
const theme = useThemeStore();
const {font_value} = storeToRefs(theme)
// 字体显示种类
const fontShow = ['超小', '小号', '默认', '大号', '超大']
// 更换字体大小事件
const changeSize = ()=>{
  console.log(font_value);
  theme.toggleSize(font_value.value)
}
// 引入字体设置模块
// let {fontShow, fontValue, changeSize, rootSize, fontType} = fontSize()
// onMounted(() => {
//   const html = document.querySelector('#setFont')
//   html.style.fontSize = rootSize.value + 'px'
// })
// watch(rootSize, (newSize) => {
//   const html = document.querySelector('#setFont')
//   html.style.fontSize = newSize + 'px'
// });

</script>

<style lang="less">

.font {
  padding: 0 0.267rem;

  .preview {
    height: 80vh;

    h1 {
      font-size: 20px;
      padding: 0.533rem 0;
      margin: 0;
    }

    p {
      font-size: 16px;
      line-height: 1.5em;
    }
  }

  .slider {
    .active {
      color: var(--van-primary-color);
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
