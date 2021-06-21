<!--申请友链-->
<template>
  <div class="link">
    <NavBar :title="'申请友链'"></NavBar>
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
        {{ demo.name }}<br>
        {{ demo.domain }}<br>
        {{ demo.describe }}<br>
        {{ demo.logo }}<br>
      </div>
    </div>
    <van-form @submit="onSubmit">
      <van-field
          v-model="state.username"
          name="网站名称"
          label="网站名称"
          placeholder="请输入网站名称"
          label-width="1.6rem"
          :rules="[{ required: true, message: '请填写网站名称' }]"
      />
      <van-field
          v-model="state.username"
          type="网站地址"
          name="网站地址"
          label="网站地址"
          placeholder="请输入完整URL地址"
          label-width="1.6rem"
          :rules="[{ required: true, message: '请填写网站地址' }]"
      />
      <van-field
          v-model="state.username"
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
            <van-uploader :after-read="afterRead"/>
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

<script>
import NavBar from "@/components/personal/NavBar";
import {Form, Field, Button, Uploader, Cell, CellGroup} from 'vant';
import {reactive} from "vue";

export default {
  components: {
    [Form.name]: Form,
    [Field.name]: Field,
    [Button.name]: Button,
    [Uploader.name]: Uploader,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    NavBar
  },
  name: "Pay",
  setup() {
    const title = '申请友链'
    const state = reactive({
      username: '',
      password: '',
    });
    const demo = {
      name: '崔亮的博客',
      logo: 'https://cdn.cuiliangblog.cn/logo_forground.png',
      describe: '专注devops自动化运维，传播优秀it运维技术文章',
      domain: 'https://www.cuiliangblog.cn'
    }
    const afterRead = (file) => {
      // 此时可以自行将文件上传至服务器
      console.log(file);
    };
    const onSubmit = (values) => {
      console.log('submit', values);
    };
    return {
      title,
      state,
      onSubmit,
      afterRead,
      demo
    }
  }
}
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
