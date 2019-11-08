import Vue from "vue";
import { Lesson } from '@/types';
import { getAsyncRefURL } from '@/service';

export type propMethod = () => {
  lesson: Lesson,
  handlerReview(lesson: Lesson): void,
  handlerEdit(lesson: Lesson): void,
  handlerDelete(lesson: Lesson): void,
}
export default Vue.extend({
  props: ["prop"],
  setup(propsInit) {
    let props = (propsInit.prop as propMethod)();
    let lesson = props.lesson;
    return {
      ...props,
      image: getAsyncRefURL(lesson.info.image),
    };
  },
});