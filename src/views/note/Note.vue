<template>
  <div>
    <NavBar></NavBar>
    <van-grid :column-num="2" square :gutter="5" clickable>
      <van-grid-item v-for="(item,index) in noteList" :key="index" @click="router.push({path: `/catalog/${item.id}`})">
        <van-image :src="item.cover">
          <template v-slot:loading>
            <van-loading type="spinner" size="20" />
          </template>
        </van-image>
        <p>{{ item.name }}</p>
      </van-grid-item>
    </van-grid>
    <Tabbar :activeBar="2"></Tabbar>
  </div>
</template>

<script setup>
import NavBar from "@/components/common/NavBar.vue";
import Tabbar from '@/components/common/Tabbar.vue'
import {Image as VanImage, showFailToast} from 'vant';
import {onMounted, ref} from "vue";
import blog from "@/api/blog";
import {useRouter} from "vue-router";
const router = useRouter()
const noteList = ref([])
// 获取笔记列表数据
const noteData = async () => {
  try {
    const response = await blog.getNote()
    console.log(response)
    noteList.value = response
  } catch (error) {
    showFailToast("获取笔记列表失败")
  }
}

onMounted(() => {
  noteData()
})

</script>

<style lang="less" scoped>
.van-grid {
  p {
    font-size: 15px;
    margin: 15px 0 0 0;
  }

  p:before {
    content: '《';
  }

  p:after {
    content: '》';
  }
}
</style>
