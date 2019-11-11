import Vue from "vue";
import { Lesson, Support, Word } from '@/types';
import ImageUploader, { propMethod as propImageUploader } from '@/components/ImageUploader';
import SupportEditor, { propMethod as propSupportEditor } from "@/components/LessonEditor/SupportEditor";

export type propMethod = () => {
  lesson: Lesson,
  support: Support[],
}
export default Vue.extend({
  props: ["prop"],
  components: {
    ImageUploader,
    SupportEditor,
  },
  setup(propsInit) {
    let props = (propsInit.prop as propMethod)();
    return {
      lesson: props.lesson,
      propImageUploader: (): ReturnType<propImageUploader> => ({
        defaultImage: props.lesson.info.image,
        onUploadSuccessed: (arg) => {
          props.lesson.info.image = arg;
        }
      }),
      propSupportEditor: (): ReturnType<propSupportEditor> => ({
        support: props.support,
      })
    };
  },
});