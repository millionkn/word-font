import Vue from "vue";
import { Lesson, Component, Word } from '@/types';
import { onMounted, ref } from '@vue/composition-api';
import { getLessonContent, getComponentCollection, getWordCollection } from '@/service';

export type propMethod = () => {
  lesson: Lesson,
}
export default Vue.extend({
  props: ["prop"],
  setup(propsInit) {
    let props = (propsInit.prop as propMethod)();
    let data = ref([] as {
      component: Component,
      words: Word[],
    }[]);
    onMounted(async () => {
      let support = await getLessonContent(props.lesson)
      let words = await getWordCollection(support.map(s => s.wordId));
      data.value = (await getComponentCollection(support.map(s => s.componentId))).map(component => {
        let wordId = support.filter(s => s.componentId === component.id).map(s => s.wordId);
        return {
          component,
          words: words.filter(w => wordId.findIndex(id => w.id === id) >= 0),
        }
      })
    })
    return {
      data,
    };
  },
});