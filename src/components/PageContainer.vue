<template>
  <el-container>
    <el-header>
      <span class="span" />
      <tool-bar></tool-bar>
      <show-me></show-me>
    </el-header>
    <el-main class="container">
      <div class="page">
        <router-view />
      </div>
    </el-main>
  </el-container>
</template>
<style lang="less" scoped>
.el-header,
.container {
  display: flex;
}
.container {
  justify-content: center;
}
.page {
  width: 800px;
}
.span {
  flex: 1;
}
</style>
<script lang="ts">
import Vue from "vue";
import ShowMe from "@/components/ShowMe.vue";
import ToolBar from "@/components/ToolBar.vue";
export default Vue.extend({
  components: {
    ToolBar,
    ShowMe
  }
});
</script>
