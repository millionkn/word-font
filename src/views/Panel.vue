<template>
  <div class="root">
    <div class="block" @click="onClick('/review')">
      <el-card>复习</el-card>
    </div>
    <div class="block">
      <el-card>课程管理</el-card>
    </div>
    <div class="block">
      <el-card>插件管理</el-card>
    </div>
    <div class="block">
      <el-card>历史统计</el-card>
    </div>
  </div>
</template>
<style lang="less" scoped>
.root {
  display: flex;
  flex-wrap: wrap;
}
.block {
  width: 50%;
  height: 240px;
  display: flex;
  align-items: stretch;
}
.block > .el-card {
  margin: 20px;
  flex: 1;
  cursor: pointer;
}
</style>
<script lang="ts">
import Vue from "vue";
import router from "../router";
export default Vue.extend({
  setup() {
    return {
      onClick(url: string) {
        router.push(url);
      }
    };
  }
});
</script>