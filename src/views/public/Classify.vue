<template>
  <div>
    <NavBar></NavBar>
    <section>
      <div class="sidebar">
        <van-sidebar v-model="sidebarActive" @change="onChange">
          <van-sidebar-item v-for="(item,index) in classifyList"
                            :key="index"
                            :title="formatMonth(item.month)+'('+item.count+')篇'"/>
        </van-sidebar>
      </div>
      <div class="timeline">
        <van-steps direction="vertical" :active="0">
          <van-step v-for="(item,index) in articleList" :key="index">
            <h3>《{{ item.title }}》</h3>
            <p>{{ timeDate(item.created_time) }}</p>
          </van-step>
        </van-steps>
      </div>
    </section>
    <Tabbar></Tabbar>
  </div>

</template>

<script>

import NavBar from "@/components/common/NavBar";
import Tabbar from '@/components/common/Tabbar'
import {Step, Steps, Sidebar, SidebarItem, Toast} from 'vant';
import {onMounted, ref} from "vue";
import Search from "@/views/public/Search";
import {getClassify, getClassifyArticle} from "@/api/blog";
import timeFormat from "@/utils/timeFormat";

export default {
  name: 'Classify',
  components: {
    Search,
    [Step.name]: Step,
    [Steps.name]: Steps,
    [Sidebar.name]: Sidebar,
    [SidebarItem.name]: SidebarItem,
    Toast,
    NavBar,
    Tabbar,
  },
  setup() {
    const sidebarActive = ref(0);
    //侧边月份列表
    const classifyList = ref([])
    // 文章日期只保留天
    let {timeDate} = timeFormat()
    // 指定月份文章列表
    const articleList = ref([])
    // 侧边栏点击切换事件
    const onChange = (index) => {
      console.log(classifyList.value[index].month)
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
    onMounted(async () => {
      await classifyData()
      await classifyArticleData(classifyList.value[0].month)
    })
    return {sidebarActive, classifyList, articleList, formatMonth, onChange, timeDate};
  }
}
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
