<template>
  <div class="main">
    <van-button type="primary" @click="getH">主要按钮</van-button>
    <div class="body" ref="editor">
      <!--      <div-->
      <!--          v-for="anchor in titles"-->
      <!--          :style="{ padding: `10px 0 10px ${anchor.indent * 20}px` }"-->
      <!--          @click="handleAnchorClick(anchor)"-->
      <!--      >-->
      <!--        <a style="cursor: pointer">{{ anchor.title }}</a>-->
      <!--      </div>-->
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
    let titles = ref([])
    let editor = ref(null)

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

    // nextTick(()=>{
    //   console.log('Now DOM is updated')
    //   const anchors = document.querySelectorAll(
    //         '.v-md-editor-preview h1,h2,h3,h4,h5,h6'
    //     )
    //     console.log(anchors)
    // })
    // const changeMessage = async newMessage => {
    //   await nextTick()
    //   console.log('Now DOM is updated')
    //   const anchors = document.querySelectorAll(
    //       '.v-md-editor-preview h1,h2,h3,h4,h5,h6'
    //   )
    //   console.log(anchors)
    // }
    // changeMessage()
    // async function newMessage(){
    //   await nextTick()
    //   console.log("渲染完了")
    //   console.log(editor.value)
    //   const anchors = document.querySelectorAll(
    //       '.v-md-editor-preview h1,h2,h3,h4,h5,h6'
    //   )
    //   console.log(anchors)
    //   const titles = Array.from(anchors).filter((title) => !!title.innerText.trim());
    //   console.log(titles)
    // }
    const getH = () => {
      console.log(editor.value)
      const anchors = editor.value.querySelectorAll(
          '.v-md-editor-preview h1,h2,h3,h4,h5,h6'
      )
      console.log(anchors)
    }
    onMounted(() => {
      detailData(17)
    })
    return {
      text,
      titles,
      editor,
      getH
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
