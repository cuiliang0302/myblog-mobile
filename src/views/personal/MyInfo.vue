<template>
  <div class="info">
    <PersonalNavBar :title="'我的信息'"></PersonalNavBar>
    <div class="photo">
      <UploadImg :imgURL="userInfoForm.photo" :dir="'photo'" @saveImg="saveImg"></UploadImg>
      <p>点击更换头像</p>
    </div>
    <van-form @submit="onSubmit">
      <van-field
          v-model="userInfoForm.username"
          name="用户名"
          label="用户名："
          placeholder="用户名"
          label-width="1.867rem"
          :rules="[{ validator: checkUsername, message: '请输入其他用户名' }]"
      />
      <van-field
          v-model="userInfoForm.source"
          name="用户来源"
          label="来源："
          placeholder="用户来源"
          label-width="1.867rem"
          readonly
      />
      <van-field
          v-model="userInfoForm.sex_name"
          readonly
          clickable
          label="性别："
          name="性别"
          placeholder="选择性别"
          label-width="1.867rem"
          @click="showSex = true"
      />
      <van-popup v-model:show="showSex" round position="bottom" :style="{ height: '30%' }"
                 close-on-popstate
                 safe-area-inset-bottom
                 overlay-class="my-overlay">
        <van-picker
            :columns="columns"
            @cancel="showSex = false"
            @confirm="chooseSex"
        />
      </van-popup>
      <!--      <van-field-->
      <!--          v-model="userInfoForm.phone"-->
      <!--          name="手机号"-->
      <!--          label="手机号："-->
      <!--          placeholder="点击按钮绑定手机号"-->
      <!--          label-width="1.867rem"-->
      <!--          readonly-->
      <!--      >-->
      <!--        <template #button>-->
      <!--          <van-button size="small" plain type="primary" @click="$router.push('/changePhone')">更换手机</van-button>-->
      <!--        </template>-->
      <!--      </van-field>-->
      <van-field
          v-model="userInfoForm.email"
          name="邮箱"
          label="邮箱："
          placeholder="点击按钮绑定邮箱号"
          label-width="1.867rem"
          readonly
      >
        <template #button>
          <van-button size="small" plain type="primary" @click="router.push('/personal/changeEmail')">更换邮箱
          </van-button>
        </template>
      </van-field>
      <van-field
          v-model="userInfoForm.area_name"
          readonly
          clickable
          name="地区"
          label="地区："
          placeholder="选择地区"
          label-width="1.867rem"
          @click="showArea=true"
      />
      <van-popup v-model:show="showArea" position="bottom" :style="{ height: '40%' }"
                 close-on-popstate
                 safe-area-inset-bottom
                 overlay-class="my-overlay">
        <van-area title="选择地区" :area-list="areaList" :columns-num="2" :value="userInfoForm.area_code"
                  @cancel="showArea=false"
                  @confirm="chooseArea"/>
      </van-popup>
      <van-field
          v-model="userInfoForm.birthday"
          readonly
          clickable
          name="生日"
          label="生日："
          placeholder="选择生日"
          label-width="1.867rem"
          @click="showBirthday=true"
          @confirm="chooseBirthday"
      />
      <van-popup v-model:show="showBirthday" position="bottom" :style="{ height: '40%' }"
                 close-on-popstate
                 safe-area-inset-bottom
                 overlay-class="my-overlay">
        <van-date-picker
            type="date"
            title="选择生日"
            :min-date="new Date(1980, 0, 1)"
            :max-date="new Date(2010, 11, 31)"
            @cancel="showBirthday=false"
            @confirm="chooseBirthday"
        />
      </van-popup>
      <van-field
          v-model="userInfoForm.web"
          name="个人站点"
          label="个人站点："
          placeholder="完整地址，如https://www.baidu.com/"
          label-width="1.867rem"
          :rules="[{ validator: checkWeb, message: '请输入正确的web地址' }]"
          clearable
      />
      <van-field
          v-model="userInfoForm.signature"
          rows="1"
          autosize
          name="个性签名"
          label="个性签名："
          type="textarea"
          label-width="1.867rem"
          placeholder="请输入个性签名"
          clearable
      />
      <div style="margin: 0.427rem;">
        <van-button round block type="primary" native-type="submit">
          更新资料
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script setup>
import PersonalNavBar from "@/components/personal/PersonalNavBar.vue";
import UploadImg from "@/components/common/UploadImg.vue";
import {onMounted, reactive, ref} from "vue";
import {storeToRefs} from 'pinia'
import {useThemeStore, useUserStore} from '@/store';
import {showFailToast, showSuccessToast} from "vant";
import account from "@/api/account";
import Public from "@/api/public";
import {areaList} from '@vant/area-data';
import {route} from "vant/es/composables/use-route";
import router from "@/router";

const user = useUserStore();


// 引入用户信息模块
// 我的信息表单
const userInfoForm = reactive({});
// 上传头像完成事件
const saveImg = (URL) => {
  userInfoForm.photo = URL
}
// 原始用户名
const oldUsername = ref()
// 异步校验用户名
const checkUsername = (val) =>
    new Promise((resolve) => {
      console.log(val)
      if (val !== oldUsername.value) {
        account.getRegister(val, NaN).then((response) => {
          console.log(response)
          resolve(true)
        }).catch(response => {
          //发生错误时执行的代码
          console.log(response)
          showFailToast(response.msg);
          resolve(false)
        });
      } else {
        resolve(true)
      }
    })
// 校验web地址
const checkWeb = (val) =>
    new Promise((resolve) => {
      console.log(val)
      const pattern = /[a-zA-z]+:\/\/[^\s]*/
      console.log(pattern.test(val))
      console.log(val.length)
      if (pattern.test(val) || val.length === 0) {
        resolve(true)
      } else {
        resolve(false)
      }
    });
// 性别选择框默认状态
const showSex = ref(false)
const columns = [
  { text: '男', value: '1' },
  { text: '女', value: '2' },
]
// 性别选择框确认事件
const chooseSex = (value) => {
  console.log(value['selectedOptions'][0]);
  userInfoForm.sex = value['selectedOptions'][0]['value']
  userInfoForm.sex_name = value['selectedOptions'][0]['text']
  showSex.value = false
};
// 地区选择框默认状态
const showArea = ref(false);
// 地区选择框确认事件
const chooseArea = (ConfirmResult) => {
  console.log(ConfirmResult);
  userInfoForm.area_code = ConfirmResult['selectedOptions'][1]['value']
  userInfoForm.area_name = ConfirmResult['selectedOptions'][0]['text'] + ConfirmResult['selectedOptions'][1]['text']
  console.log(userInfoForm)
  showArea.value = false
}
// 生日选择框默认状态
const showBirthday = ref(false)
// 生日选择框确认事件
const chooseBirthday = (value) => {
  console.log(value['selectedValues'])
  userInfoForm.birthday = value['selectedValues'][0] + '-' + value['selectedValues'][1] + '-' + value['selectedValues'][2]
  showBirthday.value = false
}
// 修改信息表单提交
const onSubmit = (values) => {
  console.log('点击了')
  console.log('submit', values);
  for (let i in userInfoForm) {
    if (userInfoForm[i] === '') {
      userInfoForm[i] = null
    }
  }
  account.putUserinfoId(user.user_id, userInfoForm).then((response) => {
    console.log(response)
    showSuccessToast('信息修改成功！');
  }).catch(response => {
    //发生错误时执行的代码
    console.log(response)
    showFailToast('修改信息失败!');
  });
};

// 获取用户信息
const getUserinfo = async (userid) => {
  try {
    const userinfo_data = await account.getUserinfoId(userid)
    console.log(userinfo_data)
    for (let i in userinfo_data) {
      userInfoForm[i] = userinfo_data[i]
    }
    oldUsername.value = userInfoForm.username
  } catch (e) {
    console.log(e)
    showFailToast("获取用户信息失败")
  }
}

onMounted(() => {
  getUserinfo(user.user_id)
})
</script>

<style scoped lang="less">
//@import "src/assets/style/index";
.photo {
  text-align: center;
  padding-top: 0.533rem;
  //@include background_color('background_color6');

  p {
    font-size: 0.373rem;
    margin: 0;
    padding: 0.267rem 0;
    //@include font_color('font_color1')
  }
}
</style>
