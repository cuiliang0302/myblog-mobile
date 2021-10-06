<!--绑定第三放账号-->
<template>
  <div>
    <PersonalNavBar :title="'绑定第三方账号'"></PersonalNavBar>
    <van-cell-group>
      <van-cell v-for="(item,index) in state" :key="index" :title="item.name" center>
        <template #right-icon>
          <van-switch v-model="item.is_binding" size="24" @click="changeBinding(index,item.name,item.is_binding)"/>
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script setup>
import PersonalNavBar from "@/components/personal/PersonalNavBar.vue";
import {Cell, CellGroup, Switch, Toast, Dialog} from 'vant';
import {reactive} from "vue";


const state = reactive([
  {name: 'GitHub', is_binding: true},
  {name: 'QQ', is_binding: true},
  {name: '微博', is_binding: false}
]);
const changeBinding = (index, name, value) => {
  if (value) {
    Toast('页面跳转')
  } else {
    Dialog.confirm({
      title: '解除绑定',
      message: '确定要解除绑定的' + name + '账号？',
    })
        .then(() => {
          Toast('已解除绑定')
        })
        .catch(() => {
          state[index].is_binding = true
          // on cancel
        });
  }
}
</script>

<style lang="scss" scoped>

</style>
