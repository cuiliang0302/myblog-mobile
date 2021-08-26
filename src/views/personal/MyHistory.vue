<!--我的浏览记录-->
<template>
  <div class="collect">
    <NavBar :title="'浏览记录'"></NavBar>
    <van-tabs v-model:active="active" color="#409EFF" animated swipeable @click="onClick">
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

<script>
import TimeLine from "@/components/common/TimeLine";
import NavBar from "@/components/personal/NavBar";
import {Tab, Tabs, Toast, Empty} from 'vant';
import {onMounted, reactive, ref} from "vue";
import {getArticleHistory, getSectionHistory} from "@/api/record";
import user from "@/utils/user";
import {useRouter} from "vue-router";

export default {
  components: {
    NavBar,
    TimeLine,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Empty.name]: Empty,
    Toast
  },
  name: "MyHistory",
  setup() {
    // 引入用户信息模块
    let {userId, isLogin} = user();
    const router = useRouter()
    const active = ref(0);
    // 文章浏览记录
    const historyList = ref([])

    // 获取文章浏览记录
    async function getArticleHistoryData() {
      let articleHistory_data = await getArticleHistory(NaN, userId.value)
      console.log(articleHistory_data)
      historyList.value = articleHistory_data.map((item) => {
        return {
          id: item['article_id'],
          name: item['article'],
          time: item['time']
        }
      })
    }

    // 获取笔记浏览记录
    async function getSectionHistoryData() {
      let articleHistory_data = await getSectionHistory(NaN, userId.value)
      console.log(articleHistory_data)
      historyList.value = articleHistory_data.map((item) => {
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
    return {
      historyList,
      active,
      onClick,
      toDetail
    }
  }
}
</script>

<style scoped>

</style>
