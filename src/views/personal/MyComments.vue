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
import {Tab, Tabs, Toast, Empty} from 'vant';
import {onMounted,  ref} from "vue";
import user from "@/utils/user";
import {useRouter} from "vue-router";
import {getUserArticleComment, getUserSectionComment} from "@/api/record";


    // 引入用户信息模块
    let {userId, isLogin} = user();
    const router = useRouter()
    const active = ref(0);
    // 文章收藏记录
    const commentList = ref([])

    // 获取文章评论记录
    async function getArticleHistoryData() {
      let articleComment_data = await getUserArticleComment(userId.value)
      console.log(articleComment_data)
      commentList.value = articleComment_data.map((item) => {
        return {
          id: item['article_id'],
          name: item['article'],
          time: item['time'],
          content:item['content']
        }
      })
    }

    // 获取笔记评论记录
    async function getSectionHistoryData() {
      let commentHistory_data = await getUserSectionComment(userId.value)
      console.log(commentHistory_data)
      commentList.value = commentHistory_data.map((item) => {
        return {
          id: item['section_id'],
          name: item['section'],
          time: item['time'],
          content:item['content']
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
