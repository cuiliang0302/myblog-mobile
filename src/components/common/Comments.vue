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
            <span v-if="isLike(item.id)===true">
              <img :src="require('@/assets/icon/like-colour.png')" alt="">
            </span>
            <span v-else @click="likeMessage(item.id)">
              <img :src="require('@/assets/icon/like-article.png')" alt="">
            </span>
            <p>{{ item.like }}</p>
          </span>
      </div>
      <div class="comment-content">
        <p>{{ item.content }}</p>
      </div>
      <div class="comment-action">
          <span>
            <van-icon name="underway-o"/>
            <p>{{ timeAgo(item.time) }}</p>
          </span>
        <span>
            <img :src="require('@/assets/icon/comment-color.png')" alt="">
            <p>回复</p>
          </span>
        <span v-if="isDelete(item.user)" @click="delMessage(item.id)">
            <img :src="require('@/assets/icon/delete-color.png')" alt="">
            <p>删除</p>
        </span>
        <span v-else style="opacity: 0.3">
            <img :src="require('@/assets/icon/delete-color.png')" alt="">
            <p>删除</p>
        </span>
      </div>
      <div class="reply" v-if="(JSON.stringify(item.child)!=='[]')">
        <Comments :commentsList="item.child"></Comments>
      </div>
    </ol>
  </div>
</template>

<script>
import {Toast, Image as VanImage, Icon, Dialog} from 'vant'
import {ref} from "vue";
import timeFormat from "@/utils/timeFormat";
import user from "@/utils/user";

export default {
  components: {
    [VanImage.name]: VanImage,
    [Icon.name]: Icon,
    Dialog,
    Toast
  },
  props: {
    // 评论回复列表
    commentsList: {
      type: Array, default() {
        return []
      }
    },
  },
  name: "Comments",
  emits: ['likeMessage', 'delMessage'],
  setup(props, {emit}) {
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
    const likeMessage = (messageId) => {
      likeList.value.push(messageId)
      emit('likeMessage', messageId)
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
        // on confirm
        emit('delMessage', messageId)
      })
    }
    return {
      timeAgo,
      likeList,
      isLike,
      likeMessage,
      delMessage,
      isDelete
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/assets/style/variable";

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

      img {
        width: 0.4rem;
        height: 0.4rem;
        opacity: 1;
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

      p {
        font-size: 0.373rem;
      }
    }

    .comment-action {
      display: flex;
      justify-content: space-between;
      padding: 0 1.067rem 0.267rem 1.067rem;
      margin: 0 auto;
      color: $color-text-regular;

      p {
        display: inline;
        margin-left: 0.133rem;
        vertical-align: 0.027rem;
      }

      img {
        width: 0.267rem;
        height: 0.267rem;
      }
    }
  }
}
</style>
