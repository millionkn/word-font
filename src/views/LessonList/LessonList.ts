import Vue from "vue";
import { propMethod as propLessonInstance } from "@/views/LessonList/Lesson";
import { Lesson } from "@/types";
import LessonComponent, { propMethod as propLesson } from "@/views/LessonList/Lesson";
export type propMethod = () => {
  lesson: Lesson[];
};
export default Vue.extend({
  props: ["prop"],
  components: {
    Lesson: LessonComponent
  },
  setup(
    propsInit
  ): {
    lessonList: Lesson[];
    propLesson: (lesson: Lesson) => propLessonInstance;
  } {
    let props = (propsInit.prop as propMethod)();
    return {
      lessonList: props.lesson,
      propLesson: (lesson: Lesson) => (): ReturnType<propLesson> => ({ lesson })
    };
  }
});