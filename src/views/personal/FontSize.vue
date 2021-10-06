<!--字体设置-->
<template>
  <div>
    <PersonalNavBar :title="'字体设置'"></PersonalNavBar>
    <div class="font">
      <div class="preview" id="setFont" style="font-size: 37px">
        <h1>拖动下面的滑块，可实现预览字体大小的变化</h1>
        <p>你可以根据阅读习惯，拖动下面的滑块，设置字体大小。设置后会改变文章详情页、笔记详情页的字体大小，注销登录后恢复默认值。</p>
        <p>如果在使用过程中存在问题或意见，欢迎反馈。</p>
      </div>
      <div class="slider">
        <div class="slider-scale">
        <span v-for="(item,index) in fontShow" :key="index"
              :class="{'active': index===fontValue/25}">
          {{ item }}
        </span>
        </div>
        <van-slider v-model="fontValue" :step="25" @change="changeSize"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import PersonalNavBar from "@/components/personal/PersonalNavBar.vue";
import {Slider, Toast} from 'vant';
import {onMounted,watch} from "vue";
import fontSize from "@/utils/fontSize";

    // 引入字体设置模块
    let {fontShow, fontValue, changeSize, rootSize, fontType} = fontSize()
    onMounted(() => {
      const html = document.querySelector('#setFont')
      html.style.fontSize = rootSize.value + 'px'
    })
    watch(rootSize, (newSize) => {
      const html = document.querySelector('#setFont')
      html.style.fontSize = newSize + 'px'
    });

</script>

<style lang="scss">
@import "src/assets/style/index";

.font {
  padding: 0 0.267rem;

  .preview {
    height: 80vh;

    h1 {
      font-size: 1.5em;
      padding: 0.533rem 0;
      margin: 0;
    }

    p {
      font-size: 1em;
      line-height: 1.5em;
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
