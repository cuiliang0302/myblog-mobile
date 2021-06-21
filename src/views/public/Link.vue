<template>
  <div>
    <NavBar></NavBar>
        <LinkContent :title="recommend.title" :linkList="recommend.link_list"></LinkContent>
        <LinkContent :title="link.title" :linkList="link.link_list"></LinkContent>
    <Tabbar></Tabbar>
  </div>
</template>

<script>
import NavBar from "@/components/common/NavBar";
import Tabbar from '@/components/common/Tabbar'
import LinkContent from "@/components/link/LinkContent";
import {onMounted, reactive, ref} from "vue";
import {getLink} from "@/api/management";

export default {
  components: {
    NavBar,
    Tabbar,
    LinkContent
  },
  name: "Link",
  setup() {
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
    async function linkData() {
      let link_data = await getLink()
      for (let i in link_data) {
        if (link_data[i].type === "2") {
          recommend.link_list.push(link_data[i])
        }else {
          link.link_list.push(link_data[i])
        }
      }
    }

    onMounted(() => {
      linkData()
    })
    return {
      recommend,
      link
    }
  }
}
</script>

<style scoped lang="scss">
@import "~@/assets/style/variable";

.message {
}
</style>
