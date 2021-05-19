<!--笔记目录-->
<template>
  <div>
    <NavBar></NavBar>
    <van-tabs v-model:active="active" color="#409EFF" animated swipeable>
      <van-tab title="目录">
        <van-collapse v-model="activeNames">
          <van-collapse-item v-for="(chapter,index) in catalogList" :key="index"
                             :title="'第'+(index+1)+'章：'+chapter.name"
                             :name="chapter.id">
            <van-cell v-for="(title,index) in chapter.child" :key="index" :title="title.name"
                      @click="$router.push({path:`/detail/${title.section_id}`,query:{component:'note'}})">
              <template #icon>
                <span class="number">{{ index + 1 }}</span>
              </template>
            </van-cell>
          </van-collapse-item>
        </van-collapse>
      </van-tab>
      <van-tab title="书签">
        <IsNull></IsNull>
      </van-tab>
    </van-tabs>
    <Tabbar></Tabbar>
  </div>
</template>

<script>
import NavBar from "@/components/common/NavBar";
import Tabbar from "@/components/common/Tabbar";
import IsNull from "@/components/common/IsNull";
import {Collapse, CollapseItem, Cell, CellGroup, Tab, Tabs} from 'vant';
import {onMounted, reactive, ref} from "vue";
import {getCatalogue} from "@/api/note";
import {useRouter} from "vue-router";

export default {
  components: {
    NavBar,
    Tabbar,
    IsNull,
    [Collapse.name]: Collapse,
    [CollapseItem.name]: CollapseItem,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
  },
  name: "Catalog",
  setup() {
    const router = useRouter();
    // 目录/书签tab默认值
    const active = ref(0);
    // 展开的一级目录
    const activeNames = ref([]);
    // 笔记目录列表
    const catalogList = ref([])

    // 获取笔记目录数据
    async function catalogueData() {
      let catalogueID = router.currentRoute.value.params.id
      catalogList.value = await getCatalogue(catalogueID)
      console.log(catalogList.value)
    }

    onMounted(() => {
      catalogueData()
    })
    return {active, catalogList, activeNames};
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/style/variable";

.number {
  margin-right: 15px;
  color: $color-text-regular;
}
</style>
