<template>
  <div>
    <NavBar></NavBar>
    <van-collapse v-model="activeName" accordion>
      <van-collapse-item v-for="(item,index) in about" :key="index" :title="item.title" :name="index">
        <v-md-preview :text="item.body"></v-md-preview>
      </van-collapse-item>
    </van-collapse>
    <Tabbar></Tabbar>
  </div>
</template>

<script>
import NavBar from "@/components/common/NavBar";
import Tabbar from '@/components/common/Tabbar';
import {Collapse, CollapseItem} from 'vant';
import {onMounted, ref} from "vue";
import {getAbout} from "@/api/management";
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
import '@kangc/v-md-editor/lib/theme/style/github.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import hljs from 'highlight.js';

VMdPreview.use(githubTheme, {
  Hljs: hljs,
});

export default {
  components: {
    NavBar,
    Tabbar,
    [Collapse.name]: Collapse,
    [CollapseItem.name]: CollapseItem,
    VMdPreview
  },
  name: "About",
  setup() {
    const activeName = ref(0);
    // 关于页数据
    const about = ref([])

    // 获取关于页数据
    async function aboutData() {
      about.value = await getAbout()
    }

    onMounted(() => {
      aboutData()
    })
    return {activeName, about};
  },
}
</script>

<style lang="scss">
@import "~@/assets/style/variable";

.v-md-editor-preview {
  padding: 0;

  .github-markdown-body {
    img {
      width: 100%;
    }
  }

}
</style>
