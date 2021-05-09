<template>
  <div class="info">
    <NavBar :title="title"></NavBar>
    <div class="photo">
      <van-uploader :after-read="afterRead">
        <van-image round width="2.667rem" height="2.667rem" src="https://img.yzcdn.cn/vant/cat.jpeg"/>
      </van-uploader>
      <p>点击更换头像</p>
    </div>
    <van-form @submit="onSubmit">

      <van-field
          v-model="state.username"
          name="用户名"
          label="用户名"
          placeholder="用户名"
          label-width="1.867rem"
          :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
          v-model="state.value"
          readonly
          clickable
          label="性别"
          placeholder="选择性别"
          label-width="1.867rem"
          @click="state.showPicker = true"
      />
      <van-popup v-model:show="state.showPicker" round position="bottom">
        <van-picker
            :columns="columns"
            @cancel="state.showPicker = false"
            @confirm="onConfirm"
        />
      </van-popup>
      <van-field
          v-model="state.username"
          name="个人站点"
          label="个人站点"
          placeholder="个人站点"
          label-width="1.867rem"
          :rules="[{ required: true, message: '请填写个人站点' }]"
      />
      <van-field
          v-model="state.username"
          rows="1"
          autosize
          label="个人简介"
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
import {Form, Field, Button, Uploader, Cell, CellGroup, Toast, Picker, Popup, Image as VanImage} from 'vant';
import {reactive, ref} from "vue";

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
    NavBar,
    Toast,
  },
  name: "MyInfo",
  setup() {
    const title = "我的信息"
    const state = reactive({
      username: '',
      password: '',
    });
    const columns = ['男', '女'];

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
    return {
      title,
      state,
      onSubmit,
      columns,
      onChange,
      onCancel,
      onConfirm,
      afterRead
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
    color: $color-text-primary;
  }
}
</style>
