<template>
  <div class="photo">
    <van-image
        v-if="imgURL.length===0"
        round
        width="2.667rem" height="2.667rem"
        :src="imgURL"
    >
      <template v-slot:loading>
        <van-icon name="add-o" size="1.5rem" color="#C0C4CC"/>
      </template>
    </van-image>
    <van-image
        v-else
        round
        width="2.667rem" height="2.667rem"
        :src="imgURL"
    >
      <template v-slot:loading>
        <van-loading type="spinner" size="20"/>
      </template>
    </van-image>
    <input class="uploadBtn" type="file" accept="image/*" @change="onChange"/>
    <Cropper v-if="photoCrop.cropperVisible"
             :imagePath="photoCrop.imagePath"
             fileType="blob"
             @save="onSave"
             @cancel="onCancel"
    />
  </div>
</template>

<script setup>
import Cropper from "vue3-cropper";
import 'vue3-cropper/lib/vue3-cropper.css';
import {reactive} from "vue";
import {Toast} from "vant";
import qiniuUpload from "@/utils/qiniuUpload";
import timeFormat from "@/utils/timeFormat";
import {Image as VanImage, Loading, Icon} from 'vant';

const URL = window.URL || window.webkitURL;
const props = defineProps({
  // 上传图片目录
  dir: {
    type: String,
    required: true,
    default: 'upload'
  },
  // 图片地址
  imgURL: {
    type: String,
    required: false,
    default: ''
  }
})
const emit = defineEmits(['saveImg'])
// 七牛图片上传
let {upload} = qiniuUpload()
// 格式化处理时间
let {timeFile} = timeFormat()
// 图片裁剪对象
const photoCrop = reactive({
  cropperVisible: false,
  imagePath: '',
})
// 裁剪框改变事件
const onChange = (e) => {
  const file = e.target.files[0]
  photoCrop.imagePath = URL.createObjectURL(file);
  photoCrop.cropperVisible = true
};
// 裁剪框确定事件
const onSave = (res) => {
  console.log(res)
  //blob转file
  const file = new File([res], timeFile(Date.now()) + '.jpg', {type: res.type});
  upload(props.dir, file).then((response) => {
    console.log(response)
    emit('saveImg', response)
    Toast.success('图片上传成功！');
  }).catch(response => {
    //发生错误时执行的代码
    console.log(response)
    Toast.fail('图片上传失败！');
  });
  photoCrop.cropperVisible = false
};
// 裁剪框取消事件
const onCancel = () => {
  photoCrop.cropperVisible = false
};
</script>
<style lang="scss">
.photo {
  position: relative;

  .uploadBtn {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    height: 100px;
    width: 100px;
    opacity: 0;
  }
}
</style>

