<template>
  <el-container>
    <el-header>
      <span class="span" />
      <show-me></show-me>
    </el-header>
    <el-main>
      <router-view />
    </el-main>
  </el-container>
</template>
<style lang="less" scoped>
.el-header {
  display: flex;
}
.span {
  flex: 1;
}
</style>
<script lang="ts">
import Vue from "vue";
import ShowMe from "@/components/ShowMe.vue";
export default Vue.extend({
  components: {
    ShowMe
  }
});
</script>
