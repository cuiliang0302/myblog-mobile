<template>
  <div class="my-index">
    <section>
      <div class="wave wave1"></div>
      <div class="wave wave2"></div>
      <div class="wave wave3"></div>
      <div class="wave wave4"></div>
      <div class="photo">
        <div class="username">
          <p v-if="user.isLoggedIn">{{ userInfo.username }}</p>
          <p v-else>点击头像登录/注册</p>
        </div>
        <div>
          <van-image v-if="user.isLoggedIn" :src="userInfo.photo" width="1.867rem" height="1.867rem" round>
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
          <!--          <van-cell title="更换手机" size="large" is-link @click="toView('/personal/changePhone')"/>-->
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
          <van-cell title="字体大小" size="large" is-link :value="font_name" to="/fontSize"/>
          <van-cell title="深色模式" size="large">
            <template #right-icon>
              <van-switch v-model="is_dark" @change="changeDark" size="0.533rem"/>
            </template>
          </van-cell>
          <van-cell title="主题颜色" size="large" is-link :value="theme_name" @click="clickTheme"/>
          <van-popup v-model:show="show_theme_picker" destroy-on-close round position="bottom">
            <van-picker
                :model-value="theme_value"
                :columns="columns"
                @cancel="show_theme_picker = false"
                @confirm="onConfirm"
            />
          </van-popup>
          <van-cell title="退出登录" size="large" is-link @click="logout"/>
        </van-cell-group>
      </div>
    </div>
    <LoginPopup ref="loginPopupRef"></LoginPopup>
    <Tabbar :activeBar="3"></Tabbar>
  </div>
</template>

<script setup>
import {onMounted, reactive, ref} from "vue";
import {
  Image as VanImage,
  showFailToast,
  showSuccessToast, showConfirmDialog, showToast, showDialog
} from 'vant';
import {useCommonStore, useThemeStore, useUserStore} from '@/store';
import Tabbar from "@/components/common/Tabbar.vue";
import LoginPopup from "@/components/common/LoginPopup.vue";
import router from "@/router";
import account from "@/api/account";
import management from "@/api/management";
import {storeToRefs} from 'pinia'
import { useDark, useToggle } from '@vueuse/core'
const user = useUserStore();
const common = useCommonStore();
const theme = useThemeStore();
const {font_name, is_dark, theme_name, theme_color} = storeToRefs(theme)
// 提示登录组件对象
const loginPopupRef = ref(null)
// 用户信息
const userInfo = reactive({})
// 获取用户信息
const getUserinfo = async () => {
  try {
    const userinfo_data = await account.getUserinfo()
    console.log(userinfo_data)
    Object.assign(userInfo, userinfo_data[0])
  } catch (error) {
    console.log(error)
    showFailToast('获取个人信息失败!')
  }
}
// 跳转到记录消息页
const toView = (value) => {
  if (user.isLoggedIn) {
    router.push(value)
  } else {
    console.log(value)
    common.setNextPath(router.currentRoute.value.fullPath)
    loginPopupRef.value.showPopup()
  }
}
// 网站logo
const logo = ref('')

// 获取网站logo
const siteConfigData = async () => {
  try {
    let siteConfig_data = await management.getSiteConfig()
    logo.value = siteConfig_data.logo
  } catch (error) {
    console.log(error)
    showFailToast('获取网站logo失败！');
  }
}
// 切换订阅
const changeFlow = (value) => {
  if (user.isLoggedIn) {
    if (userInfo.email.length === 0) {
      // console.log("得绑定邮箱啊")
      showDialog({
        message: '您的账号未绑定邮箱，请先绑定邮箱后再进行设置！',
      }).then(() => {
        router.push('/personal/changeEmail')
      });
    } else {
      if (value) {
        showToast({message: '已开启文章订阅，发布新文章后您将收到邮件提醒', duration: 5000})
        userInfo.is_flow = true
      } else {
        showToast({message: '已关闭文章订阅，发布新文章后您将不再收到邮件提醒', duration: 5000})
        userInfo.is_flow = false
      }
      account.putUserinfoId(user.user_id, userInfo).then((response) => {
        console.log(response)
      }).catch(response => {
        //发生错误时执行的代码
        console.log(response)
      });
    }
  } else {
    // console.log("也没登录呀")
    userInfo.is_flow = false
    common.setNextPath(router.currentRoute.value.fullPath)
    loginPopupRef.value.showPopup()
    return false
  }
}
const isDark = useDark()
const toggleDark = useToggle(isDark)
const isAnimating = ref(false) // 防止动画期间重复点击
// 切换夜间模式
const changeDark = (e) => {
  if (isAnimating.value) return

  // 获取点击位置（同时支持鼠标和触摸事件）
  const x = e.clientX || e.touches?.[0]?.clientX || window.innerWidth / 2
  const y = e.clientY || e.touches?.[0]?.clientY || window.innerHeight / 2

  // 计算扩散半径（覆盖最远角落）
  const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
  )

  // 动画定义
  const clipPath = [
    `circle(0px at ${x}px ${y}px)`,
    `circle(${radius}px at ${x}px ${y}px)`
  ]

  // 不支持 View Transitions API 的浏览器
  if (!document.startViewTransition) {
    toggleDark()
    return
  }

  isAnimating.value = true
  const isDarkBefore = isDark.value

  const transition = document.startViewTransition(() => {
    toggleDark()
  })

  transition.ready.then(() => {
    // 统一在新视图上执行动画
    document.documentElement.animate(
        {
          clipPath: isDarkBefore ? [...clipPath].reverse() : clipPath
        },
        {
          duration: 600,
          easing: 'ease-in-out',
          pseudoElement: '::view-transition-new(root)'
        }
    )
  })

  // 动画结束后重置状态
  transition.finished.finally(() => {
    isAnimating.value = false
  })
}
// 切换主题色弹窗是否显示
const show_theme_picker = ref(false);
// 主题色值
const theme_value = ref([])
// 主题色选项
const columns = [
  {text: '拂晓蓝(默认)', value: '#409eff'},
  {text: '薄暮红', value: '#e74c3c'},
  {text: '火山橘', value: '#e67e22'},
  {text: '日暮黄', value: '#f1c40f'},
  {text: '极光绿', value: '#16a085'},
  {text: '绝绝紫', value: '#9b59b6'},
];
// 点击切换主题色事件
const clickTheme = () => {
  theme_value.value = Array.of(theme_color);
  show_theme_picker.value = true
}
// 主题换肤确认事件
const onConfirm = ({selectedValues, selectedOptions}) => {
  theme.toggleTheme(selectedOptions[0].text, selectedValues[0])
  show_theme_picker.value = false;
  theme_value.value = selectedValues;
};
// 注销
const logout = () => {
  if (user.isLoggedIn) {
    showConfirmDialog({
      title: '注销',
      message: '真的要退出登录吗？',
      confirmButtonText: '确认',
      cancelButtonText: '再想想',
    }).then(() => {
      user.logout()
      showSuccessToast('成功退出，跳转至登录页')
      router.replace('/loginRegister')
    })
  } else {
    showToast('未曾登录，何来退出？')
    return false
  }
}
onMounted(() => {
  if (user.isLoggedIn) {
    getUserinfo()
  } else {
    siteConfigData()
  }
})
</script>
<style lang="less" scoped>
//@import "src/assets/style/index.scss";
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
    //background-image: url("/src/assets/images/wave-light.png");
    background-image: var(--background_img);
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
    background-color: var(--background_color3);
    padding: 0.8rem 0 0.267rem 0;
    border-radius: 0.4rem;
    position: absolute;
    width: 95%;
    transform: translateX(-50%);
    left: 50%;
    bottom: -22.5%;
    z-index: 4;
    box-shadow: var(--box_shadow);

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
      color: var(--border_color1)
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
    //@include background-color("cell-item-color");
    box-shadow: 0 0.027rem 0.107rem rgb(0 0 0 / 10%);
  }
}

.van-theme-light .wave {
  background-image: url("/src/assets/images/wave-light.png");
}

.van-theme-dark .wave {
  background-image: url("/src/assets/images/wave-dark.png");
}

:deep(.van-cell-group__title) {
  color: var(--van-primary-color)
}
</style>
