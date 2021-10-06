<template>
  <div>
    <NavBar></NavBar>
    <section>
      <div class="sidebar">
        <van-sidebar v-model="sidebarActive" @change="onChange">
          <van-sidebar-item v-for="(item,index) in classifyList"
                            :key="index"
                            :title="formatMonth(item.month)+'('+item.count+')篇'"
          />
        </van-sidebar>
      </div>
      <div class="timeline">
        <van-steps direction="vertical" :active="0">
          <van-step v-for="(item,index) in articleList" :key="index" @click="toDetail(item.id)">
            <h3>《{{ item.title }}》</h3>
            <p>{{ timeFull(item.created_time) }}</p>
          </van-step>
        </van-steps>
      </div>
    </section>
    <Tabbar></Tabbar>
  </div>

</template>

<script setup>

import NavBar from "@/components/common/NavBar.vue";
import Tabbar from '@/components/common/Tabbar.vue'
import {Step, Steps, Sidebar, SidebarItem, Toast} from 'vant';
import {onMounted, ref} from "vue";
import Search from "@/views/public/Search.vue";
import {getClassify, getClassifyArticle} from "@/api/blog";
import timeFormat from "@/utils/timeFormat";
import {useRouter} from "vue-router";


const router = useRouter()
const sidebarActive = ref(0);
//侧边月份列表
const classifyList = ref([])
// 文章日期只保留天
let {timeFull} = timeFormat()
// 指定月份文章列表
const articleList = ref([])
// 侧边栏点击切换事件
const onChange = (index) => {
  classifyArticleData(classifyList.value[index].month)
}

// 获取归档月份列表数据
async function classifyData() {
  classifyList.value = await getClassify()
}

// 获取最近月份文章列表
async function classifyArticleData(month) {
  articleList.value = await getClassifyArticle(month)
}

// 格式化显示年月
const formatMonth = (value) => {
  return value.replace("-", "年") + '月'
}
// 跳转文章详情页
const toDetail = (id) => {
  router.push({path: `/detail/${id}`, query: {component: 'article'}})
}
onMounted(async () => {
  await classifyData()
  await classifyArticleData(classifyList.value[0].month)
})
</script>
<style lang="scss" scoped>

section {
  display: flex;

  .sidebar {
    flex: 2;

    .van-sidebar {
      width: 145px;
    }
  }

  .timeline {
    flex: 3;
  }
}

.van-sidebar {
  width: 140px;
}
</style>
