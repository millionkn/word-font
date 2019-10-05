<template>
  <el-table :data="showing" :height="height">
    <el-table-column label="id" prop="id" :width="60"></el-table-column>
    <el-table-column label="描述" prop="describe"></el-table-column>
    <el-table-column align="right">
      <template slot="header">
        <debounce-input :time="400" size="mini" placeholder="输入关键字搜索" @input="search"></debounce-input>
      </template>
      <template slot-scope="scope">
        <div class="button">
          <el-button @click="addToList(scope.row)" v-if="indexOf(scope.row)<0">添加到支持列表</el-button>
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
import { ref, watch, onMounted } from "@vue/composition-api";
import DebounceInput from "@/components/DebounceInput.vue";
import Axios from "axios";
export default Vue.extend({
  components: {
    DebounceInput
  },
  props: {
    wordIdArray: Array,
    height: Number
  },
  setup(props) {
    let propsData = ref(props.wordIdArray as string[]);
    let selected = ref([] as word[]);
    let showing = ref([] as word[]);
    let indexOf = (w: word) => selected.value.indexOf(w);

    onMounted(async () => {
      selected.value = (await Axios.post(
        "/get/wordCollection",
        propsData.value
      )).data as word[];
      showing.value = selected.value;
      watch(
        () => selected.value,
        wordArray => {
          propsData.value.splice(
            0,
            propsData.value.length,
            ...wordArray.map(w => w.id)
          );
        }
      );
    });
    return {
      selected,
      showing,
      addToList: (word: word) => {
        selected.value.push(word);
      },
      deleteFromList(word: word) {
        let index = indexOf(word);
        if (index < 0) {
          return;
        }
        selected.value.splice(index, 1);
      },
      indexOf,
      search: async (search: string | undefined) => {
        if (search === undefined || search === "") {
          showing.value = selected.value;
        } else {
          showing.value = (await Axios.get("/word", {
            params: { search }
          })).data;
        }
      }
    };
  }
});
</script>