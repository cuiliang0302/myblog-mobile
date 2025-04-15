<!--笔记目录-->
<template>
  <div v-title="title+'-笔记目录'">
    <NavBar></NavBar>
    <van-tabs v-model:active="activeTab" color="#409EFF" animated swipeable>
      <van-tab title="目录">
        <van-loading v-show="load" size="0.8rem" text-color="#409EFF" vertical>
          玩命加载中...
        </van-loading>
        <van-collapse v-model="activeNames">
          <van-collapse-item v-for="(chapter,index) in catalogList" :key="index"
                             :title="'第'+(index+1)+'章：'+chapter.name"
                             :name="chapter.id">
            <van-cell v-for="(title,index) in chapter.child" :key="index" :title="title.name"
                      @click="router.push({path:`/detail/section/${title.section_id}`})">
              <template #icon>
                <span class="number">{{ index + 1 }}.</span>
              </template>
            </van-cell>
          </van-collapse-item>
        </van-collapse>
      </van-tab>
      <van-tab title="书签">
        <van-empty v-if="collectList.length===0" description="暂无收藏记录"/>
        <van-cell-group v-else>
          <van-cell v-for="(item,index) in collectList" :key="index" :title=item.name is-link
                    @click="toDetail(item.id)"/>
        </van-cell-group>
      </van-tab>
    </van-tabs>
    <Tabbar :activeBar="2"></Tabbar>
  </div>
</template>

<script setup>
import NavBar from "@/components/common/NavBar.vue";
import Tabbar from "@/components/common/Tabbar.vue";
import {onMounted, ref} from "vue";
import Blog from "@/api/blog";
import record from "@/api/record";
import {useRouter} from "vue-router";
import {useUserStore} from "@/store";
import {showFailToast} from "vant";
const user = useUserStore();
const router = useRouter();
// 笔记名称
const title = ref()
// 当前tabbar
const active = 2
// 加载动画
const load = ref(true)
// 目录/书签tab默认值
const activeTab = ref(0);
// 展开的一级目录
const activeNames = ref([]);
// 笔记目录列表
const catalogList = ref([])
// 笔记收藏数据
const collectList = ref([])
// 跳转至笔记详情页
const toDetail = (detailId) => {
  router.push({path: `/detail/section/${detailId}`})
}

// 获取笔记收藏数据
const sectionCollectData = async () => {
  if (user.isLoggedIn === true) {
    try {
      const response = await record.getSectionHistory(NaN, user.user_id)
      console.log(response)
      let collect_data = []
      for (let index in response) {
        if (response[index]['is_collect'] === true) {
          collect_data.push(response[index])
        }
      }
      collectList.value = collect_data.map((item) => {
        return {
          id: item['section_id'],
          name: item['section'],
          time: item['time']
        }
      })
    } catch (error) {
      showFailToast("获取笔记收藏数据失败！")
    }
  } else {
    collectList.value = []
  }
}

// 获取笔记名称
const titleData = async (catalogueID) => {
  try{
    const response = await Blog.getNoteDetail(catalogueID)
    console.log(response)
    title.value = response.name
  }catch (error) {
    showFailToast("获取笔记名称失败!")
  }
}

// 获取笔记目录数据
const catalogueData = async (catalogueID) => {
  try {
    const response = await Blog.getCatalogueList(catalogueID)
    console.log(response)
    catalogList.value = response
  }catch (error) {
    showFailToast("获取笔记目录数据失败！")
  }
}

onMounted( () => {
  const catalogueID = router.currentRoute.value.params.id
  titleData(catalogueID)
  catalogueData(catalogueID)
  sectionCollectData()
  load.value = false
})

</script>

<style scoped lang="less">

.number {
  margin-right: 15px;
  color: var(--font_color2);
  //@include font_color('font_color2');
}

.van-collapse {
  background-color: var(--background_color3);
  //@include background_color('background_color3')
}
</style>
