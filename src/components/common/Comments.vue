<!--评论回复组件-->
<template>
  <div class="comments" v-for="(item,index) in commentsList" :key="index">
    <ol>
      <div class="comment-info">
          <span>
            <van-image round lazy-load width="0.8rem" height="0.8rem" :src="item.photo"/>
            <p class="comment-user">{{ item.username }}</p>
            <span v-show="item.father_name" class="reply-text">回复</span>
            <p>{{ item.father_name }}</p>
          </span>
        <span>
              <span v-if="isLike(item.id)===true" class="comment-like">
                <MyIcon class="icon" type="icon-like-solid" @click="showShare = true"/>
              </span>
              <span v-else @click="likeMessage(item.id,item.like)" class="comment-like">
                <MyIcon class="icon" type="icon-like" @click="showShare = true"/>
              </span>
              <p>{{ item.like }}</p>
          </span>
      </div>
      <div class="comment-content">
        <p v-html=item.content></p>
      </div>
      <div class="comment-action">
          <span class="comment-btn">
            <MyIcon class="icon" type="icon-time"/>
            <p>{{ timeAgo(item.time) }}</p>
          </span>
        <span class="comment-btn">
          <span v-if="isReply(item.user)===true" @click="replyMessage(item.id)">
            <MyIcon class="icon click-btn" type="icon-comment"/>
            <p>回复</p>
          </span>
          <span v-else style="opacity: 0.5">
            <MyIcon class="icon click-btn" type="icon-comment"/>
            <p>回复</p>
          </span>
        </span>
        <span class="comment-btn">
          <span v-if="isDelete(item.user)" @click="delMessage(item.id)">
            <MyIcon class="icon click-btn" type="icon-delete"/>
            <p>删除</p>
          </span>
          <span v-else style="opacity: 0.5">
            <MyIcon class="icon click-btn" type="icon-delete"/>
              <p>删除</p>
          </span>
        </span>
      </div>
      <div class="reply" v-if="item.child.length!==0">
        <Comments :commentsList="item.child"></Comments>
      </div>
    </ol>
  </div>
  <div class="textarea">
    <van-popup v-model:show="textareaShow"
               position="bottom" :style="{ height: '15%' }" closeable
               close-on-popstate
               overlay-class="my-overlay"
               safe-area-inset-bottom
    >
      <van-field
          v-model="replyForm.content"
          rows="4"
          autosize
          type="textarea"
          maxlength="50"
          label-width="0"
          placeholder="请输入留言"
          show-word-limit
          @focus="focus"
          @blur="blur"
          @click-right-icon="replySend"
      >
        <template #right-icon>
          <MyIcon class="icon click-send" type="icon-send"/>
        </template>
      </van-field>
    </van-popup>
  </div>
</template>

<script setup>
import {Toast, Image as VanImage, Icon, Dialog, Popup, Field} from 'vant'
import {reactive, ref, getCurrentInstance} from "vue";
import timeFormat from "@/utils/timeFormat";
import user from "@/utils/user";
import icon from '@/utils/icon'

let {MyIcon} = icon()
const props = defineProps({
  // 评论回复列表
  commentsList: {
    type: Array,
    required: true,
    default: []
  },
})
const emit = defineEmits(['likeMessage', 'delMessage', 'replySend'])
// 事件总线
const internalInstance = getCurrentInstance();
const $bus = internalInstance.appContext.config.globalProperties.$bus;
// 引入用户信息模块
let {userId, isLogin} = user();
// 时间显示几天前
let {timeAgo} = timeFormat()
// 已点赞列表
const likeList = ref([])
// 判断是否已点赞
const isLike = (messageId) => {
  for (let i = 0; i < likeList.value.length; i++) {
    if (messageId === parseInt(likeList.value[i])) {
      return true;
    }
  }
  return false;
}
// 留言评论点赞
const likeMessage = (messageId, likeMessage) => {
  likeList.value.push(messageId)
  const value = {
    'id': messageId,
    'like': likeMessage + 1
  }
  $bus.emit("likeMessage", value);
}
// 判断评论留言能否删除
const isDelete = (messageUser) => {
  if (!isLogin.value) {
    return false
  }
  if (messageUser !== userId.value) {
    return false
  }
  return true
}
// 评论留言删除
const delMessage = (messageId) => {
  Dialog.confirm({
    title: '删除确认',
    message: '当真要删除这条宝贵的记录吗？',
  }).then(() => {
    $bus.emit("delMessage", messageId);
  })
}
// 回复输入框默认状态
const textareaShow = ref(false)
// 回复输入框内容
const replyForm = reactive({
  content: '',
  user: '',
  father: ''
})
// 点击留言评论回复事件
const replyMessage = (father) => {
  textareaShow.value = true
  replyForm.father = father
  replyForm.user = userId.value
}
// 发送评论留言回复事件
const replySend = () => {
  if (replyForm.content === '') {
    Toast.fail("请输入内容！")
    return false
  } else {
    $bus.emit("replySend", replyForm);
    // emit('replySend', replyForm)
    replyForm.content = ''
    textareaShow.value = false
  }
}
// 判断是否可回复留言
const isReply = (user) => {
  if (isLogin.value === true && userId.value !== user) {
    return true
  } else {
    return false
  }
}
// 判断浏览器是否为miui
const isMIUI = () => {
  let UA = window.navigator.userAgent
  if (UA.includes('MiuiBrowser')) {
    if (window.screen.height / window.screen.width >= 2) {
      console.log("是小米全面屏手机")
      return true
    }
  } else {
    console.log("不是小米全面屏手机")
    return false
  }
}
// 评论框获得焦点事件
const focus = () => {
  if (isMIUI() === true) {
    let textareaDom = document.querySelector('.textarea>.van-popup--bottom')
    textareaDom.style.bottom = '38vh';
  }
}
// 评论框失去焦点事件
const blur = () => {
  if (isMIUI() === true) {
    let textareaDom = document.querySelector('.textarea>.van-popup--bottom')
    textareaDom.style.bottom = '0.533rem';
  }
}
</script>

<style lang="scss" scoped>
@import "src/assets/style/index";

.comments {

  ol {
    .comment-info {
      display: flex;
      align-items: center;
      justify-content: space-between;

      span:nth-child(1) {
        p {
          display: inline;
          vertical-align: 0.267rem;
          margin-left: 0.267rem;
          font-size: 0.4rem;
        }
      }

      span:nth-child(2) {
        p {
          display: inline;
          vertical-align: 0.053rem;
          margin-left: 0.133rem;
        }
      }

      .comment-like {
        color: #f1c40f;
        font-size: 20px;
      }

      .comment-user {
        font-weight: bolder;
      }

      .reply-text {
        vertical-align: 0.267rem;
        margin-left: 0.267rem;
        font-size: 0.4rem;
      }
    }

    .comment-content {
      margin-left: 1.067rem;

      :deep(img) {
        max-height: 120px;
      }

      p {
        font-size: 0.373rem;
      }
    }

    .comment-action {
      display: flex;
      justify-content: space-between;
      padding: 0 1.067rem 0.267rem 1.067rem;
      margin: 0 auto;
      @include font_color('font_color2');

      .comment-btn {
        display: flex;
        align-items: center;

        .icon {
          height: 0.347rem;
        }

        .click-btn {
          color: $color-primary
        }
      }

      p {
        display: inline;
        margin-left: 0.133rem;
        vertical-align: 0.027rem;
      }
    }
  }
}

.click-send {
  color: $color-primary;
  height: 0.933rem;
  width: 0.933rem;
  position: absolute;
  right: 0;
  top: 40px;
}

.textarea > .van-popup--bottom {
  bottom: 0.533rem;
}
</style>
