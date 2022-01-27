<!--申请友链-->
<template>
  <div class="link">
    <PersonalNavBar :title="'申请友链'"></PersonalNavBar>
    <div class="ask">
      <div class="title">
        <h2>申请须知</h2>
        <span>
        </span>
      </div>
      <div class="content">
        🥇 请确保贵站可以持续稳定运营<br>
        🥈 原创博客优先，技术类博客优先<br>
        🥉️ 申请前请先添加本站点友链<br>
        🤗️ 欢迎小伙伴们一起互相友链<br>
      </div>
    </div>
    <div class="demo">
      <div class="title">
        <h2>申请示例</h2>
        <span>
        </span>
      </div>
      <div class="content">
        网站名称：{{ webInfo.name }}<br>
        网站地址：{{ webInfo.domain }}<br>
        网站简介：{{ webInfo.describe }}<br>
        网站logo：{{ webInfo.logo }}<br>
      </div>
    </div>
    <van-form @submit="onSubmit">
      <van-field
          v-model="linkForm.name"
          name="网站名称"
          label="网站名称"
          placeholder="请输入网站名称"
          label-width="1.6rem"
          :rules="[{ required: true, message: '请填写网站名称' }]"
      />
      <van-field
          v-model="linkForm.url"
          type="网站地址"
          name="网站地址"
          label="网站地址"
          placeholder="请输入完整URL地址"
          label-width="1.6rem"
          :rules="[{ validator: checkWeb, message: '请输入正确的web地址' }]"
      />
      <van-field
          v-model="linkForm.describe"
          type="网站简介"
          name="网站简介"
          label="网站简介"
          placeholder="请输入网站简介"
          label-width="1.6rem"
          :rules="[{ required: true, message: '请填写网站简介' }]"
      />
      <van-cell center title="网站logo">
        <template #extra>
          <div class="upload">
            <UploadImg :imgURL="linkForm.logo" :dir="'logo'" @saveImg="saveImg"></UploadImg>
          </div>
        </template>
      </van-cell>
      <div style="margin: 0.427rem;">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script setup>
import PersonalNavBar from "@/components/personal/PersonalNavBar.vue";
import {Form, Field, Button, Uploader, Cell, CellGroup, Toast} from 'vant';
import {onMounted, reactive} from "vue";
import UploadImg from "@/components/common/UploadImg.vue";
import {getSiteConfig, postLink} from "@/api/management";


const linkForm = reactive({
  name: '',
  logo: '',
  url: '',
  describe: ''
});
const webInfo = reactive({
  name: '',
  logo: '',
  describe: '',
  domain: ''
})
// 校验web地址
const checkWeb = (val) =>
    new Promise((resolve) => {
      console.log(val)
      const pattern = /[a-zA-z]+:\/\/[^\s]*/
      console.log(pattern.test(val))
      if(pattern.test(val)){
        resolve(true)
      }else {
        resolve(false)
      }
    });
// 上传logo完成事件
const saveImg = (URL) => {
  linkForm.logo = URL
}
// 表单提交
const onSubmit = () => {
  console.log(linkForm);
  if (linkForm.logo.length === 0) {
    Toast.fail('请上传logo图片');
    return false
  }
  postLink(linkForm).then((response) => {
    console.log(response)
    Toast.success('申请提交成功！');
    linkForm.url = ''
    linkForm.name = ''
    linkForm.describe = ''
    linkForm.logo = ''
  }).catch(response => {
    //发生错误时执行的代码
    console.log(response)
    for (let i in response) {
      Toast.fail(i + response[i][0]);
    }
  });
};

// 获取网站配置数据
async function siteConfigData() {
  let siteConfig_data = await getSiteConfig()
  console.log(siteConfig_data)
  webInfo.name = siteConfig_data.name
  webInfo.logo = siteConfig_data.logo
  webInfo.describe = siteConfig_data.title.slice(6)
  webInfo.domain = siteConfig_data.domain
}

onMounted(() => {
  siteConfigData()
})
</script>

<style scoped lang="scss">
.link {
  .title {
    margin: 0.4rem;

    h2 {
      margin: 0;
      padding: 0;
      font-weight: normal;
    }

    span {
      display: inline-block;
      height: 3px;
      width: 2rem;
      background-image: linear-gradient(to right, #3498db, #2ecc71);
    }
  }

  .content {
    margin-left: 0.4rem;
    margin-bottom: 0.4rem;
    font-size: 0.373rem;
    line-height: 0.64rem;
  }
}

.van-cell--center {
  height: 3.067rem;

  .upload {
    position: absolute;
    left: 22.5%;
  }
}
</style>
