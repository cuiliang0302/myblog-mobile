<template>
  <div>
    <NavBar></NavBar>
    <LinkContent :title="recommend.title" :linkList="recommend.link_list"></LinkContent>
    <LinkContent :title="link.title" :linkList="link.link_list"></LinkContent>
    <Tabbar></Tabbar>
  </div>
</template>

<script setup>
import NavBar from "@/components/common/NavBar.vue";
import Tabbar from '@/components/common/Tabbar.vue'
import LinkContent from "@/components/link/LinkContent.vue";
import {onMounted, reactive, ref} from "vue";
import Management from "@/api/management";
import {showFailToast} from "vant";

const recommend = reactive(
    {
      title: '🔥 强烈推荐',
      link_list: []
    })
const link = reactive(
    {
      title: '⚓ 友情链接',
      link_list: []
    })

// 获取友情链接数据
const linkData = async ()=> {
  try{
    const link_data = await Management.getLink()
    for (let i in link_data) {
      if (link_data[i].type === "2") {
        recommend.link_list.push(link_data[i])
      } else {
        link.link_list.push(link_data[i])
      }
    }
  }catch(err){
    console.log(err)
    showFailToast("获取友情链接数据失败")
  }
}

onMounted(() => {
  linkData()
})
</script>

<style scoped lang="less">
//@import "src/assets/style/index.scss";

//.message {
//}
</style>
