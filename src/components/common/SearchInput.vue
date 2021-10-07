<!--搜索输入框-->
<template>
  <van-search v-model="key" ref="refInput" input-align="center" shape="round" placeholder="搜一搜 世界大不同"
              @click="$router.push('/search')"/>
</template>

<script setup>
import {Search} from 'vant';
import {onMounted, ref, watch} from "vue";

const props = defineProps({
  // 搜索栏是否自动聚焦
  focus: {
    type: Boolean,
    required: false,
    default: false
  },
})
const emit = defineEmits(['keyChange'])

// 搜索关键词
const key = ref('');
// 搜索栏dom对象
const refInput = ref(null)
onMounted(() => {
  // 搜索栏自动聚焦
  if (props.focus) {
    refInput.value.focus()
  }
})
// 监听搜索关键词变化
watch(key, (newProps) => {
  emit('keyChange', newProps)
});
</script>

<style scoped>

</style>
