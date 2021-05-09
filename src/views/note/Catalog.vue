<!--笔记目录-->
<template>
  <div>
    <NavBar></NavBar>
    <van-tabs v-model:active="active" color="#409EFF" animated swipeable>
      <van-tab title="目录">
        <van-collapse v-model="activeNames">
          <van-collapse-item v-for="(chapter,index) in catalogData" :key="index"
                             :title="'第'+(index+1)+'章：'+chapter.name"
                             :name="chapter.id">
            <van-cell v-for="(title,index) in chapter.child" :key="index" :title="title.name"
                      @click="$router.push({path:'/detail',query:{component:'note'}})">
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
import {reactive, ref} from "vue";

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
    const active = ref(0);
    const activeNames = ref([]);
    const catalogData = ref([
      {
        id: '1', name: 'kubernetes系统基础', child: [
          {id: '2', name: '容器技术概述'},
          {id: '3', name: 'kubernetes概述'},
          {id: '4', name: 'kubernetes集群组件'},
          {id: '5', name: 'kubernetes网络概述'},
          {id: '2', name: '容器技术概述'},
          {id: '3', name: 'kubernetes概述'},
          {id: '4', name: 'kubernetes集群组件'},
          {id: '5', name: 'kubernetes网络概述'},
          {id: '2', name: '容器技术概述'},
          {id: '3', name: 'kubernetes概述'},
          {id: '4', name: 'kubernetes集群组件'},
          {id: '5', name: 'kubernetes网络概述'},
        ]
      },
      {
        id: '6', name: 'kubernetes快速入门', child: [
          {id: '7', name: 'k8s核心对象'},
          {id: '8', name: '部署k8s集群'},
          {id: '9', name: 'k8s使用基础'},
        ]
      },
      {
        id: '10', name: 'kubernetes系统基础', child: [
          {id: '12', name: '容器技术概述'},
          {id: '13', name: 'kubernetes概述'},
          {id: '14', name: 'kubernetes集群组件'},
          {id: '15', name: 'kubernetes网络概述'},
        ]
      },
      {
        id: '16', name: 'kubernetes快速入门', child: [
          {id: '17', name: 'k8s核心对象'},
          {id: '18', name: '部署k8s集群'},
          {id: '19', name: 'k8s使用基础'},
        ]
      },
      {
        id: '21', name: 'kubernetes系统基础', child: [
          {id: '22', name: '容器技术概述'},
          {id: '23', name: 'kubernetes概述'},
          {id: '24', name: 'kubernetes集群组件'},
          {id: '25', name: 'kubernetes网络概述'},
        ]
      },
      {
        id: '26', name: 'kubernetes快速入门', child: [
          {id: '27', name: 'k8s核心对象'},
          {id: '28', name: '部署k8s集群'},
          {id: '29', name: 'k8s使用基础'},
        ]
      },
      {
        id: '31', name: 'kubernetes系统基础', child: [
          {id: '32', name: '容器技术概述'},
          {id: '33', name: 'kubernetes概述'},
          {id: '34', name: 'kubernetes集群组件'},
          {id: '35', name: 'kubernetes网络概述'},
        ]
      },
      {
        id: '36', name: 'kubernetes快速入门', child: [
          {id: '37', name: 'k8s核心对象'},
          {id: '38', name: '部署k8s集群'},
          {id: '39', name: 'k8s使用基础'},
        ]
      },
      {
        id: '41', name: 'kubernetes系统基础', child: [
          {id: '42', name: '容器技术概述'},
          {id: '43', name: 'kubernetes概述'},
          {id: '44', name: 'kubernetes集群组件'},
          {id: '45', name: 'kubernetes网络概述'},
        ]
      },
      {
        id: '46', name: 'kubernetes快速入门', child: [
          {id: '47', name: 'k8s核心对象'},
          {id: '48', name: '部署k8s集群'},
          {id: '49', name: 'k8s使用基础'},
        ]
      }, {
        id: '51', name: 'kubernetes系统基础', child: [
          {id: '52', name: '容器技术概述'},
          {id: '53', name: 'kubernetes概述'},
          {id: '54', name: 'kubernetes集群组件'},
          {id: '55', name: 'kubernetes网络概述'},
        ]
      },
      {
        id: '56', name: 'kubernetes快速入门', child: [
          {id: '57', name: 'k8s核心对象'},
          {id: '58', name: '部署k8s集群'},
          {id: '59', name: 'k8s使用基础'},
        ]
      },
    ])
    return {active, catalogData, activeNames};
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
