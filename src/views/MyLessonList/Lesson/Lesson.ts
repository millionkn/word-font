import Vue from "vue";
import { Lesson } from '@/types';
import { getAsyncRefURL } from '@/service';
import { watch, ref, computed, onUnmounted } from '@vue/composition-api';

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
    return {
      ...props,
      image: getAsyncRefURL(computed(() => props.lesson.info.image), onUnmounted),
    };
  },
});