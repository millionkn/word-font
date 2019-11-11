import Vue from "vue";
import { upload, getAsyncRefURL } from '@/service';
import { UploadReturnType } from '@/types';
import { onMounted, ref } from '@vue/composition-api';

export type propMethod = () => {
  onUploadSuccessed: (arg: UploadReturnType) => void,
  defaultImage?: UploadReturnType,
}
export default Vue.extend({
  props: ["prop"],
  setup(propsInit, context) {
    let props = (propsInit.prop as propMethod)();
    let fileInput: HTMLInputElement
    let imageUrl = getAsyncRefURL(props.defaultImage);
    onMounted(() => {
      fileInput = context.refs["fileInput"] as HTMLInputElement;
    });
    return {
      imageUrl,
      handleClick: async () => {
        await new Promise(res => {
          fileInput.onchange = res;
          fileInput.click();
        });
        if (fileInput.files === null || fileInput.files.length == 0) {
          return;
        }
        let arg = await upload(fileInput.files[0]);
        imageUrl.value = URL.createObjectURL(fileInput.files[0]);
        props.onUploadSuccessed(arg);
      }
    };
  },
});