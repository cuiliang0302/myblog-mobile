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
        <Comments :commentsList="messageList.data"></Comments>
      </div>
    </section>
    <Tabbar :activeBar=null></Tabbar>
    <LoginPopup ref="loginPopupRef"></LoginPopup>
  </div>
</template>

<script setup>
import NavBar from "@/components/common/NavBar.vue";
import Tabbar from '@/components/common/Tabbar.vue'
import Comments from "@/components/common/Comments.vue";
import LoginPopup from "@/components/common/LoginPopup.vue";
import {getCurrentInstance, onMounted, onUnmounted, reactive, ref, computed} from "vue";
import {showSuccessToast, showFailToast, showToast} from 'vant'
import icon from '@/utils/icon'
import {useCommonStore, useUserStore} from '@/store';
const common = useCommonStore();
const user = useUserStore();

import store from "@/store";

import router from "@/router";
import {inject} from 'vue';
import Record from "@/api/record";

// const reload = inject("reload");
let {MyIcon} = icon()
// 事件总线
const internalInstance = getCurrentInstance();  //当前组件实例
const $bus = internalInstance.appContext.config.globalProperties.$bus;
// 留言列表
const messageList = reactive({
  page: 1,
  count: 0,
  data: []
})
// 加载留言动画
const loading = ref(false);
// 留言框表单
const messageForm = reactive({
  content: '',
  user: '',
})
// 提示登录组件对象
const loginPopupRef = ref()
// 点击发表留言事件
const clickSend = () => {
  if (user.isLoggedIn) {
    if (messageForm.content) {
      messageForm.user = user.user_id
      Record.postLeaveMessage(messageForm).then((response) => {
        console.log(response)
        showSuccessToast('留言成功！');
        messageForm.content = ''
        leaveMessageDataRefresh()
        // reload()
      }).catch(response => {
        //发生错误时执行的代码
        console.log(response)
        showFailToast("留言发布失败!")
      });
    } else {
      showToast("请先填写内容再发表吧!")
    }
  } else {
    common.setNextPath(router.currentRoute.value.fullPath)
    loginPopupRef.value.showPopup()
  }
}
// 留言点赞事件
if (!$bus.all.get("likeMessage")) $bus.on("likeMessage", value => {
  const params = {'like': value.like}
  console.log(messageList.data, value.id, value.like)
  Record.patchLeaveMessage(value.id, params).then((response) => {
    console.log(response)
    showSuccessToast('点赞成功！');
  }).catch(response => {
    //发生错误时执行的代码
    console.log(response)
    showFailToast(response.msg);
  });
});
// 留言删除事件
if (!$bus.all.get("delMessage")) $bus.on("delMessage", messageId => {
  console.log(messageId)
  Record.deleteLeaveMessage(messageId).then((response) => {
    console.log(response)
    showSuccessToast('留言删除成功！');
    leaveMessageDataRefresh()
    // reload()
  }).catch(response => {
    //发生错误时执行的代码
    console.log(response)
    showFailToast(response.msg);
  });
});
// 留言回复事件
if (!$bus.all.get("replySend")) $bus.on("replySend", replyForm => {
  console.log(replyForm)
  Record.postReplyLeaveMessage(replyForm).then((response) => {
    console.log(response)
    showSuccessToast('回复成功！');
    leaveMessageDataRefresh()
    // reload()
  }).catch(response => {
    //发生错误时执行的代码
    console.log(response)
    for (let i in response) {
      showFailToast(i + response[i][0]);
    }
  });
});

// 获取留言列表
function leaveMessageData() {
  // console.log(loading.value)
  if (loading.value) return; // 防止重复加载
  loading.value = true;
  Record.getLeaveMessage({'page': messageList.page}).then(response => {
    messageList.data.push(...response.results)
    console.log(messageList)
    messageList.count = response.count
    loading.value = false;
    messageList.page += 1//增加页数
  }).catch(error => {
    console.log(error)
    showFailToast("获取留言列表数据失败")
  })
}

// 刷新留言列表
function leaveMessageDataRefresh() {
  Record.getLeaveMessage({'page': 1, 'size': 1000}).then(response => {
    messageList.data = []
    messageList.data.push(...response.results)
  }).catch(error => {
    console.log(error)
    showFailToast("获取留言列表数据失败")
  })
}

// 是否还有更多需要加载
const noMore = computed(() => messageList.data.length !== messageList.count);
// 处理页面滚动事件
const handleScroll = () => {
  const {scrollTop, clientHeight, scrollHeight} = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - 10 && !loading.value && noMore.value) {
    leaveMessageData();
  }
};
// 留言查看回复事件
if (!$bus.all.get("replyView")) $bus.on("replyView", (value) => {
  Record.getLeaveMessageDetail(value).then((response) => {
    console.log(response)
    console.log(messageList.data)
    // 查找 id 为 113 的对象并替换为新的对象
    let targetIndex = messageList.data.findIndex(item => item.id === value);
    if (targetIndex !== -1) {
      messageList.data[targetIndex] = Object.assign({}, response); // 使用 Object.assign() 替换整个对象
    }
    // replyList.value = response.child;
    console.log(messageList.data)
  }).catch(response => {
    //发生错误时执行的代码
    console.log(response)
    showFailToast(response.msg)
  });
});
onMounted(() => {
  leaveMessageData()
  // 监听滚动事件
  window.addEventListener("scroll", handleScroll);
  // if (isLogin.value === true) {
  //   getPhotoData()
  // } else {
  //   getLogoData()
  // }
})
onUnmounted(() => {
  // 组件卸载时，停止监听
  window.removeEventListener("scroll", handleScroll, false)
})
</script>

<style scoped lang="less">
//@import "src/assets/style/index.scss";

.comment-list {
  padding: 0.267rem;
  background-color: var(--background_color3);
  //@include background_color("background_color3");
}

.click-send {
  color: var(--van-primary-color);
  //color: $color-primary;
  width: 0.933rem;
  height: 0.933rem;
  position: absolute;
  right: 0;
  top: 0.267rem;
}

.icon-send {
  font-size: 1.067rem;
  position: absolute;
  right: 0;
  top: 0;
  color: var(--van-primary-color);
}
</style>
