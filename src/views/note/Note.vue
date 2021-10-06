<template>
  <div>
    <NavBar></NavBar>
    <van-grid :column-num="2" square :gutter="5" clickable>
      <van-grid-item v-for="(item,index) in noteList" :key="index" @click="$router.push({path: `/catalog/${item.id}`})">
        <van-image :src="item.cover">
          <template v-slot:loading>
            <van-loading type="spinner" size="20"/>
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
import {Grid, GridItem, Image as VanImage, Loading} from 'vant';
import {onMounted, ref} from "vue";
import {getNote} from "@/api/blog";

const noteList = ref([])

// 获取笔记列表数据
async function noteData() {
  const article_data = await getNote()
  console.log(article_data)
  noteList.value = article_data
}

onMounted(() => {
  noteData()
})

</script>

<style lang="scss" scoped>
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
