<template>
  <div>
    <div class="item">
      <div class="key">名称:</div>
      <el-input placeholder="请输入名称" v-model="info.name" class="value"></el-input>
    </div>
    <div class="item">
      <div class="key">说明:</div>
      <el-input
        type="textarea"
        :rows="5"
        placeholder="请输入说明"
        v-model="info.introduction"
        class="value"
      ></el-input>
    </div>
    <word-selector :wordIdArray="wordIdArray" :height="500"></word-selector>
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
import WordSelector from "@/components/WordSelector.vue";
import { component } from "../types";
export default Vue.extend({
  props: ["component"],
  components: {
    WordSelector
  },
  setup(props) {
    let component = props.component as component;
    return {
      info: component.info,
      wordIdArray: component.words
    };
  }
});
</script>