import Vue from "vue";
import { ref } from "@vue/composition-api";
import { Lesson } from "@/types";
import { createLesson, getLessonContent } from "@/service"

export type propMethod = () => {
  lesson: Lesson,
  lessonList: Lesson[],
}
export default Vue.extend({
  props: ["prop"],
  setup(propsInit) {
    let props = (propsInit.prop as propMethod)();
    let lesson = props.lesson;
    let showCopy = ref(true);
    return {
      lesson: lesson,
      hasImage: !!lesson.info.image,
      showCopy,
      copyHandler: async () => {
        await createLesson(lesson, await getLessonContent(lesson));
        showCopy.value = false;
      },
    };
  },
});