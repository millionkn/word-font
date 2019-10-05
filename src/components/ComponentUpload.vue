<template>
  <el-button @click="onClick" :type="buttonType">
    <input style="display:none" type="file" ref="fileInput" accept="js" />
    {{buttonText}}
  </el-button>
</template>
<script lang="ts">
import Vue from "vue";
import { onMounted, ref } from "@vue/composition-api";
import Axios from "axios";
export default Vue.extend({
  setup(props, context) {
    let fileInput: HTMLInputElement;
    let buttonType = ref(undefined as string | undefined);
    let buttonText = ref("选择上传");
    let uploadProgress = ref(0);
    let showProgress = ref(false);
    onMounted(() => {
      fileInput = context.refs.fileInput as HTMLInputElement;
    });
    return {
      uploadProgress,
      buttonType,
      buttonText,
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
          buttonType.value = undefined;
          let formData = new FormData();
          formData.append("file", fileInput.files[0]);
          let response = await Axios.post("/upload", formData, {
            headers: { "Content-Type": "multipart/form-data" },
            onUploadProgress: event => {
              uploadProgress.value = Math.floor(
                (event.loaded * 100) / event.total
              );
              buttonText.value = `上传中...${uploadProgress.value}%`;
            }
          });
          buttonType.value = "success";
          buttonText.value = "上传成功";
          context.emit("uploadSuccess", response.data);
        } catch (e) {
          buttonType.value = "danger";
          buttonText.value = "重新选择";
        }
      }
    };
  }
});
</script>