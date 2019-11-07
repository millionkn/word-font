import Vue from "vue";
import { onMounted, ref } from "@vue/composition-api";
import { upload } from '@/service';
import { UploadReturnType } from '@/types';

export type propMethod = () => {
  handlerUpload: (uploadReturn: UploadReturnType) => void
}
export default Vue.extend({
  props: ["prop"],
  setup(propsInit, context) {
    let props = (propsInit.prop as propMethod)();
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
          let uploadReturn = await upload(fileInput.files[0], {
            onUploadProgress: event => {
              let progress = Math.floor((event.loaded * 100) / event.total);
              buttonText.value = `上传中...${progress}%`;
            }
          });
          buttonType.value = "success";
          buttonText.value = "上传成功";
          props.handlerUpload(uploadReturn);
        } catch (e) {
          buttonType.value = "danger";
          buttonText.value = "重新选择";
        }
      }
    };
  }
});