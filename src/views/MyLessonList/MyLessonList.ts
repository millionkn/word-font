import Vue from "vue";
import router from "@/router";
import { Lesson, Support } from '@/types';
import { deleteLesson, getLessonContent, syncLesson } from '@/service';
import { ref } from '@vue/composition-api';
import LessonEditor, { propMethod as propLessonEditor } from '@/components/LessonEditor/LessonEditor';
import ComponentLesson, { propMethod as propLesson } from "@/views/MyLessonList/Lesson";
export type propMethod = () => {
  lessonList: Lesson[]
}
export default Vue.extend({
  props: ["prop"],
  components: {
    LessonEditor,
    Lesson: ComponentLesson,
  },
  setup(propsInit) {
    let props = (propsInit.prop as propMethod)();
    let editing = ref({} as Lesson);
    let updateVisible = ref(false);
    let support: Support[];
    return {
      updateVisible,
      editing,
      lessonList: props.lessonList,
      propLessonEditor: (): ReturnType<propLessonEditor> => ({
        lesson: editing.value,
        support,
      }),
      syncEditingLesson: async () => {
        await syncLesson(editing.value, support);
        updateVisible.value = false;
      },
      handlerCreateLesson: async () => { await router.push(`/myLesson/create`).finally() },
      propLesson: (lesson: Lesson) => (): ReturnType<propLesson> => ({
        lesson,
        handlerDelete: deleteLesson,
        handlerEdit: async (lesson: Lesson) => {
          support = await getLessonContent(lesson)
          updateVisible.value = true;
          editing.value = lesson;
        },
        handlerReview: async (lesson: Lesson) => { await router.push(`/review/${lesson.id}`).finally() }
      }),

    };
  }
});