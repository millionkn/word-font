<template>
  <el-card>
    <upload></upload>
    <br />
    <editor :data="info"></editor>
    <selector :data="word"></selector>
  </el-card>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  components: {
    Upload: () => import("@/components/ComponentUpload.vue"),
    Editor: () => import("@/components/ComponentInfoEditor.vue"),
    Selector: () => import("@/components/WordSelector.vue")
  },
  setup() {
    return {
      info: { introduction: "" },
      word: []
    };
  }
});
</script>