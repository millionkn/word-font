<template>
  <el-card>
    <el-button @click="add">添加</el-button>
    <el-table :data="componentList">
      <el-table-column label="名称" prop="info.name"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope" class="unwrap">
          <el-button @click="uploadFile(scope.row)">重新上传</el-button>
          <el-button @click="edit(scope.row)">编辑信息</el-button>
          <el-button @click="deleteComponent(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="重新上传" :visible="true" v-if="uploadVisible" @close="uploadVisible=false">
      <component-upload-button @uploadSuccess="uploadSuccessHandler"></component-upload-button>
    </el-dialog>
    <el-dialog title="编辑信息" :visible="true" v-if="updateVisible" @close="updateVisible=false">
      <component-editor :component="editing"></component-editor>
      <el-button type="primary" @click="putInfo(editing)">提交</el-button>
    </el-dialog>
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
import { component as _component, word } from "../types";
import router from "../router";
import { ref, watch } from "@vue/composition-api";
type component = _component & { id: string };
export default Vue.extend({
  props: ["componentList"],
  components: {
    FileUpload: () => import("@/components/ComponentUpload.vue"),
    ComponentEditor: () => import("@/components/ComponentEditor.vue"),
    ComponentUploadButton: () => import("@/components/ComponentUpload.vue")
  },
  setup(props) {
    const componentList = props.componentList as component[];
    let editing = ref(undefined as undefined | component);
    let uploadVisible = ref(false);
    let updateVisible = ref(false);
    return {
      uploadVisible,
      updateVisible,
      editing,
      add() {
        router.push("/myComponent/upload");
      },
      uploadFile(row: component) {
        editing.value = row;
        uploadVisible.value = true;
      },
      edit(row: component) {
        editing.value = row;
        updateVisible.value = true;
      },
      async deleteComponent(row: component) {
        await Axios.delete(`/component/${row.id}`);
        let index = componentList.indexOf(row);
        componentList.splice(index, 1);
      },
      putInfo: async (editing: component) => {
        await Axios.put(`/component/${editing.id}`, editing);
        updateVisible.value = false;
      },
      uploadSuccessHandler: async (data: { code: string }) => {
        if (!editing.value) {
          return;
        }
        await Axios.put(`/component/${editing.value.id}`, undefined, {
          params: { code: data.code }
        });
        uploadVisible.value = false;
      }
    };
  }
});
</script>