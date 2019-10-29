import Vue from "vue";
import { Component, UploadReturnType, Word } from "@/types";
import router from "@/router";
import { ref } from "@vue/composition-api";
import ComponentEditor, { propMethod as propComponentEditor } from "@/components/ComponentEditor"
import Upload, { propMethod as propUpload } from "@/components/Upload";
import { getComponentSupportWord, deleteComponent, syncComponent, afterLogined } from '@/service';

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
    let props = (propsInit.prop as propMethod)()
    let editing = ref({} as Component);
    let words = ref([] as Word[]);
    let uploadVisible = ref(false);
    let updateVisible = ref(false);
    let componentList = props.component;
    return {
      componentList,
      uploadVisible,
      updateVisible,
      add: () => { router.push("/myComponent/create") },
      uploadFile(row: Component) {
        editing.value = row;
        uploadVisible.value = true;
      },
      async edit(row: Component) {
        editing.value = row;
        words.value = await getComponentSupportWord(row);
        updateVisible.value = true;
      },
      deleteComponent: async (row: Component) => {
        await deleteComponent(row);
      },
      syncEditingComponent: async () => {
        await syncComponent(editing.value, { word: words.value });
        updateVisible.value = false;
      },
      propUpload: (): ReturnType<propUpload> => ({
        handlerUpload: async (data: UploadReturnType) => {
          await syncComponent(editing.value, { upload: data });
          uploadVisible.value = false;
        }
      }),
      propComponentEditor: (): ReturnType<propComponentEditor> => ({
        info: editing.value.info,
        words: words.value,
      })
    };
  }
});