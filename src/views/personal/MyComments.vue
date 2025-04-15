<!--我的评论-->
<template>
  <div class="comment">
    <PersonalNavBar :title="'我的评论'"></PersonalNavBar>
    <van-tabs v-model:active="active" color="#409EFF" animated swipeable @click-tab="onClick">
      <van-tab title="文章">
        <van-empty v-if="commentList.length===0" description="暂无收藏记录"/>
        <TimeLine v-else :list="commentList" @toDetail="toDetail"></TimeLine>
      </van-tab>
      <van-tab title="笔记">
        <van-empty v-if="commentList.length===0" description="暂无收藏记录"/>
        <TimeLine v-else :list="commentList" @toDetail="toDetail"></TimeLine>
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
import {useThemeStore, useUserStore} from '@/store';
import record from "@/api/record";
import {showFailToast} from "vant";

const user = useUserStore();
const router = useRouter()
const active = ref(0);
// 文章收藏记录
const commentList = ref([])

// 获取文章评论记录
const getArticleHistoryData = async () => {
  try {
    const articleComment_data = await record.getUserArticleComment(user.user_id)
    console.log(articleComment_data)
    commentList.value = articleComment_data.map((item) => {
      return {
        id: item['article_id'],
        name: item['article'],
        time: item['time'],
        content: item['content']
      }
    })
  } catch (err) {
    console.log(err)
    showFailToast("获取文章评论记录失败")
  }
}

// 获取笔记评论记录
const getSectionHistoryData = async () => {
  try {
    const commentHistory_data = await record.getUserSectionComment(user.user_id)
    console.log(commentHistory_data)
    commentList.value = commentHistory_data.map((item) => {
      return {
        id: item['section_id'],
        name: item['section'],
        time: item['time'],
        content: item['content']
      }
    })
  } catch (err) {
    console.log(err)
    showFailToast("获取笔记评论记录失败")
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
