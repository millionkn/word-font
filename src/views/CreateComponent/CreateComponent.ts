import Vue from "vue";
import { Word, Component, UploadReturnType } from "@/types";
import router from "@/router";
import { createComponent } from '@/service';
import ComponentEditor, { propMethod as propComponentEditor } from "@/components/ComponentEditor";
import Upload from "@/components/Upload";
export type propMethod = () => {
  component: Component[]
}
export default Vue.extend({
  props: ["prop"],
  components: {
    ComponentEditor,
    Upload,
  },
  setup(propsInit) {
    let props = (propsInit.prop as propMethod)();
    let info = <Component["info"]>{
      name: "",
      introduction: "",
    };
    let selectedWord = <Word[]>[];
    return {
      propComponentEditor: <propComponentEditor>(() => ({
        info,
        words: selectedWord,
      })),
      uploadSuccess: async (res: UploadReturnType) => {
        await createComponent(info, selectedWord, res);
        await router.back();
      },
    }
  }
});