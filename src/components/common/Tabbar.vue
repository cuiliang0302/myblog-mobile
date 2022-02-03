<template>
  <van-tabbar v-model="activeIndex" placeholder safe-area-inset-bottom>
    <van-tabbar-item to="/">
      <span>首页</span>
      <template #icon="props">
        <MyIcon v-if="props.active" class="icon" type="icon-home-solid"/>
        <MyIcon v-else class="icon" type="icon-home"/>
      </template>
    </van-tabbar-item>
    <van-tabbar-item to="/category/1">
      <span>文章</span>
      <template #icon="props">
        <MyIcon v-if="props.active" class="icon" type="icon-article-solid"/>
        <MyIcon v-else class="icon" type="icon-article"/>
      </template>
    </van-tabbar-item>
    <van-tabbar-item to="/note">
      <span>笔记</span>
      <template #icon="props">
        <MyIcon v-if="props.active" class="icon" type="icon-note-solid"/>
        <MyIcon v-else class="icon" type="icon-note"/>
      </template>
    </van-tabbar-item>
    <van-tabbar-item to="/personal/myIndex">
      <span>我的</span>
      <template #icon="props">
        <MyIcon v-if="props.active" class="icon" type="icon-my-solid"/>
        <MyIcon v-else class="icon" type="icon-my"/>
      </template>
    </van-tabbar-item>
  </van-tabbar>
</template>

<script setup>
import {Tabbar, TabbarItem} from 'vant';
import {onMounted, ref} from 'vue';
import icon from '@/utils/icon'

let {MyIcon} = icon()
const props = defineProps({
  // 当前激活的导航栏id
  activeBar: {
    type: Number,
    required: false,
    default: 0
  }
})

const active = ref(0)
const activeIndex = ref()
onMounted(()=>{
  activeIndex.value = props.activeBar
})
</script>

<style lang="scss" scoped>
.van-tabbar-item {
  .icon {
    font-size: 0.533rem;
  }
}
</style>
