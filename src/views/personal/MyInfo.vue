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
          :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
          v-model="userInfoForm.sex"
          readonly
          clickable
          label="性别："
          placeholder="选择性别"
          label-width="1.867rem"
          @click="showSex = true"
      />
      <van-popup v-model:show="showSex" round position="bottom" :style="{ height: '15%' }">
        <van-picker
            :columns="columns"
            @cancel="showSex = false"
            @confirm="onConfirm"
        />
      </van-popup>
      <van-field
          v-model="userInfoForm.phone"
          name="手机号"
          label="手机号："
          placeholder="手机号"
          label-width="1.867rem"
          readonly
      >
        <template #button>
          <van-button size="small" plain type="default">更换手机</van-button>
        </template>
      </van-field>
      <van-field
          v-model="userInfoForm.email"
          name="邮箱"
          label="邮箱："
          placeholder="邮箱"
          label-width="1.867rem"
          readonly
      >
        <template #button>
          <van-button size="small" plain type="default">更换邮箱</van-button>
        </template>
      </van-field>
      <van-field
          v-model="userInfoForm.area_name"
          readonly
          clickable
          label="地区："
          placeholder="选择地区"
          label-width="1.867rem"
          @click="showArea=true"
      />
      <van-popup v-model:show="showArea" position="bottom" :style="{ height: '30%' }">
        <van-area title="选择地区" :area-list="areaList" :columns-num="2" :value="userInfoForm.area_code"
                  @cancel="showArea=false"
                  @confirm="chooseArea"/>
      </van-popup>
      <van-field
          v-model="userInfoForm.birthday"
          readonly
          clickable
          label="生日："
          placeholder="选择生日"
          label-width="1.867rem"
          @click="showBirthday=true"
          @confirm="chooseBirthday"
      />
      <van-popup v-model:show="showBirthday" position="bottom" :style="{ height: '30%' }">
        <van-datetime-picker
            type="date"
            title="选择生日"
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
import {getUserinfoId} from "@/api/personal";
import user from "@/utils/user";
import store from "@/store";
import {areaList} from "@vant/area-data";

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
    // 引入用户信息模块
    let {userInfo} = user();
    const title = "我的信息"
    // 我的信息表单
    const userInfoForm = reactive({});
    // 选择框显示状态
    const showSex = ref(false)
    const columns = ['男', '女'];
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
      console.log(value)
      userInfoForm.birthday = value.getFullYear() + '/' + (parseInt(value.getMonth()) + 1) + '/' + value.getDate()
      showBirthday.value = false
    }
    const onConfirm = (value, index) => {
      Toast(`当前值: ${value}, 当前索引: ${index}`);
    };
    const onChange = (value, index) => {
      Toast(`当前值: ${value}, 当前索引: ${index}`);
    };
    const onCancel = () => Toast('取消');
    const onSubmit = (values) => {
      console.log('submit', values);
    };
    const afterRead = (file) => {
      // 此时可以自行将文件上传至服务器
      console.log(file);
    };

    // 获取用户信息
    async function getUserinfo(userid) {
      const userinfo_data = await getUserinfoId(userid)
      console.log(userinfo_data)
      for (let i in userinfo_data) {
        userInfoForm[i] = userinfo_data[i]
      }
    }

    onMounted(() => {
      const userid = userInfo.userid
      getUserinfo(userid)
    })
    return {
      userInfo,
      title,
      userInfoForm,
      showSex,
      onSubmit,
      columns,
      onChange,
      onCancel,
      onConfirm,
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
