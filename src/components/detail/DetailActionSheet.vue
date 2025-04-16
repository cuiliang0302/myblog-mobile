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
        <span>深色模式</span>
        <span>
          <van-switch v-model="is_dark" @change="changePattern"/>
        </span>
      </div>
      <div class="theme">
        <span>主题颜色</span>
        <span>
            <van-radio-group v-model="theme_name" @change="clickTheme" direction="horizontal">
            <van-radio v-for="(item,index) in theme_list" :key=index :name="item.name" :checked-color="item.value">
              {{ item.name }}
            </van-radio>
        </van-radio-group>
        </span>
      </div>
      <div class="font-setting">
        <span class="slider">
          <span class="font-title">字体大小</span>
          <span>小</span>
          <van-slider v-model="font_value" :step="25" @change="changeSize">
          <template #button>
            <div class="custom-button">{{ font_name }}</div>
          </template>
        </van-slider>
          <span>大</span>
        </span>
      </div>
    </div>
  </van-action-sheet>
</template>

<script setup>

import {ref} from "vue";
import {useThemeStore} from '@/store';
import {storeToRefs} from 'pinia'
import {showToast} from "vant";
const theme = useThemeStore();
const {font_name, is_dark, font_value, theme_name} = storeToRefs(theme)
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
// 点击切换深色浅色按钮
const changePattern = (value) => {
  console.log(value)
  if (value) {
    showToast('已开启深色模式')
  } else {
    showToast('已关闭深色模式')
  }
}
// 主题色
const theme_list = ref([
  {name: '拂晓蓝(默认)', value: '#409eff'},
  {name: '薄暮红', value: '#e74c3c'},
  {name: '火山橘', value: '#e67e22'},
  {name: '日暮黄', value: '#f1c40f'},
  {name: '极光绿', value: '#16a085'},
  {name: '绝绝紫', value: '#9b59b6'},
])
// 切换主题色
const clickTheme = (name) => {
  const theme_item = theme_list.value.find(item => item.name === name);
  // console.log(theme_item.value)
  theme.toggleTheme(name, theme_item.value)
}
// 切换字体大小
const changeSize = (value) => {
  theme.toggleSize(value)
}
defineExpose({
  showAction
})
</script>

<style lang="less" scoped>

.content {
  padding: 0.533rem;

  .dark {
    display: flex;
    align-items: center;
    margin-bottom: 0.8rem;

    .van-switch {
      background-size: 1.6rem 0.8rem;
    }

    span:nth-child(1) {
      font-size: 0.427rem;
      width: 2.133rem;
    }
  }

  .theme {
    display: flex;
    align-items: center;
    margin-bottom: 0.8rem;

    span:nth-child(1) {
      font-size: 0.427rem;
      width: 150px;
    }

    span:nth-child(2) {
      .van-radio {
        margin: 5px
      }

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
  background-color: var(--van-primary-color);
  border-radius: 0.4rem;
}


</style>
