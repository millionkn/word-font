<template>
  <el-card>
    <component-editor :component="component"></component-editor>
    <br />
    <upload @uploadSuccess="uploadSuccess"></upload>
  </el-card>
</template>
<script lang="ts">
import Vue from "vue";
import { ref } from "@vue/composition-api";
import { word, component } from "../types";
import Axios from "axios";
import router from "../router";
export default Vue.extend({
  components: {
    Upload: () => import("@/components/ComponentUpload.vue"),
    ComponentEditor: () => import("@/components/ComponentEditor.vue")
  },
  setup() {
    let component = ref({
      info: {
        name: "",
        introduction: ""
      },
      words: []
    } as component);
    let uploadSuccess = async (res: { code: string }) => {
      await Axios.post(
        "/component",
        {
          info: component.value.info,
          words: component.value.words
        },
        { params: { code: res.code } }
      );
      router.back();
    };
    return {
      component,
      uploadSuccess
    };
  }
});
</script>