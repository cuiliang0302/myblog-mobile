<template>
  <div>
    <NavBar></NavBar>
    <section>
      <van-field
          v-model="messageForm.content"
          rows="2"
          autosize
          type="textarea"
          maxlength="50"
          placeholder="既然来了，留下点东西再走吧……"
          show-word-limit
          clearable
          @click-right-icon="clickSend"
      >
        <template #right-icon>
          <svg class="icon click-send" aria-hidden="true">
            <use xlink:href="#icon-send"></use>
          </svg>
        </template>
      </van-field>
      <div class="comment-list">
        <Comments :commentsList="messageList"></Comments>
      </div>
    </section>
    <Tabbar></Tabbar>
    <LoginPopup ref="refLoginPopup"></LoginPopup>
  </div>
</template>

<script>
import NavBar from "@/components/common/NavBar";
import Tabbar from '@/components/common/Tabbar'
import Comments from "@/components/common/Comments";
import LoginPopup from "@/components/common/LoginPopup";
import {
  getLeaveMessage,
  postLeaveMessage,
  putLeaveMessage,
  deleteLeaveMessage,
  postReplyLeaveMessage
} from "@/api/record";
import {getCurrentInstance, onMounted, reactive, ref} from "vue";
import {Field, Toast, Image as VanImage, Icon} from 'vant'
import user from "@/utils/user";

export default {
  components: {
    NavBar,
    Comments,
    Tabbar,
    LoginPopup,
    Toast,
    [Field.name]: Field,
    [VanImage.name]: VanImage,
    [Icon.name]: Icon,
  },
  name: "Message",
  setup() {
    // 事件总线
    const internalInstance = getCurrentInstance();  //当前组件实例
    const $bus = internalInstance.appContext.config.globalProperties.$bus;
    // 引入用户信息模块
    let {userId, isLogin} = user();
    // 留言列表
    const messageList = ref([])
    // 留言框表单
    const messageForm = reactive({
      content: '',
      user: '',
    })
    // 提示登录组件对象
    const refLoginPopup = ref()
    // 点击发表留言事件
    const clickSend = () => {
      if (isLogin.value) {
        if (messageForm.content) {
          messageForm.user = userId.value
          postLeaveMessage(messageForm).then((response) => {
            console.log(response)
            Toast.success('留言成功！');
            messageForm.content = ''
            leaveMessageData()
          }).catch(response => {
            //发生错误时执行的代码
            console.log(response)
            for (let i in response) {
              Toast.fail(i + response[i][0]);
            }
          });
        } else {
          Toast("毛都没有，发表个锤子")
        }
      } else {
        refLoginPopup.value.showPopup()
      }
    }
    // 留言点赞事件
    if (!$bus.all.get("likeMessage")) $bus.on("likeMessage", messageId => {
      console.log(messageId)
      putLeaveMessage(messageId).then((response) => {
        console.log(response)
        Toast.success('点赞成功！');
        leaveMessageData()
      }).catch(response => {
        //发生错误时执行的代码
        console.log(response)
        Toast.fail(response.msg);
      });
    });
    // 留言删除事件
    if (!$bus.all.get("delMessage")) $bus.on("delMessage", messageId => {
      console.log(messageId)
      deleteLeaveMessage(messageId).then((response) => {
        console.log(response)
        Toast.success('留言删除成功！');
        leaveMessageData()
      }).catch(response => {
        //发生错误时执行的代码
        console.log(response)
        Toast.fail(response.msg);
      });
    });
    // 留言回复事件
    if (!$bus.all.get("replySend")) $bus.on("replySend", replyForm => {
      console.log(replyForm)
      postReplyLeaveMessage(replyForm).then((response) => {
        console.log(response)
        Toast.success('回复成功！');
        leaveMessageData()
      }).catch(response => {
        //发生错误时执行的代码
        console.log(response)
        for (let i in response) {
          Toast.fail(i + response[i][0]);
        }
      });
    });

    // 获取留言列表
    async function leaveMessageData() {
      messageList.value = await getLeaveMessage()
    }


    onMounted(() => {
      leaveMessageData()
    })
    return {
      refLoginPopup,
      messageList,
      messageForm,
      clickSend,
    }
  }
}
</script>

<style scoped lang="scss">
@import "~@/assets/style/variable";

.comment-list {
  padding: 0.267rem;
  background-color: white;
}

.click-send {
  color: $color-primary;
  width: 0.933rem;
  height: 0.933rem;
  position: absolute;
  right: 0;
  top: 0.267rem;
}
</style>
