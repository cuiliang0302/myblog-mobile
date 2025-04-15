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
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";
import {storeToRefs} from 'pinia'
import {useThemeStore,useUserStore} from '@/store';
import {showFailToast} from "vant";
import record from "@/api/record";
const user = useUserStore();
const router = useRouter()
const active = ref(0);
// 文章收藏记录
const collectList = ref([])

// 获取文章收藏记录
const getArticleHistoryData = async () => {
  try{
    const collectHistory_data = await record.getArticleHistory(NaN, user.user_id)
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
  }catch(e){
    console.log(e)
    showFailToast("获取文章收藏记录失败")
  }

}

// 获取笔记收藏记录
const getSectionHistoryData = async () => {
  try{
    const collectHistory_data = await record.getSectionHistory(NaN, user.user_id)
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
  }catch(e){
    console.log(e)
    showFailToast("获取笔记收藏数据失败")
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
