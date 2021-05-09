<template>
  <div>
    <NavBar></NavBar>
    <van-collapse v-model="activeName" accordion>
      <van-collapse-item v-for="(item,index) in aboutContent" :key="index" :title="item.title" :name="index">
        {{ item.content }}
      </van-collapse-item>
    </van-collapse>
    <Tabbar></Tabbar>
  </div>
</template>

<script>
import NavBar from "@/components/common/NavBar";
import Tabbar from '@/components/common/Tabbar';
import {Collapse, CollapseItem} from 'vant';
import {ref} from "vue";

export default {
  components: {
    NavBar,
    Tabbar,
    [Collapse.name]: Collapse,
    [CollapseItem.name]: CollapseItem
  },
  name: "About",
  setup() {
    const activeName = ref(0);
    const aboutContent = [
      {title: '关于博主', content: '我叫崔亮，老家甘肃，18年开始北漂，目前从事运维工程师岗位，精通水晶头的制作和服务器开关机，擅长Linux服务器管理、Web服务部署维护，熟悉Ansible批量运维工具和CI/CD相关使用，略懂Kubernets和docker容器管理，以及Python、Vue编程开发。爱好编程、看电影、玩游戏。'},
      {title: '关于网站', content: '建站目的\n' +
            '作为一名运维工程师，知识的积累是必不可少的，本人在工作和学习中记录了大量的笔记，打算通过这个博客平台，分享工作中遇到的各种问题的解决办法和学习笔记总结，本站所有文章和笔记内容都是本人亲自实践过后总结所得，各种坑已经替大家踩过了，大家可以放心参考。\n' +
            '\n' +
            '本站所有文章均为原创，若有引用会在博文底部均注明了参考地址，如有遗漏，欢迎您联系我进行处理。因原创文章均由自己手打而成，即使发表时检查再三也难免有错误或者错别字产生，如果您发现了需要更正的地方或者您有更好的见解和思路，欢迎评论留言。\n' +
            '\n' +
            '开发博客网站一方面也是为了督促自己每天学习，发表文章和笔记内容。另一方面，希望能通过这个网站结识更多志趣相同的人，一起交流研究运维技术，提高个人专业能力。\n' +
            '\n' +
            '网站技术\n' +
            '目前的博客网站大多才有HEXO或者WordPress搭建而成，拿来即用。但博客网站这件事，我还是喜欢自己造轮子。可以随心所欲地按需开发功能模块，设计业务逻辑，制作前端样式。同时也是通过博客网站项目将业务产品从需求分析、功能模块设计、数据库设计、代码开发、项目测试、部署运维、SEO优化的整个流程做一个充分了解，提高自己的运维开发能力。\n' +
            '\n' +
            '网站前端使用到了layui、jQuery、Bootstrap框架，以及echaets实现数据可视化。\n' +
            '\n' +
            '文章编辑器使用markdown，评论留言使用layui富文本实现。\n' +
            '\n' +
            '后端使用python语言，django框架开发。\n' +
            '\n' +
            '数据库主要使用MySQL，缓存使用Redis。\n' +
            '\n' +
            '网站部署在阿里云服务器，使用docker-compose部署，通过nginx反向代理，实现动静分离，css、js、字体、图片等静态资源使用七牛OSS对象存储，并通过华为CDN提供加速服务，动态资源由Django解析并处理。\n' +
            '\n' +
            '整个站点流量通过调用百度统计的api接口实现流量统计分析。'},
      {title: '关于赞赏', content: '由于网站每个月都需要大量的费用维护，且目前没有有效的盈利方式\n' +
            '\n' +
            '如果您感觉本站对您有帮助，欢迎扫取下面的二维码赞助一顿饭钱，让博主不再忍受饥饿~\n' +
            '\n' +
            '但是如果您感觉本站对您没有任何帮助，那么一分钱也不要赞助，让博主继续饿着吧！(๑•̀ㅂ•́)و✧\n' +
            '\n' +
            '（请赞助后发送邮件或添加本人QQ/微信联系，如果未联系，则默认为匿名赞助。）'},
      {title: '关于友链', content: '申请地址：在留言板留言即可\n' +
            '\n' +
            '申请格式：\n' +
            '\n' +
            '网站名称：xxxx\n' +
            '\n' +
            '网站地址：xxxx\n' +
            '\n' +
            '网站简介：xxxx\n' +
            '\n' +
            '网站logo尺寸：100*100'},
    ]
    return {activeName, aboutContent};
  },
}
</script>

<style scoped lang="scss">
@import "../../assets/style/variable";
</style>
