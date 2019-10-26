import Vue from "vue";
import { Lesson, Support, Word } from '@/types';
import LessonEditor, { propMethod as propLessonEditor } from '@/components/LessonEditor';
import { reactive } from '@vue/composition-api';
import { createLesson } from '@/service';
import router from '@/router';
export type propMethod = () => {
  lesson: Lesson[];
}
export default Vue.extend({
  components: {
    LessonEditor,
  },
  setup() {
    let lesson: Lesson = reactive(new Lesson({}));
    let support: Support[] = [];
    return {
      handleSubmit: async () => {
        await createLesson(lesson, support);
        router.back();
      },
      propLessonEditor: (): ReturnType<propLessonEditor> => ({
        lesson,
        support,
      })
    };
  },
});