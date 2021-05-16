<template>
  <div class="main">
    <div class="body">
      <v-md-preview :text="text"></v-md-preview>
    </div>
  </div>
</template>
<script>
import {onMounted, ref} from "vue";
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';
import python from 'highlight.js/lib/languages/python';
VMdPreview.use(githubTheme, {
  codeHighlightExtensionMap: {
    vue: 'xml',
  },
  extend(md, hljs) {
    hljs.registerLanguage('python', python);
  },
});
import {getArticleDetail} from "@/api/public";
export default {
  components: {
    VMdPreview
  },
  name: "Test",
  setup() {
    let text = ref('')
    async function detailData(DetailID) {
      const detail_data = await getArticleDetail(DetailID)
      text.value = detail_data.body
      const pattern = /!\[(.*?)\]\((.*?)\)/gm;
      let matcher;
      let imgArr = [];
      while ((matcher = pattern.exec(text.value)) !== null) {
        imgArr.push(matcher[2]);
      }
      for (let i = 0; i < imgArr.length; i++) {
        text.value = text.value.replace(
            imgArr[i],
            "https://images.weserv.nl/?url=" + imgArr[i]
        );
      }
    }
    onMounted(() => {
      detailData(17)
    })
    return {
      text,
    }
  }
}
</script>

<style lang="scss">
@import "src/assets/style/variable";
body{
  background-color: $color-background-white;
}
</style>
