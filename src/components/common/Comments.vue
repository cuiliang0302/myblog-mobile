<!--评论回复组件-->
<template>
  <div class="comments" v-for="(item,index) in commentsList" :key="index">
    <ol>
      <div class="comment-info">
          <span>
            <van-image round lazy-load width="0.8rem" height="0.8rem" :src="item.photo"/>
            <h3>{{ item.username }}</h3>
          </span>
        <span @click="clickLike(item.id,index)">
            <span v-if="item.is_like===true">
              <img :src="require('@/assets/icon/like-article.png')" alt="">
            </span>
            <span v-else>
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
        <span>
            <img :src="require('@/assets/icon/delete-color.png')" alt="">
            <p>删除</p>
          </span>
      </div>
      <div class="reply" v-if="item.child">
        <Comments :commentsList="item.child"></Comments>
      </div>
    </ol>
  </div>
</template>

<script>
import {Toast, Image as VanImage, Icon} from 'vant'
import {ref} from "vue";
import timeFormat from "@/utils/timeFormat";

export default {
  components: {
    [VanImage.name]: VanImage,
    [Icon.name]: Icon,
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
  setup(props) {
    // 时间显示几天前
    let {timeAgo} = timeFormat()
    const message = ref(null)
    // 发布评论
    const likeFlag = ref(0)
    const clickSend = () => {
      Toast("发表评论啦")
    }
    // 评论点赞
    const clickLike = (id, index) => {
      console.log(id)
      console.log(index)
      if (likeFlag.value === 0) {
        Toast.success("点赞成功，感谢支持！")
        likeFlag.value = likeFlag.value + 1
        // contentList[index].like = parseInt(contentList[index].like) + 1
      } else {
        Toast.fail("既然点赞了，岂能取消？")
      }
    }
    return {
      timeAgo,
      message,
      clickSend,
      clickLike
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

        h3 {
          display: inline;
          vertical-align: 0.267rem;
          margin-left: 0.373rem;
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
      padding: 0 40px 10px 40px;
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
