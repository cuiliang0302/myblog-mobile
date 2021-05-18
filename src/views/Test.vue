<template>
  <div class="main">
    <div class="body" ref="editor">
      <div
          v-for="anchor in titleList"
          :style="{ padding: `10px 0 10px ${anchor.indent * 20}px` }"
          @click="handleAnchorClick(anchor.height)"
      >
        <a style="cursor: pointer">{{ anchor.title }}</a>
      </div>
      <v-md-preview :text="text"/>
    </div>
  </div>
</template>
<script>
import {onMounted, ref, nextTick} from "vue";
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';
import python from 'highlight.js/lib/languages/python';
import {Button} from 'vant';

VMdPreview.use(githubTheme, {
  codeHighlightExtensionMap: {
    vue: 'xml',
  },
  extend(md, hljs) {
    hljs.registerLanguage('python', python);
  },
});
import {getArticleDetail} from "@/api/article";

export default {
  components: {
    VMdPreview,
    [Button.name]: Button
  },
  name: "Test",
  setup() {
    let text = ref('')
    let titleList = ref([])
    let editor = ref(null)
    const handleAnchorClick = (height) => {
      if (height) {
        console.log(height)
        window.scrollTo({
          top: height + 16 * 32,
          behavior: "smooth"
        });
      }
    }

    async function detailData(DetailID) {
      const detail_data = await getArticleDetail(DetailID)
      text.value = detail_data.body
      // 图片防盗链处理
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
    // 获取文章标题
    async function getTitle() {
      await nextTick()
      const anchors = editor.value.querySelectorAll(
          '.v-md-editor-preview h1,h2,h3'
      )
      const titles = Array.from(anchors).filter((title) => !!title.innerText.trim());
      if (!titles.length) {
        titleList.value = [];
        return;
      }
      const hTags = Array.from(new Set(titles.map((title) => title.tagName))).sort();
      titleList.value = titles.map((el) => ({
        title: el.innerText,
        lineIndex: el.getAttribute('data-v-md-line'),
        indent: hTags.indexOf(el.tagName),
        height: el.getClientRects()[0].y
      }));
    }

    onMounted(async () => {
      await detailData(17)
      await getTitle()
    })
    return {
      text,
      titleList,
      editor,
      handleAnchorClick
    }
  },
}
</script>

<style lang="scss">
@import "src/assets/style/variable";

body {
  background-color: $color-background-white;
}
</style>
