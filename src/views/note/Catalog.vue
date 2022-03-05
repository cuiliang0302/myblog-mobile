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
                      @click="$router.push({path:`/detail/section/${title.section_id}`})">
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
import {Collapse, CollapseItem, Cell, CellGroup, Tab, Tabs, Loading, Empty} from 'vant';
import {onMounted, ref} from "vue";
import {getCatalogueList, getNoteDetail} from "@/api/blog";
import {useRouter} from "vue-router";
import {getSectionHistory} from "@/api/record";
import user from "@/utils/user";


// 引入用户信息模块
let {userId, isLogin} = user();
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
async function sectionCollectData() {
  if (isLogin.value === true) {
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
  } else {
    collectList.value = []
  }
}

// 获取笔记名称
async function titleData(catalogueID) {
  let note_data = await getNoteDetail(catalogueID)
  title.value = note_data.name
}

// 获取笔记目录数据
async function catalogueData(catalogueID) {
  catalogList.value = await getCatalogueList(catalogueID)
  console.log(catalogList.value)
}

onMounted(async () => {
  let catalogueID = router.currentRoute.value.params.id
  await titleData(catalogueID)
  await catalogueData(catalogueID)
  await sectionCollectData()
  load.value = false
})

</script>

<style scoped lang="scss">
@import "src/assets/style/index";

.number {
  margin-right: 15px;
  @include font_color('font_color2');
}

.van-collapse {
  @include background_color('background_color3')
}
</style>
