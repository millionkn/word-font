import Vue from "vue";
import { ref } from "@vue/composition-api";
import { Lesson } from "@/types";
import { createLesson, getLessonContent, getAsyncRefURL } from "@/service"
import SupportShower, { propMethod as propSupportShower } from '@/views/LessonInstanceShow/SupportShower';

export type propMethod = () => {
  lesson: Lesson,
}
export default Vue.extend({
  props: ["prop"],
  components: {
    SupportShower,
  },
  setup(propsInit) {
    let props = (propsInit.prop as propMethod)();
    let lesson = props.lesson;
    let showCopy = ref(true);
    return {
      lesson: lesson,
      url: getAsyncRefURL(lesson.info.image),
      showCopy,
      propSupportShower: (): ReturnType<propSupportShower> => ({
        lesson: props.lesson,
      }),
      copyHandler: async () => {
        await createLesson(lesson, await getLessonContent(lesson));
        showCopy.value = false;
      },
    };
  },
});