import Vue from "vue";
import router from "@/router";
import { Lesson } from '@/types';
import { deleteLesson } from '@/service';

export type propMethod = () => {
  lessonList: Lesson[]
}
export default Vue.extend({
  props: ["prop"],
  setup(propsInit) {
    let props = (propsInit.prop as propMethod)();
    return {
      lessonList: props.lessonList,
      handlerCreateLesson: async () => { await router.push(`/myLesson/create`).finally() },
      handlerDelete: async (lesson: Lesson) => {
        await deleteLesson(lesson);
        props.lessonList.splice(props.lessonList.indexOf(lesson), 1)
      },
      handlerReview: async (lesson: Lesson) => { await router.push(`/review/${lesson.id}`).finally() }
    };
  }
});