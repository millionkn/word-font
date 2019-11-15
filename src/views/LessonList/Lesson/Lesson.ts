import Vue from "vue";
import router from "@/router";
import { Lesson } from '@/types';
import { getAsyncRefURL } from '@/service';
import { computed, onUnmounted } from '@vue/composition-api';

export type propMethod = () => {
  lesson: Lesson
}
export default Vue.extend({
  props: ["prop"],
  setup: (initProps) => {
    let props = (initProps.prop as propMethod)();
    let lesson = props.lesson;
    return {
      image: getAsyncRefURL(computed(() => lesson.info.image), onUnmounted),
      info: lesson.info,
      async onClick() {
        await router.push(`/lesson/${lesson.id}`);
      }
    };
  }
});