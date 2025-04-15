<!--搜索输入框-->
<template>
  <van-search v-model="key" ref="refInput" shape="round" :placeholder="placeholder"
              @click-input="clickSearchInput"/>
</template>

<script setup>
import {onMounted, onUnmounted, ref, watch} from "vue";
import record from "@/api/record";
import {showFailToast} from "vant";
import {useRouter} from "vue-router";

const router = useRouter()

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
// 提示词
const placeholder = ref('搜一搜，发现更大的世界');
// 搜索栏dom对象
const refInput = ref(null)
// 搜索热词
const search_hot = ref([])
const searchHotData = async () => {
  try {
    // console.log(response);
    search_hot.value = await record.getSearchHot();
  } catch (error) {
    showFailToast(error.response.data.message);
  }
}
const clickSearchInput = () => {
  console.log("click");
  clearInterval(placeholder_intervalId);
  console.log(placeholder.value)
  router.push('/search');
}
let placeholder_index = 0;
let placeholder_intervalId = null;
onMounted(() => {
  searchHotData()
  placeholder_intervalId = setInterval(() => {
    placeholder_index = (placeholder_index + 1) % search_hot.value.length;
    placeholder.value = search_hot.value[placeholder_index];
    // console.log(placeholder.value);
  }, 2500);
  // 搜索栏自动聚焦
  // if (props.focus) {
  //   refInput.value.focus()
  // }
})
onUnmounted(() => {
  clearInterval(placeholder_intervalId);
});
// 监听搜索关键词变化
watch(key, (newProps) => {
  emit('keyChange', newProps)
});
</script>

<style scoped>

</style>
