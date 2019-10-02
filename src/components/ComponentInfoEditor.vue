<template>
  <div>
    <div class="item">
      <div class="key">说明:</div>
      <el-input
        type="textarea"
        :rows="5"
        placeholder="请输入说明"
        v-model="data.introduction"
        class="value"
      ></el-input>
    </div>
  </div>
</template>
<style lang="less" scoped>
.item {
  display: flex;
}
.value {
  flex: 1;
}
</style>
<script lang="ts">
import Vue from "vue";
import { component } from "../types";
import store from "../store";
export default Vue.extend({
  props: ["data"]
});
</script>