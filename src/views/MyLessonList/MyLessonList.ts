import Vue from "vue";
import router from "@/router";
import { Lesson } from '@/types';

export type propMethod = () => {
  lessonList: Lesson[]
}
export default Vue.extend({
  props: ["prop"],
  setup(propsInit) {
    let props = (propsInit.prop as propMethod)();
    return {
      lessonList: props.lessonList,
      handlerReview: async (lesson: Lesson) => { await router.push(`/review/${lesson.id}`).finally() }
    };
  }
});