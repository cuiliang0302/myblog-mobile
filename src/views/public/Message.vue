<template>
  <div>
    <NavBar></NavBar>
    <section class="message">
      <Comments :commentsList="messageList"></Comments>
    </section>
    <Tabbar></Tabbar>
  </div>
</template>

<script>
import NavBar from "@/components/common/NavBar";
import Tabbar from '@/components/common/Tabbar'
import Comments from "@/components/common/Comments";
export default {
  components: {
    NavBar,
    Comments,
    Tabbar,
  },
name: "Message",
  setup(){
    const messageList = [
      {
        id: '1',
        username: '张三',
        photo: 'https://cdn.cuiliangblog.cn/media/photo/2020_10_22_13_29_07_420444.jpg',
        comment: '你笑起来真好看，像春天的花一样',
        time: '三天前',
        like: 10,
        is_like: true,
        child: [
          {
            id: '2',
            username: '张小三',
            target: '张三',
            photo: 'https://cdn.cuiliangblog.cn/media/photo/2021_02_20_11_18_31_393596.jpg',
            comment: '你说的真对',
            time: '一天前',
            like: 8,
            is_like: false,
          },
          {
            id: '3',
            username: '张大三',
            target: '张小三',
            photo: 'https://cdn.cuiliangblog.cn/media/photo/2020_12_26_21_47_08_682774.jpg',
            comment: '你们说的都对',
            time: '8分钟前',
            like: 2,
            is_like: false,
          },
        ]
      },
      {
        id: '4',
        username: '李四',
        photo: 'https://cdn.cuiliangblog.cn/media/photo/default.jpg',
        comment: '我笑起来也很好看的哦',
        time: '四天前',
        like: 8,
        is_like: false,
      },
      {
        id: '5',
        username: '王五',
        photo: 'https://cdn.cuiliangblog.cn/media/photo/2020_12_26_15_35_59_908281.jpg',
        comment: '别争了，我最好看',
        time: '一个月前',
        like: 18,
        is_like: true,
      }
    ]
    return{
      messageList
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/style/variable";
.message{
}
</style>
