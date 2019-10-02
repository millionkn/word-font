<template>
  <el-card>
    <el-button @click="add">添加</el-button>
    <el-table :data="componentList">
      <el-table-column label="名称" prop="info.name"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope" class="unwrap">
          <el-button @click="uploadFile(scope.row)">重新上传</el-button>
          <el-button @click="editInfo(scope.row)">编辑信息</el-button>
          <el-button @click="deleteComponent(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>
<style lang="less" scoped>
.unwrap {
  display: flex;
  flex-wrap: nowrap;
}
</style>
<script lang="ts">
import Vue from "vue";
import Axios from "axios";
import { component } from "../types";
import router from "../router";
export default Vue.extend({
  props: ["componentList"],
  setup(props) {
    const componentList = props.componentList as component[];

    return {
      add() {
        router.push("/myComponent/upload");
      },
      uploadFile(row: component) {
        console.log(row);
      },
      editInfo(row: component) {},
      deleteComponent(row: component) {}
    };
  }
});
</script>