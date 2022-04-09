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
          <MyIcon class="icon icon-send" type="icon-send"/>
        </template>
      </van-field>
      <div class="comment-list">
        <Comments :commentsList="messageList"></Comments>
      </div>
    </section>
    <Tabbar></Tabbar>
    <LoginPopup ref="loginPopupRef"></LoginPopup>
  </div>
</template>

<script setup>
import NavBar from "@/components/common/NavBar.vue";
import Tabbar from '@/components/common/Tabbar.vue'
import Comments from "@/components/common/Comments.vue";
import LoginPopup from "@/components/common/LoginPopup.vue";
import {
  getLeaveMessage,
  postLeaveMessage,
  patchLeaveMessage,
  deleteLeaveMessage,
  postReplyLeaveMessage
} from "@/api/record";
import {getCurrentInstance, onMounted, reactive, ref} from "vue";
import {Field, Toast, Image as VanImage, Icon} from 'vant'
import user from "@/utils/user";
import icon from '@/utils/icon'
import store from "@/store";
let {MyIcon} = icon()
import router from "@/router";
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
const loginPopupRef = ref()
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
    loginPopupRef.value.showPopup()
    store.commit('setNextPath', router.currentRoute.value.fullPath)
  }
}
// 留言点赞事件
if (!$bus.all.get("likeMessage")) $bus.on("likeMessage", value => {
  const params = {'like': value.like}
  patchLeaveMessage(value.id, params).then((response) => {
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
</script>

<style scoped lang="scss">
@import "src/assets/style/index.scss";

.comment-list {
  padding: 0.267rem;
  @include background_color("background_color3");
}

.click-send {
  color: $color-primary;
  width: 0.933rem;
  height: 0.933rem;
  position: absolute;
  right: 0;
  top: 0.267rem;
}
.icon-send{
  font-size: 1.067rem;
  position: absolute;
  right: 0;
  top: 0;
}
</style>
