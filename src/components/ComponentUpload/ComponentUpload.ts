import Vue from "vue";
import { onMounted, ref } from "@vue/composition-api";
import { upload } from '@/service';

export default Vue.extend({
  setup(props, context) {
    let fileInput: HTMLInputElement;
    let buttonType = ref(undefined as string | undefined);
    let buttonText = ref("选择上传");
    onMounted(() => {
      fileInput = context.refs.fileInput as HTMLInputElement;
    });
    return {
      buttonType,
      buttonText,
      onClick: async () => {
        await new Promise(res => {
          fileInput.onchange = res;
          fileInput.click();
        });
        if (fileInput.files === null || fileInput.files.length == 0) {
          return;
        }
        try {
          buttonType.value = undefined;
          let formData = new FormData();
          formData.append("file", fileInput.files[0]);
          let uploadReturn = await upload(formData, {
            onUploadProgress: event => {
              let progress = Math.floor((event.loaded * 100) / event.total);
              buttonText.value = `上传中...${progress}%`;
            }
          });
          buttonType.value = "success";
          buttonText.value = "上传成功";
          console.log(uploadReturn);
          context.emit("uploadSuccess", uploadReturn);
        } catch (e) {
          buttonType.value = "danger";
          buttonText.value = "重新选择";
        }
      }
    };
  }
});