import Vue from "vue";
import router from "@/router";
import { Lesson } from '@/types';

export type propMethod = () => {
  lesson: Lesson
}
export default Vue.extend({
  props: ["prop"],
  setup: (initProps) => {
    let props = (initProps.prop as propMethod)();
    return {
      info: props.lesson.info,
      showImage: !!props.lesson.info.image,
      async onClick() {
        await router.push(`/lesson/${props.lesson.id}`);
      }
    };
  }
});