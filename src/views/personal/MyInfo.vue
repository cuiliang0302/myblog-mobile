<template>
  <div class="info">
    <NavBar :title="title"></NavBar>
    <div class="photo">
      <van-uploader :after-read="afterRead">
        <van-image round width="2.667rem" height="2.667rem" :src="userInfoForm.photo"/>
      </van-uploader>
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
          v-model="userInfoForm.sex_name"
          readonly
          clickable
          label="性别："
          name="性别"
          placeholder="选择性别"
          label-width="1.867rem"
          @click="showSex = true"
      />
      <van-popup v-model:show="showSex" round position="bottom" :style="{ height: '30%' }">
        <van-picker
            :columns="columns"
            @cancel="showSex = false"
            @confirm="chooseSex"
        />
      </van-popup>
      <van-field
          v-model="userInfoForm.phone"
          name="手机号"
          label="手机号："
          placeholder="点击按钮绑定手机号"
          label-width="1.867rem"
          readonly
      >
        <template #button>
          <van-button size="small" plain type="primary" @click="$router.push('/change-phone')">更换手机</van-button>
        </template>
      </van-field>
      <van-field
          v-model="userInfoForm.email"
          name="邮箱"
          label="邮箱："
          placeholder="点击按钮绑定邮箱号"
          label-width="1.867rem"
          readonly
      >
        <template #button>
          <van-button size="small" plain type="primary" @click="$router.push('/change-email')">更换邮箱</van-button>
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
      <van-popup v-model:show="showArea" position="bottom" :style="{ height: '40%' }">
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
      <van-popup v-model:show="showBirthday" position="bottom" :style="{ height: '40%' }">
        <van-datetime-picker
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
      />
      <van-field
          v-model="userInfoForm.signature"
          rows="1"
          autosize
          name="个人简介"
          label="个人简介："
          type="textarea"
          label-width="1.867rem"
          placeholder="请输入个人简介"
      />
      <div style="margin: 0.427rem;">
        <van-button round block type="primary" native-type="submit">
          更新资料
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import NavBar from "@/components/personal/NavBar";
import {
  Form,
  Field,
  Button,
  Uploader,
  Cell,
  CellGroup,
  Toast,
  Picker,
  Popup,
  Image as VanImage,
  Area,
  DatetimePicker
} from 'vant';
import {computed, onMounted, reactive, ref} from "vue";
import {getRegister, getUserinfoId, postLogin, putUserinfoId} from "@/api/personal";
import user from "@/utils/user";
import qiniuUpload from "@/utils/qiniuUpload";
import store from "@/store";
import {areaList} from "@vant/area-data";
import timeFormat from "@/utils/timeFormat";

export default {
  components: {
    [Form.name]: Form,
    [Field.name]: Field,
    [Button.name]: Button,
    [Uploader.name]: Uploader,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Picker.name]: Picker,
    [Popup.name]: Popup,
    [VanImage.name]: VanImage,
    [Area.name]: Area,
    [DatetimePicker.name]: DatetimePicker,
    NavBar,
    Toast,
  },
  name: "MyInfo",
  setup() {
    // 格式化处理时间
    // let {timeNowDate} = timeFormat()
    // 七牛图片上传
    let {upload} = qiniuUpload()
    // 引入用户信息模块
    let {userId, isLogin} = user();
    const title = "我的信息"
    // 我的信息表单
    const userInfoForm = reactive({});
    // 原始用户名
    const oldUsername = ref()
    // 异步校验用户名
    const checkUsername = (val) =>
        new Promise((resolve) => {
          console.log(val)
          if (val !== oldUsername.value) {
            getRegister(val, NaN).then((response) => {
              console.log(response)
              resolve(true)
            }).catch(response => {
              //发生错误时执行的代码
              console.log(response)
              Toast.fail(response.msg);
              resolve(false)
            });
          } else {
            resolve(true)
          }
        })
    // 性别选择框默认状态
    const showSex = ref(false)
    const columns = ['男', '女'];
    // 性别选择框确认事件
    const chooseSex = (value, index) => {
      // Toast(`当前值: ${value}, 当前索引: ${index}`);
      userInfoForm.sex = index + 1
      userInfoForm.sex_name = value
      showSex.value = false
    };
    const onCancel = () => Toast('取消');
    // 地区选择框默认状态
    const showArea = ref(false);
    // 地区选择框确认事件
    const chooseArea = (ConfirmResult) => {
      userInfoForm.area_code = ConfirmResult[1].code
      userInfoForm.area_name = ConfirmResult[0].name + ConfirmResult[1].name
      showArea.value = false
    }
    // 生日选择框默认状态
    const showBirthday = ref(false)
    // 生日选择框确认事件
    const chooseBirthday = (value) => {
      userInfoForm.birthday = value.getFullYear() + '-' + (parseInt(value.getMonth()) + 1) + '-' + value.getDate()
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
      putUserinfoId(userId.value, userInfoForm).then((response) => {
        console.log(response)
        Toast.success('信息修改成功！');
      }).catch(response => {
        //发生错误时执行的代码
        console.log(response)
        for (let i in response) {
          Toast.fail(i + response[i][0]);
        }
      });
    };
    // 头像上传
    const afterRead = (file) => {
      upload('photo', file.file).then((response) => {
        console.log(response)
        userInfoForm.photo = response
        Toast.success('图片上传成功！');
      }).catch(response => {
        //发生错误时执行的代码
        console.log(response)
        Toast.fail('图片上传失败！');
      });
    };

    // 获取用户信息
    async function getUserinfo(userid) {
      const userinfo_data = await getUserinfoId(userid)
      console.log(userinfo_data)
      for (let i in userinfo_data) {
        userInfoForm[i] = userinfo_data[i]
      }
      oldUsername.value = userInfoForm.username
    }

    onMounted(() => {
      getUserinfo(userId.value)
    })
    return {
      title,
      userInfoForm,
      oldUsername,
      checkUsername,
      showSex,
      onSubmit,
      columns,
      onCancel,
      chooseSex,
      afterRead,
      areaList,
      showArea,
      chooseArea,
      showBirthday,
      chooseBirthday,
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/style/variable";

.photo {
  text-align: center;
  padding-top: 0.533rem;
  background-color: $color-background-white;

  p {
    font-size: 0.373rem;
    margin: 0;
    padding: 0.267rem 0;
    color: $color-text-regular;
  }
}
</style>
