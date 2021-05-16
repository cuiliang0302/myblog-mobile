<template>
  <div class="main">
    <v-md-editor v-model="text" height="100vh"></v-md-editor>
  </div>
</template>

<script>
import {onMounted, ref} from "vue";
import VMdEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';

VMdEditor.use(githubTheme);
import {getArticleDetail} from "@/api/public";
export default {
  components: {
    VMdEditor
  },
  name: "Test1",
  setup() {
    let text = ref('')

    async function detailData(DetailID) {
      const detail_data = await getArticleDetail(DetailID)
      text.value = detail_data.body
    }

    onMounted(() => {
      detailData(18)
    })
    return {
      text
    }
  }
}
</script>

<style lang="scss">
@import "src/assets/style/variable";
</style>
