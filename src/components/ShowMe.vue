<template>
  <div class="root">
    <div v-if="currentUser" class="root">
      <span>欢迎您,{{currentUser.username}}</span>
      <el-avatar icon="el-icon-user-solid"></el-avatar>
      <el-link @click="logout">退出</el-link>
    </div>
    <div v-else>
      <router-link to="/login">
        <el-link type="primary">登录</el-link>
      </router-link>
    </div>
  </div>
</template>
<style lang="less" scoped>
.root {
  display: flex;
  align-items: center;
}
</style>
<script lang="ts">
import Vue from "vue";
import store from "@/store";
import { computed } from "@vue/composition-api";
import router from "../router";
export default Vue.extend({
  setup() {
    return {
      currentUser: computed(() => store.state.currentUser),
      logout: async () => {
        await store.dispatch("logout");
        await router.replace("/");
      }
    };
  }
});
</script>