<template>
  <div>
    <NavBar></NavBar>
    <section>
      <van-field
          v-model="message"
          rows="2"
          autosize
          type="textarea"
          maxlength="50"
          placeholder="既然来了，留下点东西再走吧……"
          show-word-limit
          clearable
          :right-icon="require('@/assets/icon/send.png')"
          @click-right-icon="clickSend"
      />
      <div class="comment-list">
        <Comments :commentsList="messageList"></Comments>
      </div>
    </section>
    <Tabbar></Tabbar>
  </div>
</template>

<script>
import NavBar from "@/components/common/NavBar";
import Tabbar from '@/components/common/Tabbar'
import Comments from "@/components/common/Comments";
import {getLeaveMessage} from "@/api/record";
import {onMounted, ref} from "vue";
import {Field, Toast, Image as VanImage, Icon} from 'vant'

export default {
  components: {
    NavBar,
    Comments,
    Tabbar,
    Toast,
    [Field.name]: Field,
    [VanImage.name]: VanImage,
    [Icon.name]: Icon,
  },
  name: "Message",
  setup() {
    // 留言列表
    const messageList = ref([])

    // 获取留言列表
    async function leaveMessageData() {
      messageList.value = await getLeaveMessage()
    }

    // 留言内容
    const message = ref()
    // 点击发表留言事件
    const clickSend = () => {
      Toast("发表评论啦")
    }
    onMounted(() => {
      leaveMessageData()
    })
    return {
      messageList,
      message,
      clickSend
    }
  }
}
</script>

<style scoped lang="scss">
@import "~@/assets/style/variable";

.comment-list {
  padding: 10px;
  background-color: white;
}


</style>
