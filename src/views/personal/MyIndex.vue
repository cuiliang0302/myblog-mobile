<template>
  <div>
    <section>
      <div class="wave wave1"></div>
      <div class="wave wave2"></div>
      <div class="wave wave3"></div>
      <div class="wave wave4"></div>
      <div class="photo">
        <div class="username">
          <p v-if="isLogin">{{ userInfo.username }}</p>
          <p v-else>点击头像登录/注册</p>
        </div>
        <div>
          <van-image v-if="isLogin" :src="userInfo.photo" width="1.867rem" height="1.867rem" round>
            <template v-slot:loading>
              <van-loading type="spinner" size="20"/>
            </template>
          </van-image>
          <van-image v-else :src="logo" width="1.867rem" height="1.867rem"
                     round
                     @click="$router.push('/loginRegister')"
          >
            <template v-slot:loading>
              <van-loading type="spinner" size="20"/>
            </template>
          </van-image>
        </div>
      </div>
      <div class="history">
        <span><van-icon name="clock" size="0.8rem" color="#2ecc71"
                        @click="toView('/personal/myHistory')"/><p>浏览记录</p></span>
        <span><van-icon name="star" size="0.8rem" color="#f1c40f"
                        @click="toView('/personal/myCollect')"/><p>我的收藏</p></span>
        <span><van-icon name="chat" size="0.8rem" color="#9b59b6"
                        @click="toView('/personal/myComments')"/><p>我的评论</p></span>
        <span><van-icon name="todo-list" size="0.8rem" color="#e74c3c"
                        @click="toView('/personal/statistics')"/><p>数据统计</p></span>
      </div>
    </section>
    <div class="cell">
      <div class="cell-item">
        <van-cell-group title="账号与安全">
          <van-cell title="我的信息" size="large" is-link @click="toView('/personal/myInfo')"/>
          <van-cell title="修改密码" size="large" is-link @click="toView('/personal/changePassword')"/>
          <van-cell title="更换邮箱" size="large" is-link @click="toView('/personal/changeEmail')"/>
          <van-cell title="更换手机" size="large" is-link @click="toView('/personal/changePhone')"/>
          <van-cell title="订阅更新" size="large">
            <template #right-icon>
              <van-switch v-model="userInfo.is_flow" @change="changeFlow" size="0.533rem"/>
            </template>
          </van-cell>
        </van-cell-group>
      </div>
      <div class="cell-item">
        <van-cell-group title="支持与反馈">
          <van-cell title="赞赏支持" size="large" is-link to="/pay"/>
          <van-cell title="留言反馈" size="large" is-link to="/message"/>
          <van-cell title="申请友链" size="large" is-link to="/applyLink"/>
          <van-cell title="联系博主" size="large" is-link to="/contact"/>
        </van-cell-group>
      </div>
      <div class="cell-item">
        <van-cell-group title="系统与设置">
          <van-cell title="字体大小" size="large" is-link :value="fontType" to="/fontSize"/>
          <van-cell title="深色模式" size="large">
            <template #right-icon>
              <van-switch v-model="isDark" @change="changeDark" size="0.533rem"/>
            </template>
          </van-cell>
          <van-cell title="退出登录" size="large" is-link @click="logout"/>
        </van-cell-group>
      </div>
    </div>
    <LoginPopup ref="loginPopupRef"></LoginPopup>
    <Tabbar :activeBar="3"></Tabbar>
  </div>
</template>

<script setup>
import Tabbar from "@/components/common/Tabbar.vue";
import LoginPopup from "@/components/common/LoginPopup.vue";
import {Image as VanImage, Loading, Icon, Cell, CellGroup, Switch, Dialog, Toast} from 'vant';
import {computed, onMounted, reactive, ref} from "vue";
import store from "@/store/index";
import {useRouter} from "vue-router";
import router from "@/router";
import user from "@/utils/user";
import {getUserinfoId, putUserinfoId} from "@/api/account";
import fontSize from "@/utils/fontSize";
import {getSiteConfig} from "@/api/management";
import dark from "@/utils/dark";

// 提示登录组件对象
const loginPopupRef = ref(null)
// 引入公共方法
let {isLogin, userInfo, userId, toView, logo} = global()

// 引入系统与设置模块
let {changeFlow, fontType, isDark, changeDark, logout} = setting(userId, userInfo, isLogin, loginPopupRef)

// 公共方法
function global() {
  const router = useRouter()
  // 引入用户信息模块
  let {userId, isLogin} = user();
  // 用户信息
  const userInfo = reactive({})
  // 跳转到记录消息页
  const toView = (value) => {
    if (isLogin.value) {
      router.push(value)
    } else {
      console.log(value)
      console.log("没登录呢")
      store.commit('setNextPath', value)
      loginPopupRef.value.showPopup()
    }
  }
  // 网站logo
  const logo = ref()

  // 获取网站logo
  async function siteConfigData() {
    let siteConfig_data = await getSiteConfig()
    logo.value = siteConfig_data.logo
  }

  // 获取用户信息
  async function getUserinfo(userid) {
    const userinfo_data = await getUserinfoId(userid)
    console.log(userinfo_data)
    for (let i in userinfo_data) {
      userInfo[i] = userinfo_data[i]
    }
  }

  onMounted(() => {
    siteConfigData()
    if (isLogin.value) {
      getUserinfo(userId.value)
    }
  })
  return {
    logo,
    isLogin,
    userId,
    toView,
    userInfo
  }
}

function setting(userId, userInfo, isLogin, loginPopupRef) {
  // 引入暗黑模块
  let {setDark} = dark()
  // 引入字体设置模块
  let {fontType} = fontSize()
  // 切换订阅
  const changeFlow = (value) => {
    if (isLogin.value) {
      if (userInfo.email.length === 0) {
        // console.log("得绑定邮箱啊")
        Dialog.alert({
          message: '您的账号未绑定邮箱，请先绑定邮箱后再进行设置！',
        }).then(() => {
          router.push('/personal/changeEmail')
        });
      } else {
        if (value) {
          Toast('已开启文章订阅功能')
          userInfo.is_flow = true
        } else {
          Toast('已关闭文章订阅功能')
          userInfo.is_flow = false
        }
        putUserinfoId(userId.value, userInfo).then((response) => {
          console.log(response)
        }).catch(response => {
          //发生错误时执行的代码
          console.log(response)
        });
      }
    } else {
      // console.log("也没登录呀")
      userInfo.is_flow = false
      store.commit('setNextPath', router.currentRoute.value.fullPath)
      loginPopupRef.value.showPopup()
      return false
    }
  }
  // 是否开启暗黑模式
  const isDark = computed(() => store.state.dark)
  // 切换夜间模式
  const changeDark = (value) => {
    setDark(value)
    if (value) {
      Toast('已开启深色模式')
    } else {
      Toast('已关闭深色模式')
    }
  }
  // 注销
  const logout = () => {
    if (isLogin.value) {
      Dialog.confirm({
        title: '注销',
        message: '真的要退出登录吗？',
        confirmButtonText: '确认',
        cancelButtonText: '再想想',
      }).then(() => {
        localStorage.clear()
        sessionStorage.clear()
        Toast.success('成功退出，跳转至登录页')
        router.replace('/loginRegister')
      })
    } else {
      Toast('未曾登录，何来退出？')
      return false
    }
  }
  return {fontType, isDark, changeDark, logout, changeFlow}
}
</script>
<style scoped lang="scss">
@import "src/assets/style/index.scss";
//水波纹特效和背景图

section {
  position: relative;
  width: 100%;
  height: 2.64rem;
  background-image: url("/src/assets/images/personal-img.jpg");
  background-repeat: no-repeat;
  background-size: 100%;
  padding: 0 0 2.667rem 0;

  .wave {
    width: 100%;
    height: 2.667rem;
    position: absolute;
    bottom: 0;
    left: 0;
    @include background_img('background_img1');
    background-size: 26.667rem 2.667rem;
  }

  .wave.wave1 {
    animation: animate1 20s linear infinite;
    z-index: 4;
    opacity: 0.1;
    animation-delay: 0s;
    bottom: -15px;
  }

  .wave.wave2 {
    animation: animate2 15s linear infinite;
    z-index: 3;
    opacity: 0.2;
    animation-delay: -5s;
    bottom: -10px;
  }

  .wave.wave3 {
    animation: animate1 10s linear infinite;
    z-index: 2;
    opacity: 0.3;
    animation-delay: -7s;
    bottom: -5px;
  }

  .wave.wave4 {
    animation: animate2 5s linear infinite;
    z-index: 1;
    opacity: 0.4;
    animation-delay: -5s;
    bottom: 0;
  }

  .history {
    display: flex;
    @include background_color("background_color3");
    padding: 0.8rem 0 0.267rem 0;
    border-radius: 0.4rem;
    position: absolute;
    width: 95%;
    transform: translateX(-50%);
    left: 50%;
    bottom: -22.5%;
    z-index: 4;
    @include border_shadow("border_color2");

    span {
      flex: 1;
      text-align: center;

      p {
        margin-top: 0.187rem;
      }
    }
  }

  .photo {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 20%;
    z-index: 5;
    text-align: center;

    .username {
      p {
        font-size: 0.427rem;
        color: white;
        margin-bottom: 0.533rem;
      }
    }

    .van-image {
      @include border_shadow("border_color1");
    }
  }

}

@keyframes animate1 {
  0% {
    background-position-x: 0;
  }
  100% {
    background-position-x: 26.667rem;
  }
}

@keyframes animate2 {
  0% {
    background-position-x: 0;
  }
  100% {
    background-position-x: -26.667rem;
  }
}

.cell {
  margin-top: 1.467rem;

  .cell-item {
    margin: 0.267rem;
    @include background-color("cell-item-color");
    box-shadow: 0 0.027rem 0.107rem rgb(0 0 0 / 10%);
  }
}


</style>
