<template>
  <div>
    <NavBar></NavBar>
    <section>
      <div class="sidebar">
        <van-sidebar v-model="sidebarActive" @change="onChange">
          <van-sidebar-item v-for="(data,month) in classifyList"
                            :key="month"
                            :title="formatMonth(month)+'('+(parseInt(data.article)+parseInt(data.section))+'篇)'"
          />
        </van-sidebar>
      </div>
      <div class="timeline">
        <van-steps direction="vertical" :active="0">
          <van-step v-for="(item,index) in articleList" :key="index" @click="toDetail(item)">
            <h3 v-if="item.type==='section'">笔记《{{ item.title }}》</h3>
            <h3 v-else>文章《{{ item.title }}》</h3>
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
import {onMounted, ref, reactive} from "vue";
import timeFormat from "@/utils/timeFormat";
import {useRouter} from "vue-router";
import Blog from "@/api/blog";
import {showFailToast} from "vant";


const router = useRouter()
const sidebarActive = ref(0);
//侧边月份列表
const classifyList = reactive({})
// 文章日期只保留天
let {timeFull} = timeFormat()
// 指定月份文章列表
const articleList = ref([])
// 侧边栏点击切换事件
const onChange = (index) => {
  console.log(index)
  const keys = Object.keys(classifyList)
  console.log(keys[index])
  classifyArticleData(keys[index])
}

// 获取归档月份列表数据
const classifyData = ()=> {
  // classifyList.value = await getClassify()
  Blog.getClassify().then((response) => {
    console.log(response)
    Object.keys(response).forEach((key) => {
      classifyList[key] = response[key];
    });
  }).catch(response => {
    //发生错误时执行的代码
    console.log(response)
    showFailToast('获取归档数据失败！')
  });
}

// 获取最近月份文章列表
const classifyArticleData = async (month) => {
  try {
    articleList.value = await Blog.getClassifyArticle(month)
  } catch (e) {
    console.log(e)
    showFailToast("获取最近月份文章列表失败")
  }
}

// 格式化显示年月
const formatMonth = (value) => {
  return value.replace("-", "年") + '月'
}
// 跳转文章详情页
const toDetail = (value) => {
  if (value['type'] === 'article') {
    router.push('/detail/article/' + value['id'])
  } else {
    router.push('/detail/section/' + value['id'])
  }
}
onMounted(() => {
  classifyData()
  const date = new Date();
  const year = date.getFullYear(); // 获取年份
  const month = String(date.getMonth() + 1).padStart(2, '0')
  classifyArticleData(year + "-" + month)
})
</script>
<style lang="less" scoped>

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
