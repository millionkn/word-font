<template>
  <el-input v-model="text" @input="inputHandler" :size="size" :placeholder="placeholder"></el-input>
</template>
<script lang="ts">
import Vue from "vue";
import { ref } from "@vue/composition-api";
import { debounce } from "ts-debounce";
export default Vue.extend({
  props: ["time", "size", "placeholder"],
  setup(props, cont) {
    let time = (props.time || 0) as number;
    let text = ref("");
    let last = text.value;
    return {
      text,
      inputHandler: debounce((str: string) => {
        if (last === text.value) {
          return;
        }
        last = text.value;
        cont.emit("input", last);
      }, time)
    };
  }
});
</script>