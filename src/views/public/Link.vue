<template>
  <div>
    <NavBar></NavBar>
    <LinkContent :title="recommend.title" :linkList="recommend.list"></LinkContent>
    <LinkContent :title="link.title" :linkList="link.list"></LinkContent>
    <Tabbar></Tabbar>
  </div>
</template>

<script>
import NavBar from "@/components/common/NavBar";
import Tabbar from '@/components/common/Tabbar'
import LinkContent from "@/components/link/LinkContent";
import {reactive} from "vue";

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
          list: [
            {
              logo: 'https://cdn.cuiliangblog.cn/media/link/2020_10_26_13_06_46_083869.jpg',
              name: 'Django',
              describe: 'Django 是一个开放源代码的 Web 应用框架，由 Python 写成。'
            },
            {
              logo: 'https://cdn.cuiliangblog.cn/media/link/2020_10_26_13_08_54_694653.jpg',
              name: 'jQuery',
              describe: 'jQuery 是一个 JavaScript 库。 jQuery 极大地简化了 JavaScript 编程。'
            },
            {
              logo: 'https://cdn.cuiliangblog.cn/media/link/2020_10_26_13_06_46_083869.jpg',
              name: 'Django',
              describe: 'Django 是一个开放源代码的 Web 应用框架，由 Python 写成。'
            },
            {
              logo: 'https://cdn.cuiliangblog.cn/media/link/2020_10_26_13_08_54_694653.jpg',
              name: 'jQuery',
              describe: 'jQuery 是一个 JavaScript 库。 jQuery 极大地简化了 JavaScript 编程。'
            }]
        })
    const link = reactive(
        {
          title: '⚓ 友情链接',
          list: [
            {
              logo: 'https://cdn.cuiliangblog.cn/media/link/2020_10_26_13_06_46_083869.jpg',
              name: 'Django',
              describe: 'Django 是一个开放源代码的 Web 应用框架，由 Python 写成。'
            },
            {
              logo: 'https://cdn.cuiliangblog.cn/media/link/2020_10_26_13_08_54_694653.jpg',
              name: 'jQuery',
              describe: 'jQuery 是一个 JavaScript 库。 jQuery 极大地简化了 JavaScript 编程。'
            },
            {
              logo: 'https://cdn.cuiliangblog.cn/media/link/2020_10_26_13_06_46_083869.jpg',
              name: 'Django',
              describe: 'Django 是一个开放源代码的 Web 应用框架，由 Python 写成。'
            },
            {
              logo: 'https://cdn.cuiliangblog.cn/media/link/2020_10_26_13_08_54_694653.jpg',
              name: 'jQuery',
              describe: 'jQuery 是一个 JavaScript 库。 jQuery 极大地简化了 JavaScript 编程。'
            }]
        })
    return {
      recommend,
      link
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/style/variable";

.message {
}
</style>
