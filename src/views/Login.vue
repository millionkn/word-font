<template>
  <el-container class="center">
    <el-main>
      <el-card>
        <div slot="header" class="clearfix">
          <span>xxx系统</span>
        </div>
        <el-form :model="form" @submit.native.prevent="submit">
          <el-form-item>
            <el-input v-model="form.username" placeholder="请输入用户名" name="username"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="form.password" placeholder="请输入密码" show-password name="password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submit">登录</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-main>
  </el-container>
</template>
<style lang="less" scoped>
.center{
  height:100%;
}
.el-main{
  display: flex;
  justify-content:center;
  align-items:center;
}
</style>
<script lang="ts">
import Vue from "vue";
import { reactive } from "@vue/composition-api";
import store from "@/store";
import router from "@/router";
import { MessageBox,Message } from 'element-ui';
export default Vue.extend({
  setup(initProps,setupContext) {
    let form = reactive({
      username: "",
      password: "",
    });
    return {
      form,
      submit: async () => {
        try{
          let user = await store.dispatch("login",form);
          Message.success(`欢迎您，${user.username}`);
          await router.replace("/");
        }catch(e){
          MessageBox.alert(e,"错误");
        }
      }
    };
  }
});
</script>