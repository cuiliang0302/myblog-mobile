<!--评论回复组件-->
<template>
  <section class="comments">
    <van-field
        v-model="message"
        rows="2"
        autosize
        type="textarea"
        maxlength="50"
        placeholder="对这篇文章有何看法？"
        show-word-limit
        clearable
        :right-icon="require('@/assets/icon/send.png')"
        @click-right-icon="clickSend"
    />
    <ol v-for="(item,index) in contentList" :key="index">
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
        <p>{{ item.comment }}</p>
      </div>
      <div class="comment-action">
      <span>
        <van-icon name="underway-o"/>
        <p>{{ item.time }}</p>
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
      <div class="reply">
        <li v-for="(reply,index) in item.child" :key="index">
          <div class="comment-info">
      <span>
        <van-image round lazy-load width="0.8rem" height="0.8rem" :src="reply.photo"/>
        <h3>{{ reply.username }}</h3>
        <p>回复</p>
        <h3>{{ reply.target }}</h3>
      </span>
            <span>
        <img :src="require('@/assets/icon/like-article.png')" alt="">
        <p>{{ reply.like }}</p>
      </span>
          </div>
          <div class="comment-content">
            <p>{{ reply.comment }}</p>
          </div>
          <div class="comment-action">
      <span>
        <van-icon name="underway-o"/>
        <p>{{ reply.time }}</p>
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
        </li>
      </div>

      <div class="van-hairline--bottom"></div>
    </ol>
  </section>
</template>

<script>
import {Field, Toast, Image as VanImage, Icon} from 'vant'
import {reactive, ref} from "vue";

export default {
  components: {
    [Field.name]: Field,
    [VanImage.name]: VanImage,
    [Icon.name]: Icon
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
    const contentList = reactive(props.commentsList)
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
        contentList[index].like = parseInt(contentList[index].like) + 1
      } else {
        Toast.fail("既然点赞了，岂能取消？")
      }
    }
    return {
      contentList,
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
    padding: 0.267rem 0.4rem;
    background-color: $color-background-white;

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
      width: 6.667rem;
      margin: 0 auto;
      padding-bottom: 0.267rem;
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

    .reply {
      margin-left: 1.067rem;
      background-color: $color-background-base;
      border-radius: 0.133rem;
      margin-bottom: 0.267rem;

      .comment-action {
        width: 5.867rem;
      }
    }
  }

  ol:last-child {
    .van-hairline--bottom {
      display: none;
    }
  }
}
</style>
