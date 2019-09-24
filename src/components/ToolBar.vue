<template>
  <el-button-group>
    <el-button
      v-for="x in data"
      :key="x.path"
      :disabled="currentPath===x.path"
      @click="click(x.path)"
    >{{x.label}}</el-button>
  </el-button-group>
</template>
<script lang="ts">
import Vue from "vue";
import { ref, onUnmounted } from "@vue/composition-api";
import router from "../router";

export default Vue.extend({
  setup() {
    let data: {
      path: string;
      label: string;
    }[] = [
      {
        path: "/",
        label: "主页"
      },
      {
        path: "/lesson",
        label: "课程"
      }
    ];
    let currentPath = ref("");
    onUnmounted(router.afterEach((to, from) => (currentPath.value = to.path)));
    currentPath.value = router.currentRoute.path;
    return {
      data,
      click(path: string) {
        router.push(path);
      },
      currentPath
    };
  }
});
</script>