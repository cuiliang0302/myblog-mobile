<template>
  <van-cell-group title="系统与设置">
    <van-cell title="主题颜色" size="large" is-link :value="theme_name" @click="clickTheme"/>
    <van-popup v-model:show="showPicker" destroy-on-close round position="bottom">
      <van-picker
          :model-value="pickerValue"
          :columns="columns"
          @cancel="showPicker = false"
          @confirm="onConfirm"
      />
    </van-popup>
  </van-cell-group>
</template>

<script setup>
import { ref } from 'vue';
import {storeToRefs} from "pinia";
import {useThemeStore} from "@/store";
const theme = useThemeStore();
const {font_name, is_dark, theme_name, theme_color} = storeToRefs(theme)
const columns = [
  {text: '拂晓蓝(默认)', value: '#409eff'},
  {text: '薄暮红', value: '#e74c3c'},
  {text: '火山橘', value: '#e67e22'},
  {text: '日暮黄', value: '#f1c40f'},
  {text: '极光绿', value: '#16a085'},
  {text: '绝绝紫', value: '#9b59b6'},
];
const clickTheme = ()=>{
  showPicker.value = true
}
const fieldValue = ref('');
const showPicker = ref(false);
const pickerValue = ref([]);
const onConfirm = ({ selectedValues, selectedOptions }) => {
  showPicker.value = false;
  pickerValue.value = selectedValues;
  fieldValue.value = selectedOptions[0].text;
  theme.toggleTheme(selectedOptions[0].text, selectedValues[0])
};
</script>

<style lang="less" scoped>

h2 {
  font-size: 25px;
  padding-top: 15px;
  padding-bottom: 15px;
}
</style>