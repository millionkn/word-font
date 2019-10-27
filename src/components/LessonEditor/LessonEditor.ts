import Vue from "vue";
import { Lesson, Support, Word } from '@/types';
import Upload, { propMethod as propUpload } from '@/components/Upload';
import SupportEditor, { propMethod as propSupportEditor } from "@/components/LessonEditor/SupportEditor";

export type propMethod = () => {
  lesson: Lesson,
  support: Support[],
}
export default Vue.extend({
  props: ["prop"],
  components: {
    Upload,
    SupportEditor,
  },
  setup(propsInit) {
    let props = (propsInit.prop as propMethod)();
    return {
      lesson: props.lesson,
      propSupportEditor: (): ReturnType<propSupportEditor> => ({
        support: props.support,
      })
    };
  },
});