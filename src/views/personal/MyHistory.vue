<!--我的浏览记录-->
<template>
  <div class="collect">
    <PersonalNavBar :title="'浏览记录'"></PersonalNavBar>
    <van-tabs v-model:active="active" color="#409EFF" animated swipeable @click-tab="onClick">
      <van-tab title="文章">
        <van-empty v-if="historyList.length===0" description="暂无浏览记录"/>
        <TimeLine v-else :list="historyList" @toDetail="toDetail"></TimeLine>
      </van-tab>
      <van-tab title="笔记">
        <van-empty v-if="historyList.length===0" description="暂无浏览记录"/>
        <TimeLine v-else :list="historyList" @toDetail="toDetail"></TimeLine>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script setup>
import TimeLine from "@/components/common/TimeLine.vue";
import PersonalNavBar from "@/components/personal/PersonalNavBar.vue";
import {onMounted, ref} from "vue";
import {useUserStore} from '@/store';
import {useRouter} from "vue-router";
import record from "@/api/record";
import {showFailToast} from "vant";
const user = useUserStore();
const router = useRouter()
const active = ref(0);
// 文章浏览记录
const historyList = ref([])

// 获取文章浏览记录
const getArticleHistoryData = async () => {
  try {
    const articleHistory_data = await record.getArticleHistory(NaN, user.user_id)
    historyList.value = articleHistory_data.map((item) => {
      return {
        id: item['article_id'],
        name: item['article'],
        time: item['time']
      }
    })
  } catch (error) {
    console.log(error)
    showFailToast("获取文章浏览记录失败!")
  }
}

// 获取笔记浏览记录
const getSectionHistoryData = async () => {
  try {
    const articleHistory_data = await record.getSectionHistory(NaN, user.user_id)
    console.log(articleHistory_data)
    historyList.value = articleHistory_data.map((item) => {
      return {
        id: item['section_id'],
        name: item['section'],
        time: item['time']
      }
    })
  } catch (error) {
    console.log(error)
    showFailToast("获取笔记浏览记录失败")
  }
}

// tab切换事件
const onClick = () => {
  if (active.value === 0) {
    getArticleHistoryData()
  } else {
    getSectionHistoryData()
  }
}
// 子组件跳转文章详情事件
const toDetail = (detailID) => {
  console.log(detailID)
  if (active.value === 0) {
    router.push({path: `/detail/article/${detailID}`})
  } else {
    router.push({path: `/detail/section/${detailID}`})
  }
}
onMounted(() => {
  getArticleHistoryData()
})
</script>

<style scoped>

</style>
