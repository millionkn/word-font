<template>
  <div class="root">
    <input style="display:none" type="file" ref="fileInput" accept="js" />
    <el-button @click="onClick">选择并开始上传</el-button>
    <div class="progress" v-if="uploadCallback">
      <el-progress
        :percentage="uploadProgress"
        :status="uploadStatus"
        :stroke-width="24"
        :text-inside="true"
      ></el-progress>
    </div>
  </div>
</template>
<style lang="less" scoped>
.root {
  display: flex;
}
.progress {
  flex: 1;
}
</style>
<script lang="ts">
import Vue from "vue";
import { onMounted, ref } from "@vue/composition-api";
import Axios from "axios";
export default Vue.extend({
  props: ["uploadCallback"],
  setup(props, context) {
    let fileInput: HTMLInputElement;
    let uploadStatus = ref(undefined as string | undefined);
    let uploadProgress = ref(0);
    let showProgress = ref(false);
    onMounted(() => {
      fileInput = context.refs.fileInput as HTMLInputElement;
    });
    return {
      uploadProgress,
      uploadStatus,
      showProgress,
      onClick: async () => {
        await new Promise(res => {
          fileInput.onchange = res;
          fileInput.click();
        });
        if (fileInput.files === null || fileInput.files.length == 0) {
          return;
        }
        showProgress.value = true;
        try {
          uploadStatus.value = undefined;
          let formData = new FormData();
          formData.append("file", fileInput.files[0]);
          let response = await Axios.post("/upload", formData, {
            headers: { "Content-Type": "multipart/form-data" },
            onUploadProgress: event => {
              uploadProgress.value = Math.floor(
                (event.loaded * 100) / event.total
              );
            }
          });
          uploadStatus.value = "success";
          if (typeof props.uploadCallback === "function") {
            props.uploadCallback(response.data.code);
          }
        } catch (e) {
          uploadStatus.value = "exception";
        }
      }
    };
  }
});
</script>