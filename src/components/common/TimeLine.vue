<template>
  <div class="timeline">
    <ul>
      <li v-for="(item,index) in list" :key="index">
        <div class="time">
          <span>{{ timeFull(item.time) }}</span><br>
        </div>
        <div class="icon"></div>
        <div class="label">
          <p @click="toDetail(item.id)">
            {{ item.content }}
            <br v-show="item.content">
            <span><van-tag round type="primary" size="medium" plain>{{ item.name }}</van-tag></span>
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import {Tag} from 'vant';
import timeFormat from "@/utils/timeFormat";


const props = defineProps({
  // 时间线内容列表
  list: {
    type: Array,
    required: true,
    default: []
  }
})
const emit = defineEmits(['toDetail'])
// 日期格式化
let {timeFull} = timeFormat()
const toDetail = (detailId) => {
  console.log(detailId)
  emit('toDetail', detailId)
}
</script>

<style scoped lang="scss">
@import "src/assets/style/index";

.timeline {
  padding: 10px 20px;
  @include background_color('background_color2');

  ul {
    position: relative;

    li {
      position: relative;

      .time {
        display: block;
        width: 25%;
        padding-right: 100px;
        position: absolute;
        text-align: center;

        span:first-child {
          font-size: 16px;
          color: gray;
        }

        span:last-child {
          font-size: 20px;
          color: $color-primary;
          line-height: 30px;
        }
      }

      .icon {
        width: 8px;
        height: 8px;
        position: absolute;
        color: #fff;
        background: white;
        border-radius: 50%;
        box-shadow: 0 0 0 2px $color-primary;
        text-align: center;
        left: 35%;
        top: 3%;
        margin: 0 0 0 -25px;
      }

      .label {
        margin: 0 0 30px 35%;
        @include background_color('background_color3');
        @include font_color('font_color1');
        padding: 10px;
        font-weight: 300;
        line-height: 1.4;
        position: relative;
        border-radius: 5px;

        p {
          margin: 0;
          font-size: 14px;

          span:first-child {
            font-weight: 400;
          }

          span:last-child {
            font-weight: 700;
          }
        }
      }

      .label::after {
        right: 100%;
        border: solid transparent;
        content: " ";
        height: 0;
        width: 0;
        position: absolute;
        pointer-events: none;
        @include label_after('background_color3');
        border-width: 10px;
        top: 4px;
      }
    }
  }

  ul::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    width: 2px;
    background: $color-primary;
    left: 31.25%;
    margin-left: -10px;
  }
}
</style>
