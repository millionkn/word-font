<template>
  <el-table :data="tableData" :max-height="600">
    <el-table-column label="id" prop="id"></el-table-column>
    <el-table-column label="描述" prop="describe"></el-table-column>
    <el-table-column align="right">
      <template slot="header">
        <el-input size="mini" placeholder="输入关键字搜索" v-model="s" />
      </template>
      <template slot-scope="scope">
        <div class="button">
          <el-button @click="addToList(scope.row)" v-if="findIndex(scope.row)<0">添加到支持列表</el-button>
          <el-button type="danger" @click="deleteFromList(scope.row)" v-else>移出支持列表</el-button>
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>
<style lang="less" scoped>
.button {
  width: 46px;
}
</style>
<script lang="ts">
import Vue from "vue";
import { word } from "../types";
import { computed, ref, watch } from "@vue/composition-api";
import { debounce } from "ts-debounce";
import Axios from "axios";
export default Vue.extend({
  props: {
    data: Array
  },
  setup(props) {
    let propsData = ref(props.data as word[]);
    let tableData = ref(props.data as word[]);
    let searching = ref("");
    // watch(
    //   () => searching.value,
    //   async (search: string) => {
    //     if (search === "" || search === undefined) {
    //       tableData.value = propsData.value;
    //     } else {
    //       tableData.value = (await Axios.get("/word", {
    //         params: { search }
    //       })).data;
    //     }
    //   }
    // );
    let findIndex = (word: word) => propsData.value.indexOf(word);
    return {
      s: "",
      tableData,
      addToList: (word: word) => {
        propsData.value.push(word);
      },
      deleteFromList(word: word) {
        let index = findIndex(word);
        if (index < 0) {
          return;
        }
        propsData.value.splice(index, 1);
      },
      findIndex
    };
  }
});
</script>