<!--我的收藏-->
<template>
  <div class="collect">
    <PersonalNavBar :title="'我的收藏'"></PersonalNavBar>
    <van-tabs v-model:active="active" color="#409EFF" animated swipeable @click-tab="onClick">
      <van-tab title="文章">
        <van-empty v-if="collectList.length===0" description="暂无收藏记录"/>
        <TimeLine v-else :list="collectList" @toDetail="toDetail"></TimeLine>
      </van-tab>
      <van-tab title="笔记">
        <van-empty v-if="collectList.length===0" description="暂无收藏记录"/>
        <TimeLine v-else :list="collectList" @toDetail="toDetail"></TimeLine>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script setup>
import TimeLine from "@/components/common/TimeLine.vue";
import PersonalNavBar from "@/components/personal/PersonalNavBar.vue";
import {Tab, Tabs, Toast, Empty} from 'vant';
import {onMounted, ref} from "vue";
import user from "@/utils/user";
import {useRouter} from "vue-router";
import {getArticleHistory, getSectionHistory} from "@/api/record";

// 引入用户信息模块
let {userId, isLogin} = user();
const router = useRouter()
const active = ref(0);
// 文章收藏记录
const collectList = ref([])

// 获取文章浏览记录
async function getArticleHistoryData() {
  let collectHistory_data = await getArticleHistory(NaN, userId.value)
  console.log(collectHistory_data)
  let collect_data = []
  for (let index in collectHistory_data) {
    if (collectHistory_data[index]['is_collect'] === true) {
      collect_data.push(collectHistory_data[index])
    }
  }
  collectList.value = collect_data.map((item) => {
    return {
      id: item['article_id'],
      name: item['article'],
      time: item['time']
    }
  })
}

// 获取笔记浏览记录
async function getSectionHistoryData() {
  let collectHistory_data = await getSectionHistory(NaN, userId.value)
  console.log(collectHistory_data)
  let collect_data = []
  for (let index in collectHistory_data) {
    if (collectHistory_data[index]['is_collect'] === true) {
      collect_data.push(collectHistory_data[index])
    }
  }
  collectList.value = collect_data.map((item) => {
    return {
      id: item['section_id'],
      name: item['section'],
      time: item['time']
    }
  })
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
